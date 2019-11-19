async function poster(parent, __, { dataSources }) {
  const images = await _getImagesForType('posters', dataSources, parent)
  return _getImage(images.posters, parent.language, parent.originalLanguage)
}

async function thumbnail(parent, __, { dataSources }) {
  const images = await _getImagesForType('thumbnails', dataSources, parent)
  return _getImage(
    images.thumbnails,
    parent.language,
    parent.originalLanguage
  )
}

async function logo(parent, __, { dataSources }) {
  const fanartImages = await _getImages(
    dataSources.fanartApi,
    parent.mediaType,
    parent.fanartId
  )
  return _getImage(fanartImages.logos, parent.language, parent.originalLanguage)
}

async function backgrounds(parent, args, { dataSources }) {
  const images = await _getImagesForType('backgrounds', dataSources, parent)
  return images.backgrounds
    ? images.backgrounds
        .slice(0, args.limit)
        .map(background => background.url)
    : []
}

async function _getImagesForType(type, dataSources, parent) {
  let images = await _getImages(
    dataSources.fanartApi,
    parent.mediaType,
    parent.fanartId
  )
  if (!images || !images[type] || images[type].length === 0) {
    images = await _getImages(
      dataSources.tmdbApi,
      parent.mediaType,
      parent.tmdbId
    )
  }
  return images
}

async function _getImages(api, mediaType, someId) {
  let images = {}
  try {
    if (mediaType === 'movie') {
      images = await api.getMovieImages(someId)
    } else if (mediaType === 'tv-show') {
      images = await api.getTvShowImages(someId)
    }
  } catch (err) {
    // nothing to do, will return an empty object
  }
  return images
}

function _getImage(images, language, fallbackLanguage) {
  let image
  if (images) {
    image = images.find(image => image.lang === language)
    if (!image) {
      image = images.find(image => image.lang === fallbackLanguage)
    }
    if (!image && language !== 'en' && fallbackLanguage !== 'en') {
      image = images.find(image => image.lang === 'en')
    }
    if (!image) {
      image = images.find(image => image.lang === null)
    }
  }
  return image ? image.url : null
}

module.exports = {
  poster,
  thumbnail,
  logo,
  backgrounds
}
