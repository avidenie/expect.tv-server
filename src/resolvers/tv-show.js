async function images(parent, _, { dataSources }) {
  const tvShowDetails = await dataSources.tmdbApi.getTvShowDetails(
    parent.tmdbId,
    parent.language
  )

  return {
    mediaType: 'tv-show',
    tmdbId: parent.tmdbId,
    fanartId: tvShowDetails.ids.tvdbId,
    language: parent.language,
    originalLanguage: parent.originalLanguage
  }
}

module.exports = {
  images
}
