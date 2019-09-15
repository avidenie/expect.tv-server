const { gql } = require('apollo-server')

const schema = gql`
  type Query {
    popularMovies: [Movie!]!
  }

  type Movie {
    id: Int!
    title: String!
  }
`

module.exports = schema
