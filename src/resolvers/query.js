function popularMovies(_, args, { dataSources }) {
  return dataSources.tmdbApi.getPopularMovies(
    args.region,
    args.language,
    args.page
  )
}

function popularTvShows(_, args, { dataSources }) {
  return dataSources.tmdbApi.getPopularTvShows(
    args.region,
    args.language,
    args.page
  )
}

module.exports = {
  popularMovies,
  popularTvShows
}
