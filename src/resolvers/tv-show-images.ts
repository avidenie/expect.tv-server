import { TvShowImagesResolvers } from 'types/generated';
import {
  getTvShowLogos,
  getTvShowPosters,
  getTvShowBackgrounds,
} from 'resolvers/helpers/tv-show-images';

const tvShowImagesResolvers: TvShowImagesResolvers = {
  logo: async (parent, _, { dataSources }) => {
    return (await getTvShowLogos(dataSources, parent, 1))[0];
  },

  logos: async (parent, args, { dataSources }) => {
    return getTvShowLogos(dataSources, parent, args.limit);
  },

  poster: async (parent, args, { dataSources }) => {
    return (
      await getTvShowPosters(dataSources, parent, args.orientation, 1)
    )[0];
  },

  posters: async (parent, args, { dataSources }) => {
    return getTvShowPosters(dataSources, parent, args.orientation, args.limit);
  },

  background: async (parent, args, { dataSources }) => {
    return (
      await getTvShowBackgrounds(dataSources, parent, args.orientation, 1)
    )[0];
  },

  backgrounds: async (parent, args, { dataSources }) => {
    return getTvShowBackgrounds(
      dataSources,
      parent,
      args.orientation,
      args.limit,
    );
  },
};

export default tvShowImagesResolvers;
