import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import {
  LogoImage,
  PosterImage,
  MovieBackgroundImage,
  TvShowBackgroundImage,
  ImageOrientation,
} from 'types/generated';

interface JsonMovieResponse {
  hdmovielogo?: JsonImage[];
  movielogo?: JsonImage[];
  movieposter?: JsonImage[];
  moviethumb?: JsonImage[];
  moviebackground: JsonImage[];
}

interface JsonTvShowResponse {
  hdtvlogo?: JsonImage[];
  clearlogo?: JsonImage[];
  tvposter?: JsonImage[];
  tvthumb?: JsonImage[];
  showbackground: JsonTvShowBackgroundImage[];
}

interface JsonImage {
  url: string;
  lang: string;
  likes: string;
}

interface JsonTvShowBackgroundImage {
  url: string;
  lang: string;
  likes: string;
  season: string;
}

interface RankedImage {
  rank: number;
}

class FanartApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://webservice.fanart.tv/v3/';
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('api_key', this.context.fanartApiKey);
  }

  async getMovieLogos(tmdbId: string): Promise<LogoImage[]> {
    const response = await this._getMovieImages(tmdbId);
    const logos = response.hdmovielogo || response.movielogo || [];
    return this._processLogoImages(logos);
  }

  async getMoviePosters(
    tmdbId: string,
    orientation: ImageOrientation,
  ): Promise<PosterImage[]> {
    const response = await this._getMovieImages(tmdbId);
    let posters;
    if (orientation === ImageOrientation.Portrait) {
      posters = this._processPosterImages(
        (response.movieposter || []).filter(
          (image) => image.lang !== '' && image.lang !== '00',
        ),
        ImageOrientation.Portrait,
      );
    } else {
      posters = this._processPosterImages(
        response.moviethumb || [],
        ImageOrientation.Landscape,
      );
    }
    return this._sortImages(posters);
  }

  async getMovieBackgrounds(
    tmdbId: string,
    orientation: ImageOrientation,
  ): Promise<MovieBackgroundImage[]> {
    const response = await this._getMovieImages(tmdbId);
    let backgrounds;
    if (orientation === ImageOrientation.Portrait) {
      backgrounds = this._processMovieBackgroundImages(
        (response.movieposter || []).filter(
          (image) => image.lang === '' || image.lang === '00',
        ),
        ImageOrientation.Portrait,
      );
    } else {
      backgrounds = this._processMovieBackgroundImages(
        response.moviebackground || [],
        ImageOrientation.Landscape,
      );
    }
    return this._sortImages(backgrounds);
  }

  async getTvShowLogos(tvdbId: string): Promise<LogoImage[]> {
    const response = await this._getTvShowImages(tvdbId);
    const logos = response.hdtvlogo || response.clearlogo || [];
    return this._processLogoImages(logos);
  }

  async getTvShowPosters(
    tvdbId: string,
    orientation: ImageOrientation,
  ): Promise<PosterImage[]> {
    const response = await this._getTvShowImages(tvdbId);
    let posters;
    if (orientation === ImageOrientation.Portrait) {
      posters = this._processPosterImages(
        (response.tvposter || []).filter(
          (image) => image.lang !== '' && image.lang !== '00',
        ),
        ImageOrientation.Portrait,
      );
    } else {
      posters = this._processPosterImages(
        response.tvthumb || [],
        ImageOrientation.Landscape,
      );
    }
    return this._sortImages(posters);
  }

  async getTvShowBackgrounds(
    tvdbId: string,
    orientation: ImageOrientation,
  ): Promise<TvShowBackgroundImage[]> {
    const response = await this._getTvShowImages(tvdbId);
    let backgrounds;
    if (orientation === ImageOrientation.Portrait) {
      backgrounds = this._processTvShowBackgroundImages(
        (response.tvposter || []).filter(
          (image) => image.lang === '' || image.lang === '00',
        ) as JsonTvShowBackgroundImage[],
        ImageOrientation.Portrait,
      );
    } else {
      backgrounds = this._processTvShowBackgroundImages(
        response.showbackground || [],
        ImageOrientation.Landscape,
      );
    }
    return this._sortImages(backgrounds);
  }

  async _getMovieImages(tmdbId: string): Promise<JsonMovieResponse> {
    return await this._getWithTtlOverride<JsonMovieResponse>(
      `movies/${tmdbId}`,
    );
  }

  async _getTvShowImages(fanartId: string): Promise<JsonTvShowResponse> {
    return await this._getWithTtlOverride<JsonTvShowResponse>(`tv/${fanartId}`);
  }

  async _getWithTtlOverride<TResult>(url: string): Promise<TResult> {
    let response;
    try {
      response = await this.get(url, undefined, {
        cacheOptions: () => {
          return {
            ttl: 43200, // 12 hours
          };
        },
      });
    } catch (err) {
      response = {};
    }
    return response;
  }

  _processLogoImages(sourceImages: JsonImage[]): LogoImage[] {
    const images = sourceImages.map((sourceImage) => ({
      url: sourceImage.url,
      lang: sourceImage.lang || 'en',
      rank: parseInt(sourceImage.likes, 10),
    }));
    return this._sortImages(images);
  }

  _processPosterImages(
    sourceImages: JsonImage[],
    orientation: ImageOrientation,
  ): PosterImage[] {
    return sourceImages.map((sourceImage) => ({
      url: sourceImage.url,
      orientation,
      lang: sourceImage.lang,
      rank: parseInt(sourceImage.likes, 10),
    }));
  }

  _processMovieBackgroundImages(
    sourceImages: JsonImage[],
    orientation: ImageOrientation,
  ): MovieBackgroundImage[] {
    return sourceImages.map((sourceImage) => ({
      url: sourceImage.url,
      orientation,
      rank: parseInt(sourceImage.likes, 10),
    }));
  }

  _processTvShowBackgroundImages(
    sourceImages: JsonTvShowBackgroundImage[],
    orientation: ImageOrientation,
  ): TvShowBackgroundImage[] {
    return sourceImages.map((sourceImage) => ({
      url: sourceImage.url,
      orientation,
      rank: parseInt(sourceImage.likes, 10),
      season: parseInt(sourceImage.season, 10),
    }));
  }

  _sortImages<T extends RankedImage>(images: T[]) {
    return images.sort((a, b) => (a.rank >= b.rank ? -1 : 1));
  }
}

export default FanartApi;
