const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");
const gql = require("graphql-tag");

const formatOptions = Object.freeze({
  CONCAT: "CONCAT",
});

// --------------------------------------------

const typeDefs = gql`
  extend type User @key(fields: "id") {
    id: ID! @external
    firstName: String @external
    lastName: String @external
    name(format: FORMAT_OPTIONS): String @requires(fields: "firstName lastName")
  }

  enum FORMAT_OPTIONS {
    CONCAT
  }
`;

const resolvers = {
  User: {
    __resolveReference: ({ firstName, lastName }) => {
      return { name: `${firstName} ${lastName}` };
    },
  },
};

// --------------------------------------------

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, { listen: { port: 4003 } }).then(({ url }) =>
  console.info("running", url)
);

