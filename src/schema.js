const { gql } = require('apollo-server')

const schema = gql`
  type Query {
    popularMovies(
      region: String! = "US"
      language: String! = "en"
      page: Int! = 1
    ): MovieResults!
    similarMovies(
      tmdbId: Int!
      language: String! = "en"
      page: Int! = 1
    ): MovieResults!
    movieDetails(
      tmdbId: Int!
      language: String! = "en"
    ): Movie!
    popularTvShows(
      region: String! = "US"
      language: String! = "en"
      page: Int! = 1
    ): TvShowResults!
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
    tagline: String!
    overview: String!
    runtime: Int!
    images: Images!
    genres: [Genre!]!
    credits: Credits!
    primaryReleaseDate: String!
    releaseDates(
      region: String
    ): [ReleaseDates!]!
  }

  type TvShow {
    tmdbId: Int!
    title: String!
    images: Images!
  }

  type Images {
    poster: String
    thumbnail: String
    logo: String
    backgrounds(limit: Int! = 1): [String!]!
  }

  type MovieResults {
    results: [MovieOverview!]!
    pageInfo: PageInfo!
  }

  type TvShowResults {
    results: [TvShow!]!
    pageInfo: PageInfo!
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
`

module.exports = schema
