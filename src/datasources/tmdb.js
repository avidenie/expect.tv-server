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

  async getPopularMovies(region = 'US', language = 'en') {
    const params = {
      region,
      language,
      sort_by: 'popularity.desc',
      with_release_type: '4|5',
      'release_date.lte': DateTime.local().toISODate()
    }
    const response = await this.get(`discover/movie?${qs.stringify(params)}`)
    return response.results.map(movie => this._transformMovie(movie, language))
  }

  async getMovieImages(tmdbId) {
    const [configuration, images] = await Promise.all([
      this.getConfiguration(),
      this.get(`movie/${tmdbId}/images`)
    ])

    const posters = this._transformMovieImages(
      images.posters,
      configuration.imageBaseUrl
    )

    const thumbnails = this._transformMovieImages(
      images.backdrops,
      configuration.imageBaseUrl
    ).filter(image => image.lang !== null)

    const backgrounds = this._transformMovieImages(
      images.backdrops,
      configuration.imageBaseUrl
    ).filter(image => image.lang === null)

    return {
      posters,
      thumbnails,
      backgrounds
    }
  }

  _transformMovie(rawMovie, language) {
    return {
      tmdbId: rawMovie.id,
      title: rawMovie.title,
      language,
      originalLanguage: rawMovie.original_language
    }
  }

  _transformMovieImages(sourceImages, imageBaseUrl) {
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
}

module.exports = TMDbApi
