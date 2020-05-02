import { TvShowOverviewResolvers } from 'types/generated';

const resolvers: TvShowOverviewResolvers = {
  images: async (parent, _, { dataSources }) => {
    const externalIds = await dataSources.tmdbApi.getTvShowExternalIds(
      parent.tmdbId,
    );
    return {
      tmdbId: parent.tmdbId,
      tvdbId: externalIds.tvdbId,
      language: parent.language,
      fallbackLanguage: parent.originalLanguage,
    };
  },
};

export default resolvers;
