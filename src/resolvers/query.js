function discoverMovies(_, args, { dataSources }) {
  return dataSources.tmdbApi.discoverMovies(args.params)
}

function recommendedMovies(_, args, { dataSources }) {
  return dataSources.tmdbApi.getRecommendedMovies(
    args.tmdbId,
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

function discoverTvShows(_, args, { dataSources }) {
  return dataSources.tmdbApi.discoverTvShows(args.params)
}

function recommendedTvShows(_, args, { dataSources }) {
  return dataSources.tmdbApi.getRecommendedTvShows(
    args.tmdbId,
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
  discoverMovies,
  recommendedMovies,
  similarMovies,
  movieDetails,
  discoverTvShows,
  recommendedTvShows,
  similarTvShows,
  tvShowDetails
}
