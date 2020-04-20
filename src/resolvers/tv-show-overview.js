function images(parent) {
  return {
    mediaType: 'tv-show',
    tmdbId: parent.tmdbId,
    fanartId: parent.tmdbId,
    language: parent.language,
    originalLanguage: parent.originalLanguage
  }
}

module.exports = {
  images
}
