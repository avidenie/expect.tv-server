import * as dotenv from 'dotenv';

import { ApolloServer } from 'apollo-server';
import FanartApi from 'datasources/fanart';
import TMDbApi from 'datasources/tmdb';
import resolvers from 'resolvers';
import typeDefs from 'schema';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    fanartApi: new FanartApi(),
    tmdbApi: new TMDbApi(),
  }),
  context: {
    fanartApiKey: process.env.FANART_API_KEY || '',
    tmdbApiKey: process.env.TMDB_API_KEY || '',
  },
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`Server in running at ${url}`);
});
