const { gql } = require('apollo-server')

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
    releaseDate: String!
    images: Images!
  }

  type Movie {
    tmdbId: Int!
    title: String!
    originalTitle: String!
    originalLanguage: String!
    releaseDate: String!
    images: Images!
    tagline: String!
    overview: String!
    genres: [Genre!]!
    runtime: Int!
    rating: Rating!
    releaseDates(region: String): [ReleaseDates!]!
    credits: Credits!
  }

  type MovieResults {
    results: [MovieOverview!]!
    pageInfo: PageInfo!
  }

  type TvShowOverview {
    tmdbId: Int!
    name: String!
    firstAirDate: String!
    images: Images!
  }

  type TvShow {
    tmdbId: Int!
    name: String!
    originalName: String!
    originalLanguage: String!
    firstAirDate: String!
    images: Images!
    overview: String!
    genres: [Genre!]!
    runtime: [Int!]!
    rating: Rating!
    createdBy: [CreatedBy!]!
    type: String!
    inProduction: Boolean!
    status: String!
  }

  type TvShowResults {
    results: [TvShowOverview!]!
    pageInfo: PageInfo!
  }

  type Images {
    poster: String
    thumbnail: String
    logo: String
    backgrounds(limit: Int! = 1): [String!]!
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
    type: ReleaseDateType!
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

  input DiscoverMoviesInput {
    language: String = "en-US"
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
    language: String = "en-US"
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
`

module.exports = schema
