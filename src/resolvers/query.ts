import { QueryResolvers } from 'types/generated';

const queryResolvers: QueryResolvers = {
  discoverMovies: async (_, args, { dataSources }) => {
    return await dataSources.tmdbApi.discoverMovies(args.params);
  },

  recommendedMovies: (_, args, { dataSources }) => {
    return dataSources.tmdbApi.getRecommendedMovies(
      args.tmdbId,
      args.language,
      args.page,
    );
  },

  similarMovies: (_, args, { dataSources }) => {
    return dataSources.tmdbApi.getSimilarMovies(
      args.tmdbId,
      args.language,
      args.page,
    );
  },

  movieDetails: (_, args, { dataSources }) => {
    return dataSources.tmdbApi.getMovieDetails(args.tmdbId, args.language);
  },

  discoverTvShows: (_, args, { dataSources }) => {
    return dataSources.tmdbApi.discoverTvShows(args.params);
  },

  recommendedTvShows: (_, args, { dataSources }) => {
    return dataSources.tmdbApi.getRecommendedTvShows(
      args.tmdbId,
      args.language,
      args.page,
    );
  },

  similarTvShows: (_, args, { dataSources }) => {
    return dataSources.tmdbApi.getSimilarTvShows(
      args.tmdbId,
      args.language,
      args.page,
    );
  },

  tvShowDetails: (_, args, { dataSources }) => {
    return dataSources.tmdbApi.getTvShowDetails(args.tmdbId, args.language);
  },
};

export default queryResolvers;
