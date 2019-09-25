const { gql } = require('apollo-server')

const schema = gql`
  type Query {
    popularMovies(region: String = "US", language: String = "en"): [Movie!]!
  }

  type Movie {
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
`

module.exports = schema
