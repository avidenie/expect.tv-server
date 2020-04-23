async function images(parent, _, { dataSources }) {
  const externalIds = await dataSources.tmdbApi.getTvShowExternalIds(
    parent.tmdbId
  )

  return {
    mediaType: 'tv-show',
    tmdbId: parent.tmdbId,
    fanartId: externalIds.tvdbId,
    language: parent.language,
    originalLanguage: parent.originalLanguage
  }
}

module.exports = {
  images
}
