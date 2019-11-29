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
        this._transformMovie(movie, language)
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
      `movie/${tmdbId}?language=${language}&append_to_response=external_ids`
    )
    return this._transformMovie(response, language)
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
        this._transformTvShow(tvShow, language)
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
    return this._transformTvShow(response, language)
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

  _transformMovie(rawMovie, language) {
    return {
      tmdbId: rawMovie.id,
      title: rawMovie.title,
      language,
      originalLanguage: rawMovie.original_language
    }
  }

  _transformTvShow(rawTvShow, language) {
    const ids = {
      imdbId: rawTvShow.external_ids ? rawTvShow.external_ids.imdb_id : null,
      tvdbId: rawTvShow.external_ids ? rawTvShow.external_ids.tvdb_id : null
    }
    return {
      tmdbId: rawTvShow.id,
      ids,
      title: rawTvShow.name,
      language,
      originalLanguage: rawTvShow.original_language
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
