# apollo-federation-demo

This is a Lerna monorepo containing three subgraphs for an Apollo Federated Graph:

- `users` A GraphQL service providing information about users
- `reviews` A GraphQL service providing information about reviews
- `formatter` A GraphQL service formatting data from the users and reviews services

## Setup

1. Clone the repository and navigate to the root directory.
2. Run yarn install to install all dependencies for the monorepo and its subgraphs.

## Running the gateway

1. In the root directory, run yarn start to start the federated graph.
2. Navigate to http://localhost:4000 in your browser to access the federated graph Playground.
3. Send queries to the federated graph using combining data from the users, reviews, and formatter subgraphs.

## Running the subgraphs

1. Navigate to the subgraph you want to run (e.g. cd packages/users).
2. Run yarn start to start the subgraph.
3. Repeat steps 1-2 for the other subgraphs (reviews and formatter).

## Contributing

To contribute to this repository, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your changes (git checkout -b my-new-feature).
3. Make your changes and commit them (git commit -am 'Add some feature').
4. Push your changes to your fork (git push origin my-new-feature).
5. Create a new Pull Request on GitHub.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
