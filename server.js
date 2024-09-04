const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({
      embed: true,
      includeCookies: false,
    }),
  ],
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });
  console.log(`🚀 Server ready at ${url}`);
}

startServer();