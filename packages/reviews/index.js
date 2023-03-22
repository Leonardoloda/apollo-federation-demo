const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");
const gql = require("graphql-tag");

let reviews = [
  { userId: 1, id: "1", body: "Reviews 1" },
  { userId: 2, id: "2", body: "Reviews 2" },
];

// --------------------------------------------

const typeDefs = gql`
  extend type User @key(fields: "id") {
    id: ID! @external
    reviews: [Review] @requires(fields: "id")
  }

  type Review {
    id: ID!
    body: String
    title: String
  }

  input ReviewInput {
    body: String
    title: String
  }

  extend type Query {
    reviews: [Review]
  }

  type Mutation {
    addReview(review: ReviewInput): Review
  }
`;

const resolvers = {
  User: {
    reviews: ({ id }) => {
      return reviews.filter((review) => review.userId == id);
    },
  },
  Query: {
    reviews: () => reviews,
  },
  Mutation: {
    addReview: (_, { review }) => {
      reviews = reviews.concat({ id: reviews.length + 1, ...review });

      return reviews.at(reviews.length - 1);
    },
  },
};

// --------------------------------------------

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, { listen: { port: 4002 } }).then(({ url }) =>
  console.info("running", url)
);

