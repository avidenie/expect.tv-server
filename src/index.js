const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server in running at ${url}`)
})
