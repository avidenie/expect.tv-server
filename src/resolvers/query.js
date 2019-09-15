function popularMovies(_, __, { dataSources }) {
  return dataSources.tmdbApi.getPopularMovies()
}

module.exports = {
  popularMovies
}
