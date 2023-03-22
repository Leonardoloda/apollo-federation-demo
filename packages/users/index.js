const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { gql } = require("graphql-tag");

let users = [
  {
    id: "1",
    firstName: "Leo",
    lastName: "L",
    email: "leo@luxurypresence.com",
  },
  {
    id: "2",
    firstName: "Malik",
    lastName: "In",
    email: "malik@luxurypresence.com",
  },
];

// -------------------------

const typeDefs = gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    addUser(user: UserInput): User
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
  }

  type User @key(fields: "id") {
    id: ID!
    firstName: String
    lastName: String
    email: String
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((u) => u.id === id),
  },
  Mutation: {
    addUser: (_, { user }) => {
      users = users.concat({
        id: users.length + 1,
        ...user,
      });

      return users.at(users.length - 1);
    },
  },
};

// -------------------------

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, { listen: { port: 4001 } }).then(({ url }) =>
  console.info("running", url)
);

