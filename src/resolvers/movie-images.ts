import { MovieImagesResolvers } from 'types/generated';
import {
  getMovieLogos,
  getMoviePosters,
  getMovieBackgrounds,
} from 'resolvers/helpers/movie-images';

const movieImagesResolvers: MovieImagesResolvers = {
  logo: async (parent, _, { dataSources }) => {
    return (await getMovieLogos(dataSources, parent, 1))[0];
  },

  logos: async (parent, args, { dataSources }) => {
    return getMovieLogos(dataSources, parent, args.limit);
  },

  poster: async (parent, args, { dataSources }) => {
    return (await getMoviePosters(dataSources, parent, args.orientation, 1))[0];
  },

  posters: async (parent, args, { dataSources }) => {
    return getMoviePosters(dataSources, parent, args.orientation, args.limit);
  },

  background: async (parent, args, { dataSources }) => {
    return (
      await getMovieBackgrounds(dataSources, parent, args.orientation, 1)
    )[0];
  },

  backgrounds: async (parent, args, { dataSources }) => {
    return getMovieBackgrounds(
      dataSources,
      parent,
      args.orientation,
      args.limit,
    );
  },
};

export default movieImagesResolvers;
