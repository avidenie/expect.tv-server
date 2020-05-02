import { TvShowResolvers } from 'types/generated';

const resolvers: TvShowResolvers = {
  images: async (parent) => ({
    tmdbId: parent.tmdbId,
    tvdbId: parent.externalIds.tvdbId,
    language: parent.language,
    fallbackLanguage: parent.originalLanguage,
  }),
};

export default resolvers;
