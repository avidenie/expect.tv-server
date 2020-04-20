const qs = require('querystring')
const { DateTime } = require('luxon')
const { RESTDataSource } = require('apollo-datasource-rest')

class TMDbApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.themoviedb.org/3/'
  }

  willSendRequest(request) {
    request.params.set('api_key', this.context.tmdbApiKey)
  }

  async getConfiguration() {
    const response = await this.get('configuration')
    return {
      imageBaseUrl: response.images.secure_base_url
    }
  }

  async getPopularMovies(region = 'US', language = 'en', page = 1) {
    const params = {
      region,
      language,
      page,
      sort_by: 'popularity.desc',
      with_release_type: '4|5',
      'release_date.lte': DateTime.local().toISODate(),
      'vote_count.gte': 500,
      include_adult: 0,
      include_video: 0
    }
    const response = await this.get(`discover/movie?${qs.stringify(params)}`)
    return {
      results: response.results.map(movie =>
        this._getMovieOverview(movie, language)
      ),
      pageInfo: {
        page: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results
      }
    }
  }

  async getSimilarMovies(tmdbId, language = 'en', page = 1) {
    const params = {
      language,
      page
    }
    const response = await this.get(
      `movie/${tmdbId}/similar?${qs.stringify(params)}`
    )
    return {
      results: response.results.map(movie =>
        this._getMovieOverview(movie, language)
      ),
      pageInfo: {
        page: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results
      }
    }
  }

  async getMovieDetails(tmdbId, language) {
    const response = await this.get(
      `movie/${tmdbId}?language=${language}&append_to_response=credits,release_dates`
    )
    return this._getMovieDetails(response, language)
  }

  async getMovieImages(tmdbId, language = 'en') {
    const [configuration, images] = await Promise.all([
      this.getConfiguration(),
      this.get(
        `movie/${tmdbId}/images?language=${language}&include_image_language=${this._getImageLanguages(
          language
        )}`
      )
    ])
    return this._transformImages(configuration, images)
  }

  async getPopularTvShows(region = 'US', language = 'en', page = 1) {
    const params = {
      region,
      language,
      page,
      sort_by: 'popularity.desc',
      'first_air_date.lte': DateTime.local().toISODate(),
      'vote_count.gte': 500
    }
    const response = await this.get(`discover/tv?${qs.stringify(params)}`)
    return {
      results: response.results.map(tvShow =>
        this._getTvShowOverview(tvShow, language)
      ),
      pageInfo: {
        page: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results
      }
    }
  }

  async getSimilarTvShows(tmdbId, language = 'en', page = 1) {
    const params = {
      language,
      page
    }
    const response = await this.get(
      `tv/${tmdbId}/similar?${qs.stringify(params)}`
    )
    return {
      results: response.results.map(tvShow =>
        this._getTvShowOverview(tvShow, language)
      ),
      pageInfo: {
        page: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results
      }
    }
  }

  async getTvShowDetails(tmdbId, language = 'en') {
    const response = await this.get(
      `tv/${tmdbId}?language=${language}&append_to_response=external_ids`
    )
    return this._getTvShowDetails(response, language)
  }

  async getTvShowImages(tmdbId, language = 'en') {
    const [configuration, images] = await Promise.all([
      this.getConfiguration(),
      this.get(
        `tv/${tmdbId}/images?language=${language}&include_image_language=${this._getImageLanguages(
          language
        )}`
      )
    ])
    return this._transformImages(configuration, images)
  }

  _getMovieOverview(rawMovie, language) {
    return {
      tmdbId: rawMovie.id,
      title: rawMovie.title,
      releaseDate: rawMovie.release_date,
      language
    }
  }

  _getMovieDetails(rawMovie, language) {
    return {
      tmdbId: rawMovie.id,
      title: rawMovie.title,
      originalTitle: rawMovie.original_title,
      originalLanguage: rawMovie.original_language,
      releaseDate: rawMovie.release_date,
      tagline: rawMovie.tagline,
      overview: rawMovie.overview,
      genres: rawMovie.genres,
      runtime: rawMovie.runtime,
      rating: {
        voteAverage: rawMovie.vote_average,
        voteCount: rawMovie.vote_count
      },
      releaseDates: this._getReleaseDates(rawMovie.release_dates.results),
      credits: this._getMovieCredits(rawMovie.credits),
      language
    }
  }

  _getMovieCredits(rawCredits) {
    const credits = {
      directors: [],
      writers: [],
      cast: []
    }
    rawCredits.crew.forEach(crew => {
      if (
        crew.department === 'Writing' &&
        (crew.job === 'Screenplay' || crew.job === 'Writer')
      ) {
        credits.writers.push({
          id: crew.id,
          name: crew.name,
          job: crew.job
        })
      } else if (crew.department === 'Directing' && crew.job === 'Director') {
        credits.directors.push({
          id: crew.id,
          name: crew.name
        })
      }
    })
    for (let i = 0, n = Math.min(rawCredits.cast.length, 5); i < n; i++) {
      credits.cast.push({
        id: rawCredits.cast[i].id,
        name: rawCredits.cast[i].name,
        character: rawCredits.cast[i].character
      })
    }
    return credits
  }

  _getReleaseDates(rawReleaseDates) {
    return rawReleaseDates.map(rawReleaseDate => {
      return {
        region: rawReleaseDate.iso_3166_1,
        results: rawReleaseDate.release_dates
          .map(releaseDate => ({
            releaseDate: releaseDate.release_date,
            certification: releaseDate.certification,
            type: releaseDate.type
          }))
          .sort((first, second) => first.type - second.type)
      }
    })
  }

  _getTvShowOverview(rawTvShow, language) {
    const ids = {
      imdbId: rawTvShow.external_ids ? rawTvShow.external_ids.imdb_id : null,
      tvdbId: rawTvShow.external_ids ? rawTvShow.external_ids.tvdb_id : null
    }
    return {
      tmdbId: rawTvShow.id,
      name: rawTvShow.name,
      firstAirDate: rawTvShow.first_air_date,
      ids,
      language,
      originalLanguage: rawTvShow.original_language,
    }
  }

  _getTvShowDetails(rawTvShow, language) {
    const ids = {
      imdbId: rawTvShow.external_ids ? rawTvShow.external_ids.imdb_id : null,
      tvdbId: rawTvShow.external_ids ? rawTvShow.external_ids.tvdb_id : null
    }
    return {
      tmdbId: rawTvShow.id,
      name: rawTvShow.name,
      originalName: rawTvShow.original_name,
      originalLanguage: rawTvShow.original_language,
      firstAirDate: rawTvShow.first_air_date,
      overview: rawTvShow.overview,
      genres: rawTvShow.genres,
      runtime: rawTvShow.episode_run_time,
      rating: {
        voteAverage: rawTvShow.vote_average,
        voteCount: rawTvShow.vote_count
      },
      createdBy: rawTvShow.created_by.map(createdBy => ({
        id: createdBy.id,
        name: createdBy.name
      })),
      type: rawTvShow.type,
      inProduction: rawTvShow.in_production,
      status: rawTvShow.status,
      ids,
      language
    }
  }

  _transformImages(configuration, images) {
    const posters = this._sortImages(images.posters, configuration.imageBaseUrl)
    const backdrops = this._sortImages(
      images.backdrops,
      configuration.imageBaseUrl
    )
    const thumbnails = backdrops.filter(image => image.lang !== null)
    const backgrounds = backdrops.filter(image => image.lang === null)

    return {
      posters,
      thumbnails,
      backgrounds
    }
  }

  _sortImages(sourceImages, imageBaseUrl) {
    const images = sourceImages
      ? sourceImages.map(image => ({
          url: `${imageBaseUrl}original${image.file_path}`,
          lang:
            image.iso_639_1 !== null && image.iso_639_1 !== ''
              ? image.iso_639_1
              : null,
          rank: image.vote_average
        }))
      : []
    images.sort((a, b) => (a.rank >= b.rank ? -1 : 1))
    return images
  }

  _getImageLanguages(language) {
    return language !== 'en' ? `${language},en,null` : 'en,null'
  }
}

module.exports = TMDbApi
