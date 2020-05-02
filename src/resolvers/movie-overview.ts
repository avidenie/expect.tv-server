import { MovieOverviewResolvers } from 'types/generated';

const movieOverviewResolvers: MovieOverviewResolvers = {
  images: async (parent) => {
    return {
      tmdbId: parent.tmdbId,
      fanartId: parent.tmdbId,
      language: parent.language,
      fallbackLanguage: parent.originalLanguage,
    };
  },
};

export default movieOverviewResolvers;
