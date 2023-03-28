const { ApolloServer } = require("@apollo/server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { startStandaloneServer } = require("@apollo/server/standalone");

require("dotenv").config({ path: "./.env" });

const { BASE_URL, USERS_PORT, REVIEWS_PORT, FORMATTER_PORT } = process.env;

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "users", url: `${BASE_URL}:${USERS_PORT}` },
      { name: "reviews", url: `${BASE_URL}:${REVIEWS_PORT}` },
      { name: "formatter", url: `${BASE_URL}:${FORMATTER_PORT}` },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

startStandaloneServer(server, {
  context: (req) => {
    return { context: true };
  },
  listen: { port: process.env.GATEWAY_PORT },
}).then(({ url }) => console.info("running", url));









