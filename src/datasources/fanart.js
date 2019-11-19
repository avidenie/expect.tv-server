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
    const response = await this._getWithTtlOverride(`movies/${someId}`)

    const posters = this._transformImages(response.movieposter)
    const thumbnails = this._transformImages(response.moviethumb)
    const logos = this._transformImages(
      response.movielogo || response.hdmovielogo
    )
    const backgrounds = this._transformImages(
      response.moviebackground || response.hdmovieclearart
    )

    return {
      posters,
      thumbnails,
      logos,
      backgrounds
    }
  }

  async getTvShowImages(tvdbId) {
    const response = await this._getWithTtlOverride(`tv/${tvdbId}`)

    const posters = this._transformImages(response.tvposter)
    const thumbnails = this._transformImages(response.tvthumb)
    const logos = this._transformImages(response.tvlogo || response.hdtvlogo)
    const backgrounds = this._transformImages(
      response.showbackground || response.hdmovieclearart
    )

    return {
      posters,
      thumbnails,
      logos,
      backgrounds
    }
  }

  async _getWithTtlOverride(url) {
    return await this.get(url, null, {
      cacheOptions: () => {
        return {
          ttl: 43200 // 12 hours
        }
      }
    })
  }

  _transformImages(sourceImages) {
    const images = sourceImages
      ? sourceImages.map(sourceImage => ({
          url: sourceImage.url,
          lang:
            sourceImage.lang !== '00' && sourceImage.lang !== ''
              ? sourceImage.lang
              : null,
          rank: parseInt(sourceImage.likes, 10)
        }))
      : []
    images.sort((a, b) => (a.rank >= b.rank ? -1 : 1))
    return images
  }
}

module.exports = FanartApi
