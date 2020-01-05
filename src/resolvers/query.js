function popularMovies(_, args, { dataSources }) {
  return dataSources.tmdbApi.getPopularMovies(
    args.region,
    args.language,
    args.page
  )
}

function similarMovies(_, args, { dataSources }) {
  return dataSources.tmdbApi.getSimilarMovies(
    args.tmdbId,
    args.language,
    args.page
  )
}

function movieDetails(_, args, { dataSources }) {
  return dataSources.tmdbApi.getMovieDetails(args.tmdbId, args.language)
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
  similarMovies,
  movieDetails,
  popularTvShows
}
