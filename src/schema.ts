import { gql } from 'apollo-server';

const schema = gql`
  type Query {
    discoverMovies(params: DiscoverMoviesInput!): MovieResults!
    recommendedMovies(
      tmdbId: Int!
      language: String! = "en"
      page: Int! = 1
    ): MovieResults!
    similarMovies(
      tmdbId: Int!
      language: String! = "en"
      page: Int! = 1
    ): MovieResults!
    movieDetails(tmdbId: Int!, language: String! = "en"): Movie!

    discoverTvShows(params: DiscoverTvShowsInput!): TvShowResults!
    recommendedTvShows(
      tmdbId: Int!
      language: String! = "en"
      page: Int! = 1
    ): TvShowResults!
    similarTvShows(
      tmdbId: Int!
      language: String! = "en"
      page: Int! = 1
    ): TvShowResults!
    tvShowDetails(tmdbId: Int!, language: String! = "en"): TvShow!
  }

  type MovieOverview {
    tmdbId: Int!
    title: String!
    originalTitle: String!
    language: String!
    originalLanguage: String!
    releaseDate: String!
    images: MovieImages!
  }

  type Movie {
    tmdbId: Int!
    title: String!
    originalTitle: String!
    language: String!
    originalLanguage: String!
    releaseDate: String!
    images: MovieImages!
    tagline: String!
    overview: String!
    genres: [Genre!]!
    runtime: Int!
    rating: Rating!
    releaseDates(region: String): [ReleaseDates!]!
    credits: Credits!
    externalIds: MovieExternalIds!
  }

  type MovieResults {
    results: [MovieOverview!]!
    pageInfo: PageInfo!
  }

  type TvShowOverview {
    tmdbId: Int!
    name: String!
    originalName: String!
    language: String!
    originalLanguage: String!
    firstAirDate: String!
    images: TvShowImages!
  }

  type TvShow {
    tmdbId: Int!
    name: String!
    originalName: String!
    language: String!
    originalLanguage: String!
    firstAirDate: String!
    images: TvShowImages!
    overview: String!
    genres: [Genre!]!
    runtime: [Int!]!
    rating: Rating!
    createdBy: [CreatedBy!]!
    type: String!
    inProduction: Boolean!
    status: String!
    externalIds: TvShowExternalIds!
  }

  type TvShowResults {
    results: [TvShowOverview!]!
    pageInfo: PageInfo!
  }

  enum ImageOrientation {
    PORTRAIT
    LANDSCAPE
  }

  type LogoImage {
    url: String!
    lang: String!
    rank: Float!
  }

  type PosterImage {
    url: String!
    orientation: ImageOrientation!
    lang: String!
    rank: Float!
  }

  type MovieBackgroundImage {
    url: String!
    orientation: ImageOrientation
    rank: Float!
  }

  type MovieImages {
    logo: LogoImage
    logos(limit: Int): [LogoImage!]!
    poster(orientation: ImageOrientation!): PosterImage
    posters(orientation: ImageOrientation!, limit: Int): [PosterImage!]!
    background(orientation: ImageOrientation!): MovieBackgroundImage
    backgrounds(
      orientation: ImageOrientation!
      limit: Int
    ): [MovieBackgroundImage!]!
  }

  type TvShowBackgroundImage {
    url: String!
    orientation: ImageOrientation!
    rank: Float!
    season: Int
  }

  type TvShowImages {
    logo: LogoImage
    logos(limit: Int): [LogoImage!]!
    poster(orientation: ImageOrientation!): PosterImage
    posters(orientation: ImageOrientation!, limit: Int): [PosterImage!]!
    background(orientation: ImageOrientation!): TvShowBackgroundImage
    backgrounds(
      orientation: ImageOrientation!
      limit: Int
    ): [TvShowBackgroundImage!]!
  }

  type PageInfo {
    page: Int!
    totalPages: Int!
    totalResults: Int!
  }

  type Genre {
    id: Int!
    name: String!
  }

  type Credits {
    directors: [Crew!]!
    writers: [Crew!]!
    cast: [Cast!]!
  }

  type Crew {
    id: Int!
    name: String!
    job: String!
  }

  type Cast {
    id: Int!
    name: String!
    character: String!
  }

  type CreatedBy {
    id: Int!
    name: String!
  }

  type ReleaseDates {
    region: String!
    results: [ReleaseDate!]!
  }

  type ReleaseDate {
    releaseDate: String!
    certification: String!
    type: Int!
  }

  enum ReleaseDateType {
    PREMIERE
    THEATRICAL_LIMITED
    THEATRICAL
    DIGITAL
    PHYSICAL
    TV
  }

  type Rating {
    voteAverage: Float!
    voteCount: Int!
  }

  type MovieExternalIds {
    imdbId: String
    facebookId: String
    instagramId: String
    twitterId: String
  }

  type TvShowExternalIds {
    imdbId: String
    tvdbId: String
    facebookId: String
    instagramId: String
    twitterId: String
  }

  input DiscoverMoviesInput {
    language: String = "en"
    region: String
    sortBy: String = "popularity.desc"
    certificationCountry: String
    certification: String
    certificationLte: String
    certificationGte: String
    includeAdult: Boolean = false
    includeVideo: Boolean = false
    page: Int = 1
    primaryReleaseYear: Int
    primaryReleaseDateGte: String
    primaryReleaseDateLte: String
    releaseDateGte: String
    releaseDateLte: String
    withReleaseType: String
    year: Int
    voteCountGte: Int
    voteCountLte: Int
    voteAverageGte: Float
    voteAverageLte: Float
    withCast: String
    withCrew: String
    withPeople: String
    withCompanies: String
    withGenres: String
    withoutGenres: String
    withKeywords: String
    withoutKeywords: String
    withRuntimeGte: Int
    withRuntimeLte: Int
    withOriginalLanguage: String
  }

  input DiscoverTvShowsInput {
    language: String = "en"
    sortBy: String = "popularity.desc"
    airDateGte: String
    airDateLte: String
    firstAirDateGte: String
    firstAirDateLte: String
    firstAirDateYear: Int
    page: Int = 1
    timezone: String
    voteAverageGte: Float
    voteCountGte: Int
    withGenres: String
    withNetworks: String
    withoutGenres: String
    withRuntimeGte: Int
    withRuntimeLte: Int
    includeNullFirstAirDates: Boolean
    withOriginalLanguage: String
    withoutKeywords: String
    screenedTheatrically: Boolean
    withCompanies: String
    withKeywords: String
  }
`;

export default schema;
