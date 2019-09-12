const { gql } = require('apollo-server')

const schema = gql`
  type Query {
    info: String!
    movies: [Movie!]!
  }

  type Movie {
    id: Int!
    title: String!
  }
`

module.exports = schema
