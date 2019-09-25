const { RESTDataSource } = require('apollo-datasource-rest')

class FanartApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://webservice.fanart.tv/v3/'
  }

  willSendRequest(request) {
    request.params.set('api_key', this.context.fanartApiKey)
  }

  async getMovieImages(someId) {
    const response = await this.get(`movies/${someId}`)

    const posters = this._transformMovieImages(response.movieposter)
    const thumbnails = this._transformMovieImages(response.moviethumb)
    const logos = this._transformMovieImages(
      response.movielogo || response.hdmovielogo
    )
    const backgrounds = this._transformMovieImages(
      response.moviebackground || response.hdmovieclearart
    )

    return {
      posters,
      thumbnails,
      logos,
      backgrounds
    }
  }

  _transformMovieImages(sourceImages) {
    const images = sourceImages
      ? sourceImages.map(poster => ({
          url: poster.url,
          lang: poster.lang !== '00' && poster.lang !== '' ? poster.lang : null,
          rank: parseInt(poster.likes, 10)
        }))
      : []
    images.sort((a, b) => (a.rank >= b.rank ? -1 : 1))
    return images
  }
}

module.exports = FanartApi
