import { Resolvers } from 'types/generated';
import movieImagesResolvers from 'resolvers/movie-images';
import movieOverviewResolvers from 'resolvers/movie-overview';
import movieResolvers from 'resolvers/movie';
import queryResolvers from 'resolvers/query';
import tvShowImagesResolvers from 'resolvers/tv-show-images';
import tvShowOverviewResolvers from 'resolvers/tv-show-overview';
import tvShowResolvers from 'resolvers/tv-show';

const resolvers: Resolvers = {
  Query: queryResolvers,
  Movie: movieResolvers,
  MovieOverview: movieOverviewResolvers,
  MovieImages: movieImagesResolvers,
  TvShow: tvShowResolvers,
  TvShowOverview: tvShowOverviewResolvers,
  TvShowImages: tvShowImagesResolvers,
};

export default resolvers;
