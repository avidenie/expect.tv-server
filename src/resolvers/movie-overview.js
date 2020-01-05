function images(parent) {
  return {
    mediaType: 'movie',
    tmdbId: parent.tmdbId,
    fanartId: parent.tmdbId,
    language: parent.language,
    originalLanguage: parent.originalLanguage
  }
}

module.exports = {
  images
}
