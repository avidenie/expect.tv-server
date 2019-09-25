function popularMovies(_, args, { dataSources }) {
  return dataSources.tmdbApi.getPopularMovies(args.region, args.language)
}

module.exports = {
  popularMovies
}
