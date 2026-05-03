require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");
const connectDB = require("./db/connect");

async function main() {
  await connectDB();
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 5000 },
  });
  console.log(`🚀 GraphQL server ready at ${url}`);
}

main();