const FanartApi = require('./datasources/fanart')
const resolvers = require('./resolvers')
const TMDbApi = require('./datasources/tmdb')
const typeDefs = require('./schema')
const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    fanartApi: new FanartApi(),
    tmdbApi: new TMDbApi()
  }),
  context: () => ({
    fanartApiKey: process.env.FANART_API_KEY,
    tmdbApiKey: process.env.TMDB_API_KEY
  })
})

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`Server in running at ${url}`)
})
