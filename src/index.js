const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`Server in running at ${url}`)
})
