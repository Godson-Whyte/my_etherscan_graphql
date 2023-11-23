const { ApolloServer } = require("apollo-server"); // Importing Apollo Server to set up GraphQL server
const { importSchema } = require("graphql-import"); // Helper to import schema from another file
const EtherDataSource = require("./datasource/ethDatasource"); // Custom data source for fetching Ethereum data
const typeDefs = importSchema("./schema.graphql"); // Import schema from schema.graphql file

require("dotenv").config(); // Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance 
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest ETH price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate EtherDataSource
  }), 
});

server.timeout = 0; 
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});