import qs from 'querystring';
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import {
  DiscoverMoviesInput,
  DiscoverTvShowsInput,
  Movie,
  MovieOverview,
  PageInfo,
  TvShowOverview,
  TvShow,
  ReleaseDates,
  Credits,
  Crew,
  Cast,
  MovieResults,
  TvShowResults,
  LogoImage,
  PosterImage,
  MovieBackgroundImage,
  TvShowBackgroundImage,
  ImageOrientation,
} from 'types/generated';

interface JsonConfigurationResponse {
  images: {
    secure_base_url: string;
  };
}

interface JsonPageInfo {
  page: number;
  total_pages: number;
  total_results: number;
}
interface JsonGenre {
  id: number;
  name: string;
}

interface JsonMovieOverview {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface JsonMovieListResponse extends JsonPageInfo {
  results: JsonMovieOverview[];
}

interface JsonMovie extends JsonMovieOverview {
  tagline?: string;
  overview?: string;
  genres: JsonGenre[];
  runtime?: number;
  release_dates: {
    results: JsonReleaseDates[];
  };
  credits: JsonCredits;
  external_ids: {
    imdb_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
  };
}

interface JsonReleaseDates {
  iso_3166_1: string;
  release_dates: JsonReleaseDate[];
}

interface JsonReleaseDate {
  iso_639_1: string;
  release_date: string;
  certification: string;
  type: number;
}

interface JsonCredits {
  cast: JsonCreditCast[];
  crew: JsonCreditCrew[];
}

interface JsonCreditCast {
  id: number;
  name: string;
  character: string;
  order: number;
}

interface JsonCreditCrew {
  id: number;
  name: string;
  department: string;
  job: string;
}

interface JsonTvShowOverview {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
}

interface JsonTvShowListResponse extends JsonPageInfo {
  results: JsonTvShowOverview[];
}

interface JsonTvShow extends JsonTvShowOverview {
  overview: string;
  genres: JsonGenre[];
  episode_run_time: number[];
  created_by: JsonCreatedBy[];
  in_production: boolean;
  type: string;
  status: string;
  external_ids: {
    imdb_id: string | null;
    tvdb_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
  };
}

interface JsonCreatedBy {
  id: number;
  name: string;
}

interface JsonImagesResponse {
  backdrops: JsonImage[];
  posters: JsonImage[];
}

interface JsonImage {
  file_path: string;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
}

interface RankedImage {
  rank: number;
}

type BackgroundImage = MovieBackgroundImage | TvShowBackgroundImage;

class TMDbApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('api_key', this.context.tmdbApiKey);
  }

  async discoverMovies(params: DiscoverMoviesInput): Promise<MovieResults> {
    const response = await this.get<JsonMovieListResponse>(
      `discover/movie?${qs.stringify(params)}`,
    );
    return {
      results: response.results.map((movie) =>
        this._getMovieOverview(movie, params.language || 'en'),
      ),
      pageInfo: this._getPageInfo(response),
    };
  }

  getRecommendedMovies(
    tmdbId: number,
    language: string = 'en',
    page = 1,
  ): Promise<MovieResults> {
    return this._getMoviesByEndpoint(
      `movie/${tmdbId}/recommendations`,
      language,
      page,
    );
  }

  getSimilarMovies(
    tmdbId: number,
    language: string = 'en',
    page = 1,
  ): Promise<MovieResults> {
    return this._getMoviesByEndpoint(`movie/${tmdbId}/similar`, language, page);
  }

  _getPageInfo(response: JsonPageInfo): PageInfo {
    return {
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };
  }

  _getMovieOverview(
    jsonMovieOverview: JsonMovieOverview,
    language: string = 'en',
  ): MovieOverview {
    return {
      tmdbId: jsonMovieOverview.id,
      title: jsonMovieOverview.title,
      originalTitle: jsonMovieOverview.original_title,
      language,
      originalLanguage: jsonMovieOverview.original_language,
      releaseDate: jsonMovieOverview.release_date,
      images: {
        logos: [],
        posters: [],
        backgrounds: [],
      },
    };
  }

  async _getMoviesByEndpoint(
    endpoint: string,
    language: string = 'en',
    page = 1,
  ): Promise<MovieResults> {
    const params = { language, page };
    const response = await this.get<JsonMovieListResponse>(
      `${endpoint}?${qs.stringify(params)}`,
    );
    return {
      results: response.results.map((movieOverview) =>
        this._getMovieOverview(movieOverview, language),
      ),
      pageInfo: this._getPageInfo(response),
    };
  }

  async getMovieDetails(
    tmdbId: number,
    language: string = 'en',
  ): Promise<Movie> {
    const response = await this.get<JsonMovie>(
      `movie/${tmdbId}?language=${language}&append_to_response=credits,external_ids,release_dates`,
    );
    return {
      tmdbId: response.id,
      title: response.title,
      originalTitle: response.original_title,
      language,
      originalLanguage: response.original_language,
      releaseDate: response.release_date,
      tagline: response.tagline || '',
      overview: response.overview || '',
      genres: response.genres,
      runtime: response.runtime || 0,
      rating: {
        voteAverage: response.vote_average,
        voteCount: response.vote_count,
      },
      releaseDates: this._getMovieReleaseDates(response.release_dates.results),
      credits: this._getMovieCredits(response.credits),
      images: {
        logos: [],
        posters: [],
        backgrounds: [],
      },
      externalIds: {
        imdbId: response.external_ids.imdb_id,
        facebookId: response.external_ids.facebook_id,
        instagramId: response.external_ids.instagram_id,
        twitterId: response.external_ids.twitter_id,
      },
    };
  }

  _getMovieReleaseDates(jsonReleaseDates: JsonReleaseDates[]): ReleaseDates[] {
    return jsonReleaseDates.map((result) => {
      return {
        region: result.iso_3166_1,
        results: result.release_dates
          .map((releaseDate) => ({
            releaseDate: releaseDate.release_date,
            certification: releaseDate.certification,
            type: releaseDate.type,
          }))
          .sort((first, second) => first.type - second.type),
      };
    });
  }

  _getMovieCredits(jsonCredits: JsonCredits): Credits {
    const credits: Credits = {
      directors: <Crew[]>[],
      writers: <Crew[]>[],
      cast: <Cast[]>[],
    };
    jsonCredits.crew.forEach((crew) => {
      if (
        crew.department === 'Writing' &&
        (crew.job === 'Screenplay' || crew.job === 'Writer')
      ) {
        credits.writers.push({
          id: crew.id,
          name: crew.name,
          job: crew.job,
        });
      } else if (crew.department === 'Directing' && crew.job === 'Director') {
        credits.directors.push({
          id: crew.id,
          name: crew.name,
          job: crew.job,
        });
      }
    });
    jsonCredits.cast
      .sort((a, b) => (a.order >= b.order ? -1 : 1))
      .slice(0, 5)
      .forEach((cast) => {
        credits.cast.push({
          id: cast.id,
          name: cast.name,
          character: cast.character,
        });
      });
    return credits;
  }

  async getMoviePosters(
    tmdbId: number,
    orientation: ImageOrientation,
  ): Promise<PosterImage[]> {
    try {
      const [configuration, response] = await this._getMovieImages(tmdbId);
      let posters;
      if (orientation === ImageOrientation.Portrait) {
        posters = this._processPosterImages(
          configuration.imageBaseUrl,
          (response.posters || []).filter((image) => !!image.iso_639_1),
          ImageOrientation.Portrait,
        );
      } else {
        posters = this._processPosterImages(
          configuration.imageBaseUrl,
          (response.backdrops || []).filter((image) => !!image.iso_639_1),
          ImageOrientation.Landscape,
        );
      }
      return this._sortImages(posters);
    } catch (err) {
      return [];
    }
  }

  async getMovieBackgrounds(
    tmdbId: number,
    orientation: ImageOrientation,
  ): Promise<MovieBackgroundImage[]> {
    try {
      const [configuration, response] = await this._getMovieImages(tmdbId);
      let backgrounds;
      if (orientation === ImageOrientation.Portrait) {
        backgrounds = this._processBackgroundImages<MovieBackgroundImage>(
          configuration.imageBaseUrl,
          (response.posters || []).filter((image) => !image.iso_639_1),
          ImageOrientation.Portrait,
        );
      } else {
        backgrounds = this._processBackgroundImages<MovieBackgroundImage>(
          configuration.imageBaseUrl,
          (response.backdrops || []).filter((image) => !image.iso_639_1),
          ImageOrientation.Landscape,
        );
      }
      return this._sortImages(backgrounds);
    } catch (err) {
      return [];
    }
  }

  async _getMovieImages(tmdbId: number, language: string = 'en') {
    return await Promise.all([
      this._getConfiguration(),
      this.get<JsonImagesResponse>(
        `movie/${tmdbId}/images?language=${language}&include_image_language=${this._getImageLanguages(
          language,
        )}`,
      ),
    ]);
  }

  _processPosterImages(
    imageBaseUrl: string,
    sourceImages: JsonImage[],
    orientation: ImageOrientation,
  ): PosterImage[] {
    return sourceImages.map((sourceImage) => ({
      url: `${imageBaseUrl}original${sourceImage.file_path}`,
      orientation,
      lang: sourceImage.iso_639_1,
      rank: this._getRankFromRating(
        sourceImage.vote_average,
        sourceImage.vote_count,
      ),
    }));
  }

  _getRankFromRating(voteAverage: number, voteCount: number): number {
    if (voteAverage > 0 && voteCount > 0) {
      const val = Math.pow(10000, 1 / 10);
      return (Math.log(voteCount) / Math.log(val) + voteAverage) / 2;
    }
    return 0;
  }

  _processBackgroundImages<T extends BackgroundImage>(
    imageBaseUrl: string,
    sourceImages: JsonImage[],
    orientation: ImageOrientation,
  ): T[] {
    return sourceImages.map(
      (sourceImage) =>
        ({
          url: `${imageBaseUrl}original${sourceImage.file_path}`,
          orientation,
          rank: this._getRankFromRating(
            sourceImage.vote_average,
            sourceImage.vote_count,
          ),
        } as T),
    );
  }

  _sortImages<T extends RankedImage>(images: T[]) {
    return images.sort((a, b) => (a.rank >= b.rank ? -1 : 1));
  }

  async _getConfiguration() {
    const response = await this.get<JsonConfigurationResponse>('configuration');
    return {
      imageBaseUrl: response.images.secure_base_url,
    };
  }

  _getImageLanguages(language: string): string {
    return language !== 'en' ? `${language},en,null` : 'en,null';
  }

  async discoverTvShows(params: DiscoverTvShowsInput): Promise<TvShowResults> {
    const response = await this.get<JsonTvShowListResponse>(
      `discover/tv?${qs.stringify(params)}`,
    );
    return {
      results: response.results.map((tvShow) =>
        this._getTvShowOverview(tvShow, params.language || 'en'),
      ),
      pageInfo: this._getPageInfo(response),
    };
  }

  getRecommendedTvShows(
    tmdbId: number,
    language: string = 'en',
    page = 1,
  ): Promise<TvShowResults> {
    return this._getTvShowsByEndpoint(
      `tv/${tmdbId}/recommendations`,
      language,
      page,
    );
  }

  getSimilarTvShows(
    tmdbId: number,
    language: string = 'en',
    page = 1,
  ): Promise<TvShowResults> {
    return this._getTvShowsByEndpoint(`tv/${tmdbId}/similar`, language, page);
  }

  _getTvShowOverview(
    tvShowOverview: JsonTvShowOverview,
    language: string = 'en',
  ): TvShowOverview {
    return {
      tmdbId: tvShowOverview.id,
      name: tvShowOverview.name,
      originalName: tvShowOverview.original_name,
      language,
      originalLanguage: tvShowOverview.original_language,
      firstAirDate: tvShowOverview.first_air_date,
      images: {
        logos: [],
        posters: [],
        backgrounds: [],
      },
    };
  }

  async _getTvShowsByEndpoint(
    endpoint: string,
    language: string = 'en',
    page = 1,
  ): Promise<TvShowResults> {
    const params = { language, page };
    const response = await this.get<JsonTvShowListResponse>(
      `${endpoint}?${qs.stringify(params)}`,
    );
    return {
      results: response.results.map((tvShowOverview) =>
        this._getTvShowOverview(tvShowOverview, language),
      ),
      pageInfo: this._getPageInfo(response),
    };
  }

  async getTvShowDetails(
    tmdbId: number,
    language: string = 'en',
  ): Promise<TvShow> {
    const response = await this.get<JsonTvShow>(
      `tv/${tmdbId}?append_to_response=external_ids&language=${language}`,
    );
    return {
      tmdbId: response.id,
      name: response.name,
      originalName: response.original_name,
      language,
      originalLanguage: response.original_language,
      firstAirDate: response.first_air_date,
      overview: response.overview || '',
      genres: response.genres || [],
      runtime: response.episode_run_time || [],
      rating: {
        voteAverage: response.vote_average,
        voteCount: response.vote_count,
      },
      createdBy: response.created_by.map((createdBy) => ({
        id: createdBy.id,
        name: createdBy.name,
      })),
      type: response.type,
      inProduction: response.in_production,
      status: response.status,
      images: {
        logos: [],
        posters: [],
        backgrounds: [],
      },
      externalIds: {
        imdbId: response.external_ids.imdb_id,
        tvdbId: response.external_ids.tvdb_id,
        facebookId: response.external_ids.facebook_id,
        instagramId: response.external_ids.instagram_id,
        twitterId: response.external_ids.twitter_id,
      },
    };
  }

  async getTvShowExternalIds(tmdbId: number) {
    try {
      const response = await this.get(`tv/${tmdbId}/external_ids`);
      return {
        imdbId: response.imdb_id,
        tvdbId: response.tvdb_id,
      };
    } catch (err) {
      return {};
    }
  }

  async getTvShowPosters(
    tmdbId: number,
    orientation: ImageOrientation,
  ): Promise<PosterImage[]> {
    try {
      const [configuration, response] = await this._getTvShowImages(tmdbId);
      let posters;
      if (orientation === ImageOrientation.Portrait) {
        posters = this._processPosterImages(
          configuration.imageBaseUrl,
          (response.posters || []).filter((image) => !!image.iso_639_1),
          ImageOrientation.Portrait,
        );
      } else {
        posters = this._processPosterImages(
          configuration.imageBaseUrl,
          (response.backdrops || []).filter((image) => !!image.iso_639_1),
          ImageOrientation.Landscape,
        );
      }
      return this._sortImages(posters);
    } catch (err) {
      return [];
    }
  }

  async getTvShowBackgrounds(
    tmdbId: number,
    orientation: ImageOrientation,
  ): Promise<TvShowBackgroundImage[]> {
    try {
      const [configuration, response] = await this._getTvShowImages(tmdbId);
      let backgrounds;
      if (orientation === ImageOrientation.Portrait) {
        backgrounds = this._processBackgroundImages<TvShowBackgroundImage>(
          configuration.imageBaseUrl,
          (response.posters || []).filter((image) => !image.iso_639_1),
          ImageOrientation.Portrait,
        );
      } else {
        backgrounds = this._processBackgroundImages<TvShowBackgroundImage>(
          configuration.imageBaseUrl,
          (response.backdrops || []).filter((image) => !image.iso_639_1),
          ImageOrientation.Landscape,
        );
      }
      return this._sortImages(backgrounds);
    } catch (err) {
      return [];
    }
  }

  async _getTvShowImages(tmdbId: number, language: string = 'en') {
    return await Promise.all([
      this._getConfiguration(),
      this.get<JsonImagesResponse>(
        `tv/${tmdbId}/images?language=${language}&include_image_language=${this._getImageLanguages(
          language,
        )}`,
      ),
    ]);
  }
}

export default TMDbApi;
