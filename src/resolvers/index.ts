import { Resolvers } from 'types/generated';
import movieImagesResolvers from 'resolvers/movie-images';
import movieOverviewResolvers from 'resolvers/movie-overview';
import movieResolvers from 'resolvers/movie';
import queryResolvers from 'resolvers/query';
import tvShowImagesResolvers from 'resolvers/tv-show-images';
import tvShowOverviewResolvers from 'resolvers/tv-show-overview';
import tvShowResolvers from 'resolvers/tv-show';

const ReleaseType = {
  PREMIERE: 1,
  THEATRICAL_LIMITED: 2,
  THEATRICAL: 3,
  DIGITAL: 4,
  PHYSICAL: 5,
  TV: 6,
};

const DiscoverMoviesSortByArg = {
  POPULARITY_ASC: 'popularity.asc',
  POPULARITY_DESC: 'popularity.desc',
  RELEASE_DATE_ASC: 'release_date.asc',
  RELEASE_DATE_DESC: 'release_date.desc',
  REVENUE_ASC: 'revenue.asc',
  REVENUE_DESC: 'revenue.desc',
  PRIMARY_RELEASE_DATE_ASC: 'primary_release_date.asc',
  PRIMARY_RELEASE_DATE_DESC: 'primary_release_date.desc',
  ORIGINAL_TITLE_ASC: 'original_title.asc',
  ORIGINAL_TITLE_DESC: 'original_title.desc',
  VOTE_AVERAGE_ASC: 'vote_average.asc',
  VOTE_AVERAGE_DESC: 'vote_average.desc',
  VOTE_COUNT_ASC: 'vote_count.asc',
  VOTE_COUNT_DESC: 'vote_count.desc',
};

const DiscoverTvShowsSortByArg = {
  POPULARITY_ASC: 'popularity.asc',
  POPULARITY_DESC: 'popularity.desc',
  FIRST_AIR_DATE_ASC: 'first_air_date.asc',
  FIRST_AIR_DATE_DESC: 'first_air_date.desc',
  VOTE_AVERAGE_ASC: 'vote_average.asc',
  VOTE_AVERAGE_DESC: 'vote_average.desc',
};

const resolvers: Resolvers = {
  Query: queryResolvers,
  Movie: movieResolvers,
  MovieOverview: movieOverviewResolvers,
  MovieImages: movieImagesResolvers,
  TvShow: tvShowResolvers,
  TvShowOverview: tvShowOverviewResolvers,
  TvShowImages: tvShowImagesResolvers,
  ReleaseType,
  DiscoverMoviesSortByArg,
  DiscoverTvShowsSortByArg,
};

export default resolvers;
