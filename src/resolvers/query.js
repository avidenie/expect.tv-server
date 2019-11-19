function popularMovies(_, args, { dataSources }) {
  return dataSources.tmdbApi.getPopularMovies(args.region, args.language)
}

function popularTvShows(_, args, { dataSources }) {
  return dataSources.tmdbApi.getPopularTvShows(args.region, args.language)
}

module.exports = {
  popularMovies,
  popularTvShows
}
