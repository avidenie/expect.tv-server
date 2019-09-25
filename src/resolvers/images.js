async function poster(parent, __, { dataSources }) {
  let movieImages = await _getFanartImages(dataSources.fanartApi, parent.tmdbId)
  if (!movieImages || !movieImages.posters) {
    movieImages = await _getTmdbImages(dataSources.tmdbApi, parent.tmdbId)
  }
  return _getImage(
    movieImages.posters,
    parent.language,
    parent.originalLanguage
  )
}

async function thumbnail(parent, __, { dataSources }) {
  let movieImages = await _getFanartImages(dataSources.fanartApi, parent.tmdbId)
  if (!movieImages || !movieImages.thumbnails) {
    movieImages = await _getTmdbImages(dataSources.tmdbApi, parent.tmdbId)
  }
  return _getImage(
    movieImages.thumbnails,
    parent.language,
    parent.originalLanguage
  )
}

async function logo(parent, __, { dataSources }) {
  const fanartImages = await _getFanartImages(
    dataSources.fanartApi,
    parent.tmdbId
  )
  return _getImage(fanartImages.logos, parent.language, parent.originalLanguage)
}

async function backgrounds(parent, args, { dataSources }) {
  let movieImages = await _getFanartImages(dataSources.fanartApi, parent.tmdbId)
  if (!movieImages || !movieImages.backgrounds) {
    movieImages = await _getTmdbImages(dataSources.tmdbApi, parent.tmdbId)
  }
  return movieImages.backgrounds
    ? movieImages.backgrounds
        .slice(0, args.limit)
        .map(background => background.url)
    : []
}

async function _getFanartImages(fanartApi, someId) {
  let images = {}
  try {
    images = await fanartApi.getMovieImages(someId)
  } catch (err) {
    // nothing to do, will return an empty object
  }
  return images
}

async function _getTmdbImages(tmdbApi, tmdbId) {
  let images = {}
  try {
    images = await tmdbApi.getMovieImages(tmdbId)
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
