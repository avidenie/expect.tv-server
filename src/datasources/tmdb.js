const qs = require('querystring')
const { RESTDataSource } = require('apollo-datasource-rest')

class TMDbApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.themoviedb.org/3/'
  }

  willSendRequest(request) {
    request.params.set('api_key', this.context.tmdbApiKey)
  }

  async getPopularMovies() {
    const params = {
      language: 'en-US',
      region: 'US',
      sort_by: 'popularity.desc'
    }
    const response = await this.get(`discover/movie?${qs.stringify(params)}`)
    return response.results.map(movie => ({
      id: movie.id,
      title: movie.title
    }))
  }
}

module.exports = TMDbApi
