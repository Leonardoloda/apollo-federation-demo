const { ApolloServer } = require("@apollo/server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { startStandaloneServer } = require("@apollo/server/standalone");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "users", url: "http://localhost:4001" },
      { name: "reviews", url: "http://localhost:4002" },
      { name: "formatter", url: "http://localhost:4003" },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) =>
  console.info("running", url)
);

