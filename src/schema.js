const { gql } = require('apollo-server')

const schema = gql`
  type Query {
    popularMovies(
      region: String = "US"
      language: String = "en"
      page: Int = 1
    ): MovieResults!
    popularTvShows(
      region: String = "US"
      language: String = "en"
      page: Int = 1
    ): TvShowResults!
  }

  type Movie {
    tmdbId: Int!
    title: String!
    images: Images!
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
    backgrounds(limit: Int = 1): [String]!
  }

  type MovieResults {
    results: [Movie!]!
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
`

module.exports = schema
