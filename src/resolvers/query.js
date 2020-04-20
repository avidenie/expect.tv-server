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

function similarTvShows(_, args, { dataSources }) {
  return dataSources.tmdbApi.getSimilarTvShows(
    args.tmdbId,
    args.language,
    args.page
  )
}

function tvShowDetails(_, args, { dataSources }) {
  return dataSources.tmdbApi.getTvShowDetails(args.tmdbId, args.language)
}

module.exports = {
  popularMovies,
  similarMovies,
  movieDetails,
  popularTvShows,
  similarTvShows,
  tvShowDetails
}
