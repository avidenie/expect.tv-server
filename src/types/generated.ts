import { GraphQLResolveInfo } from 'graphql';
import { ParentMovieImages, ParentTvShowImages } from './mappers';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  discoverMovies: MovieResults;
  recommendedMovies: MovieResults;
  similarMovies: MovieResults;
  movieDetails: Movie;
  discoverTvShows: TvShowResults;
  recommendedTvShows: TvShowResults;
  similarTvShows: TvShowResults;
  tvShowDetails: TvShow;
};


export type QueryDiscoverMoviesArgs = {
  params: DiscoverMoviesInput;
};


export type QueryRecommendedMoviesArgs = {
  tmdbId: Scalars['Int'];
  language?: Scalars['String'];
  page?: Scalars['Int'];
};


export type QuerySimilarMoviesArgs = {
  tmdbId: Scalars['Int'];
  language?: Scalars['String'];
  page?: Scalars['Int'];
};


export type QueryMovieDetailsArgs = {
  tmdbId: Scalars['Int'];
  language?: Scalars['String'];
};


export type QueryDiscoverTvShowsArgs = {
  params: DiscoverTvShowsInput;
};


export type QueryRecommendedTvShowsArgs = {
  tmdbId: Scalars['Int'];
  language?: Scalars['String'];
  page?: Scalars['Int'];
};


export type QuerySimilarTvShowsArgs = {
  tmdbId: Scalars['Int'];
  language?: Scalars['String'];
  page?: Scalars['Int'];
};


export type QueryTvShowDetailsArgs = {
  tmdbId: Scalars['Int'];
  language?: Scalars['String'];
};

export type MovieOverview = {
   __typename?: 'MovieOverview';
  tmdbId: Scalars['Int'];
  title: Scalars['String'];
  originalTitle: Scalars['String'];
  language: Scalars['String'];
  originalLanguage: Scalars['String'];
  releaseDate: Scalars['String'];
  images: MovieImages;
};

export type Movie = {
   __typename?: 'Movie';
  tmdbId: Scalars['Int'];
  title: Scalars['String'];
  originalTitle: Scalars['String'];
  language: Scalars['String'];
  originalLanguage: Scalars['String'];
  releaseDate: Scalars['String'];
  images: MovieImages;
  tagline: Scalars['String'];
  overview: Scalars['String'];
  genres: Array<Genre>;
  runtime: Scalars['Int'];
  rating: Rating;
  releaseDates: Array<ReleaseDates>;
  credits: Credits;
  externalIds: MovieExternalIds;
};


export type MovieReleaseDatesArgs = {
  region?: Maybe<Scalars['String']>;
};

export type MovieResults = {
   __typename?: 'MovieResults';
  results: Array<MovieOverview>;
  pageInfo: PageInfo;
};

export type TvShowOverview = {
   __typename?: 'TvShowOverview';
  tmdbId: Scalars['Int'];
  name: Scalars['String'];
  originalName: Scalars['String'];
  language: Scalars['String'];
  originalLanguage: Scalars['String'];
  firstAirDate: Scalars['String'];
  images: TvShowImages;
};

export type TvShow = {
   __typename?: 'TvShow';
  tmdbId: Scalars['Int'];
  name: Scalars['String'];
  originalName: Scalars['String'];
  language: Scalars['String'];
  originalLanguage: Scalars['String'];
  firstAirDate: Scalars['String'];
  images: TvShowImages;
  overview: Scalars['String'];
  genres: Array<Genre>;
  runtime: Array<Scalars['Int']>;
  rating: Rating;
  createdBy: Array<CreatedBy>;
  type: Scalars['String'];
  inProduction: Scalars['Boolean'];
  status: Scalars['String'];
  externalIds: TvShowExternalIds;
};

export type TvShowResults = {
   __typename?: 'TvShowResults';
  results: Array<TvShowOverview>;
  pageInfo: PageInfo;
};

export enum ImageOrientation {
  Portrait = 'PORTRAIT',
  Landscape = 'LANDSCAPE'
}

export type LogoImage = {
   __typename?: 'LogoImage';
  url: Scalars['String'];
  lang: Scalars['String'];
  rank: Scalars['Float'];
};

export type PosterImage = {
   __typename?: 'PosterImage';
  url: Scalars['String'];
  orientation: ImageOrientation;
  lang: Scalars['String'];
  rank: Scalars['Float'];
};

export type MovieBackgroundImage = {
   __typename?: 'MovieBackgroundImage';
  url: Scalars['String'];
  orientation?: Maybe<ImageOrientation>;
  rank: Scalars['Float'];
};

export type MovieImages = {
   __typename?: 'MovieImages';
  logo?: Maybe<LogoImage>;
  logos: Array<LogoImage>;
  poster?: Maybe<PosterImage>;
  posters: Array<PosterImage>;
  background?: Maybe<MovieBackgroundImage>;
  backgrounds: Array<MovieBackgroundImage>;
};


export type MovieImagesLogosArgs = {
  limit?: Maybe<Scalars['Int']>;
};


export type MovieImagesPosterArgs = {
  orientation: ImageOrientation;
};


export type MovieImagesPostersArgs = {
  orientation: ImageOrientation;
  limit?: Maybe<Scalars['Int']>;
};


export type MovieImagesBackgroundArgs = {
  orientation: ImageOrientation;
};


export type MovieImagesBackgroundsArgs = {
  orientation: ImageOrientation;
  limit?: Maybe<Scalars['Int']>;
};

export type TvShowBackgroundImage = {
   __typename?: 'TvShowBackgroundImage';
  url: Scalars['String'];
  orientation: ImageOrientation;
  rank: Scalars['Float'];
  season?: Maybe<Scalars['Int']>;
};

export type TvShowImages = {
   __typename?: 'TvShowImages';
  logo?: Maybe<LogoImage>;
  logos: Array<LogoImage>;
  poster?: Maybe<PosterImage>;
  posters: Array<PosterImage>;
  background?: Maybe<TvShowBackgroundImage>;
  backgrounds: Array<TvShowBackgroundImage>;
};


export type TvShowImagesLogosArgs = {
  limit?: Maybe<Scalars['Int']>;
};


export type TvShowImagesPosterArgs = {
  orientation: ImageOrientation;
};


export type TvShowImagesPostersArgs = {
  orientation: ImageOrientation;
  limit?: Maybe<Scalars['Int']>;
};


export type TvShowImagesBackgroundArgs = {
  orientation: ImageOrientation;
};


export type TvShowImagesBackgroundsArgs = {
  orientation: ImageOrientation;
  limit?: Maybe<Scalars['Int']>;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  page: Scalars['Int'];
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
};

export type Genre = {
   __typename?: 'Genre';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Credits = {
   __typename?: 'Credits';
  directors: Array<Crew>;
  writers: Array<Crew>;
  cast: Array<Cast>;
};

export type Crew = {
   __typename?: 'Crew';
  id: Scalars['Int'];
  name: Scalars['String'];
  job: Scalars['String'];
};

export type Cast = {
   __typename?: 'Cast';
  id: Scalars['Int'];
  name: Scalars['String'];
  character: Scalars['String'];
};

export type CreatedBy = {
   __typename?: 'CreatedBy';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ReleaseDates = {
   __typename?: 'ReleaseDates';
  region: Scalars['String'];
  results: Array<ReleaseDate>;
};

export type ReleaseDate = {
   __typename?: 'ReleaseDate';
  releaseDate: Scalars['String'];
  certification: Scalars['String'];
  type: Scalars['Int'];
};

export enum ReleaseDateType {
  Premiere = 'PREMIERE',
  TheatricalLimited = 'THEATRICAL_LIMITED',
  Theatrical = 'THEATRICAL',
  Digital = 'DIGITAL',
  Physical = 'PHYSICAL',
  Tv = 'TV'
}

export type Rating = {
   __typename?: 'Rating';
  voteAverage: Scalars['Float'];
  voteCount: Scalars['Int'];
};

export type MovieExternalIds = {
   __typename?: 'MovieExternalIds';
  imdbId?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  instagramId?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type TvShowExternalIds = {
   __typename?: 'TvShowExternalIds';
  imdbId?: Maybe<Scalars['String']>;
  tvdbId?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  instagramId?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type DiscoverMoviesInput = {
  language?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  certificationCountry?: Maybe<Scalars['String']>;
  certification?: Maybe<Scalars['String']>;
  certificationLte?: Maybe<Scalars['String']>;
  certificationGte?: Maybe<Scalars['String']>;
  includeAdult?: Maybe<Scalars['Boolean']>;
  includeVideo?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  primaryReleaseYear?: Maybe<Scalars['Int']>;
  primaryReleaseDateGte?: Maybe<Scalars['String']>;
  primaryReleaseDateLte?: Maybe<Scalars['String']>;
  releaseDateGte?: Maybe<Scalars['String']>;
  releaseDateLte?: Maybe<Scalars['String']>;
  withReleaseType?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
  voteCountGte?: Maybe<Scalars['Int']>;
  voteCountLte?: Maybe<Scalars['Int']>;
  voteAverageGte?: Maybe<Scalars['Float']>;
  voteAverageLte?: Maybe<Scalars['Float']>;
  withCast?: Maybe<Scalars['String']>;
  withCrew?: Maybe<Scalars['String']>;
  withPeople?: Maybe<Scalars['String']>;
  withCompanies?: Maybe<Scalars['String']>;
  withGenres?: Maybe<Scalars['String']>;
  withoutGenres?: Maybe<Scalars['String']>;
  withKeywords?: Maybe<Scalars['String']>;
  withoutKeywords?: Maybe<Scalars['String']>;
  withRuntimeGte?: Maybe<Scalars['Int']>;
  withRuntimeLte?: Maybe<Scalars['Int']>;
  withOriginalLanguage?: Maybe<Scalars['String']>;
};

export type DiscoverTvShowsInput = {
  language?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  airDateGte?: Maybe<Scalars['String']>;
  airDateLte?: Maybe<Scalars['String']>;
  firstAirDateGte?: Maybe<Scalars['String']>;
  firstAirDateLte?: Maybe<Scalars['String']>;
  firstAirDateYear?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  voteAverageGte?: Maybe<Scalars['Float']>;
  voteCountGte?: Maybe<Scalars['Int']>;
  withGenres?: Maybe<Scalars['String']>;
  withNetworks?: Maybe<Scalars['String']>;
  withoutGenres?: Maybe<Scalars['String']>;
  withRuntimeGte?: Maybe<Scalars['Int']>;
  withRuntimeLte?: Maybe<Scalars['Int']>;
  includeNullFirstAirDates?: Maybe<Scalars['Boolean']>;
  withOriginalLanguage?: Maybe<Scalars['String']>;
  withoutKeywords?: Maybe<Scalars['String']>;
  screenedTheatrically?: Maybe<Scalars['Boolean']>;
  withCompanies?: Maybe<Scalars['String']>;
  withKeywords?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  MovieOverview: ResolverTypeWrapper<Omit<MovieOverview, 'images'> & { images: ResolversTypes['MovieImages'] }>,
  Movie: ResolverTypeWrapper<Omit<Movie, 'images'> & { images: ResolversTypes['MovieImages'] }>,
  MovieResults: ResolverTypeWrapper<Omit<MovieResults, 'results'> & { results: Array<ResolversTypes['MovieOverview']> }>,
  TvShowOverview: ResolverTypeWrapper<Omit<TvShowOverview, 'images'> & { images: ResolversTypes['TvShowImages'] }>,
  TvShow: ResolverTypeWrapper<Omit<TvShow, 'images'> & { images: ResolversTypes['TvShowImages'] }>,
  TvShowResults: ResolverTypeWrapper<Omit<TvShowResults, 'results'> & { results: Array<ResolversTypes['TvShowOverview']> }>,
  ImageOrientation: ImageOrientation,
  LogoImage: ResolverTypeWrapper<LogoImage>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  PosterImage: ResolverTypeWrapper<PosterImage>,
  MovieBackgroundImage: ResolverTypeWrapper<MovieBackgroundImage>,
  MovieImages: ResolverTypeWrapper<ParentMovieImages>,
  TvShowBackgroundImage: ResolverTypeWrapper<TvShowBackgroundImage>,
  TvShowImages: ResolverTypeWrapper<ParentTvShowImages>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Genre: ResolverTypeWrapper<Genre>,
  Credits: ResolverTypeWrapper<Credits>,
  Crew: ResolverTypeWrapper<Crew>,
  Cast: ResolverTypeWrapper<Cast>,
  CreatedBy: ResolverTypeWrapper<CreatedBy>,
  ReleaseDates: ResolverTypeWrapper<ReleaseDates>,
  ReleaseDate: ResolverTypeWrapper<ReleaseDate>,
  ReleaseDateType: ReleaseDateType,
  Rating: ResolverTypeWrapper<Rating>,
  MovieExternalIds: ResolverTypeWrapper<MovieExternalIds>,
  TvShowExternalIds: ResolverTypeWrapper<TvShowExternalIds>,
  DiscoverMoviesInput: DiscoverMoviesInput,
  DiscoverTvShowsInput: DiscoverTvShowsInput,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Query: {},
  Int: Scalars['Int'],
  MovieOverview: Omit<MovieOverview, 'images'> & { images: ResolversParentTypes['MovieImages'] },
  Movie: Omit<Movie, 'images'> & { images: ResolversParentTypes['MovieImages'] },
  MovieResults: Omit<MovieResults, 'results'> & { results: Array<ResolversParentTypes['MovieOverview']> },
  TvShowOverview: Omit<TvShowOverview, 'images'> & { images: ResolversParentTypes['TvShowImages'] },
  TvShow: Omit<TvShow, 'images'> & { images: ResolversParentTypes['TvShowImages'] },
  TvShowResults: Omit<TvShowResults, 'results'> & { results: Array<ResolversParentTypes['TvShowOverview']> },
  ImageOrientation: ImageOrientation,
  LogoImage: LogoImage,
  Float: Scalars['Float'],
  PosterImage: PosterImage,
  MovieBackgroundImage: MovieBackgroundImage,
  MovieImages: ParentMovieImages,
  TvShowBackgroundImage: TvShowBackgroundImage,
  TvShowImages: ParentTvShowImages,
  PageInfo: PageInfo,
  Genre: Genre,
  Credits: Credits,
  Crew: Crew,
  Cast: Cast,
  CreatedBy: CreatedBy,
  ReleaseDates: ReleaseDates,
  ReleaseDate: ReleaseDate,
  ReleaseDateType: ReleaseDateType,
  Rating: Rating,
  MovieExternalIds: MovieExternalIds,
  TvShowExternalIds: TvShowExternalIds,
  DiscoverMoviesInput: DiscoverMoviesInput,
  DiscoverTvShowsInput: DiscoverTvShowsInput,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  discoverMovies?: Resolver<ResolversTypes['MovieResults'], ParentType, ContextType, RequireFields<QueryDiscoverMoviesArgs, 'params'>>,
  recommendedMovies?: Resolver<ResolversTypes['MovieResults'], ParentType, ContextType, RequireFields<QueryRecommendedMoviesArgs, 'tmdbId' | 'language' | 'page'>>,
  similarMovies?: Resolver<ResolversTypes['MovieResults'], ParentType, ContextType, RequireFields<QuerySimilarMoviesArgs, 'tmdbId' | 'language' | 'page'>>,
  movieDetails?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<QueryMovieDetailsArgs, 'tmdbId' | 'language'>>,
  discoverTvShows?: Resolver<ResolversTypes['TvShowResults'], ParentType, ContextType, RequireFields<QueryDiscoverTvShowsArgs, 'params'>>,
  recommendedTvShows?: Resolver<ResolversTypes['TvShowResults'], ParentType, ContextType, RequireFields<QueryRecommendedTvShowsArgs, 'tmdbId' | 'language' | 'page'>>,
  similarTvShows?: Resolver<ResolversTypes['TvShowResults'], ParentType, ContextType, RequireFields<QuerySimilarTvShowsArgs, 'tmdbId' | 'language' | 'page'>>,
  tvShowDetails?: Resolver<ResolversTypes['TvShow'], ParentType, ContextType, RequireFields<QueryTvShowDetailsArgs, 'tmdbId' | 'language'>>,
}>;

export type MovieOverviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieOverview'] = ResolversParentTypes['MovieOverview']> = ResolversObject<{
  tmdbId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  originalTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  originalLanguage?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  releaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  images?: Resolver<ResolversTypes['MovieImages'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  tmdbId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  originalTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  originalLanguage?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  releaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  images?: Resolver<ResolversTypes['MovieImages'], ParentType, ContextType>,
  tagline?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>,
  runtime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>,
  releaseDates?: Resolver<Array<ResolversTypes['ReleaseDates']>, ParentType, ContextType, RequireFields<MovieReleaseDatesArgs, never>>,
  credits?: Resolver<ResolversTypes['Credits'], ParentType, ContextType>,
  externalIds?: Resolver<ResolversTypes['MovieExternalIds'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MovieResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieResults'] = ResolversParentTypes['MovieResults']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['MovieOverview']>, ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TvShowOverviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['TvShowOverview'] = ResolversParentTypes['TvShowOverview']> = ResolversObject<{
  tmdbId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  originalName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  originalLanguage?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstAirDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  images?: Resolver<ResolversTypes['TvShowImages'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['TvShow'] = ResolversParentTypes['TvShow']> = ResolversObject<{
  tmdbId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  originalName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  originalLanguage?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstAirDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  images?: Resolver<ResolversTypes['TvShowImages'], ParentType, ContextType>,
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>,
  runtime?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>,
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>,
  createdBy?: Resolver<Array<ResolversTypes['CreatedBy']>, ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  inProduction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  externalIds?: Resolver<ResolversTypes['TvShowExternalIds'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TvShowResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TvShowResults'] = ResolversParentTypes['TvShowResults']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['TvShowOverview']>, ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type LogoImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogoImage'] = ResolversParentTypes['LogoImage']> = ResolversObject<{
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  rank?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PosterImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['PosterImage'] = ResolversParentTypes['PosterImage']> = ResolversObject<{
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orientation?: Resolver<ResolversTypes['ImageOrientation'], ParentType, ContextType>,
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  rank?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MovieBackgroundImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieBackgroundImage'] = ResolversParentTypes['MovieBackgroundImage']> = ResolversObject<{
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orientation?: Resolver<Maybe<ResolversTypes['ImageOrientation']>, ParentType, ContextType>,
  rank?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MovieImagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieImages'] = ResolversParentTypes['MovieImages']> = ResolversObject<{
  logo?: Resolver<Maybe<ResolversTypes['LogoImage']>, ParentType, ContextType>,
  logos?: Resolver<Array<ResolversTypes['LogoImage']>, ParentType, ContextType, RequireFields<MovieImagesLogosArgs, never>>,
  poster?: Resolver<Maybe<ResolversTypes['PosterImage']>, ParentType, ContextType, RequireFields<MovieImagesPosterArgs, 'orientation'>>,
  posters?: Resolver<Array<ResolversTypes['PosterImage']>, ParentType, ContextType, RequireFields<MovieImagesPostersArgs, 'orientation'>>,
  background?: Resolver<Maybe<ResolversTypes['MovieBackgroundImage']>, ParentType, ContextType, RequireFields<MovieImagesBackgroundArgs, 'orientation'>>,
  backgrounds?: Resolver<Array<ResolversTypes['MovieBackgroundImage']>, ParentType, ContextType, RequireFields<MovieImagesBackgroundsArgs, 'orientation'>>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TvShowBackgroundImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['TvShowBackgroundImage'] = ResolversParentTypes['TvShowBackgroundImage']> = ResolversObject<{
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orientation?: Resolver<ResolversTypes['ImageOrientation'], ParentType, ContextType>,
  rank?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  season?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TvShowImagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TvShowImages'] = ResolversParentTypes['TvShowImages']> = ResolversObject<{
  logo?: Resolver<Maybe<ResolversTypes['LogoImage']>, ParentType, ContextType>,
  logos?: Resolver<Array<ResolversTypes['LogoImage']>, ParentType, ContextType, RequireFields<TvShowImagesLogosArgs, never>>,
  poster?: Resolver<Maybe<ResolversTypes['PosterImage']>, ParentType, ContextType, RequireFields<TvShowImagesPosterArgs, 'orientation'>>,
  posters?: Resolver<Array<ResolversTypes['PosterImage']>, ParentType, ContextType, RequireFields<TvShowImagesPostersArgs, 'orientation'>>,
  background?: Resolver<Maybe<ResolversTypes['TvShowBackgroundImage']>, ParentType, ContextType, RequireFields<TvShowImagesBackgroundArgs, 'orientation'>>,
  backgrounds?: Resolver<Array<ResolversTypes['TvShowBackgroundImage']>, ParentType, ContextType, RequireFields<TvShowImagesBackgroundsArgs, 'orientation'>>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type GenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CreditsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Credits'] = ResolversParentTypes['Credits']> = ResolversObject<{
  directors?: Resolver<Array<ResolversTypes['Crew']>, ParentType, ContextType>,
  writers?: Resolver<Array<ResolversTypes['Crew']>, ParentType, ContextType>,
  cast?: Resolver<Array<ResolversTypes['Cast']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CrewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Crew'] = ResolversParentTypes['Crew']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  job?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cast'] = ResolversParentTypes['Cast']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  character?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CreatedByResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedBy'] = ResolversParentTypes['CreatedBy']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type ReleaseDatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReleaseDates'] = ResolversParentTypes['ReleaseDates']> = ResolversObject<{
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  results?: Resolver<Array<ResolversTypes['ReleaseDate']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type ReleaseDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReleaseDate'] = ResolversParentTypes['ReleaseDate']> = ResolversObject<{
  releaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  certification?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type RatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']> = ResolversObject<{
  voteAverage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  voteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MovieExternalIdsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieExternalIds'] = ResolversParentTypes['MovieExternalIds']> = ResolversObject<{
  imdbId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  facebookId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  instagramId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  twitterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TvShowExternalIdsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TvShowExternalIds'] = ResolversParentTypes['TvShowExternalIds']> = ResolversObject<{
  imdbId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tvdbId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  facebookId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  instagramId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  twitterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  MovieOverview?: MovieOverviewResolvers<ContextType>,
  Movie?: MovieResolvers<ContextType>,
  MovieResults?: MovieResultsResolvers<ContextType>,
  TvShowOverview?: TvShowOverviewResolvers<ContextType>,
  TvShow?: TvShowResolvers<ContextType>,
  TvShowResults?: TvShowResultsResolvers<ContextType>,
  LogoImage?: LogoImageResolvers<ContextType>,
  PosterImage?: PosterImageResolvers<ContextType>,
  MovieBackgroundImage?: MovieBackgroundImageResolvers<ContextType>,
  MovieImages?: MovieImagesResolvers<ContextType>,
  TvShowBackgroundImage?: TvShowBackgroundImageResolvers<ContextType>,
  TvShowImages?: TvShowImagesResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Genre?: GenreResolvers<ContextType>,
  Credits?: CreditsResolvers<ContextType>,
  Crew?: CrewResolvers<ContextType>,
  Cast?: CastResolvers<ContextType>,
  CreatedBy?: CreatedByResolvers<ContextType>,
  ReleaseDates?: ReleaseDatesResolvers<ContextType>,
  ReleaseDate?: ReleaseDateResolvers<ContextType>,
  Rating?: RatingResolvers<ContextType>,
  MovieExternalIds?: MovieExternalIdsResolvers<ContextType>,
  TvShowExternalIds?: TvShowExternalIdsResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
