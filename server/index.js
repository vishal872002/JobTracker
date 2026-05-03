// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@as-integrations/express4";
// import { typeDefs } from "./graphql/typeDefs.js";
// import { resolvers } from "./graphql/resolvers.js";
// import connectDB from "./db/connect.js";

// const app = express();
// const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
// // app.use(express.json());
// // app.use(cors({ origin: true, credentials: true }));

// await connectDB();
// // const server = new ApolloServer({ typeDefs, resolvers });
// const server = new ApolloServer({
//    typeDefs,
//    resolvers,
//    introspection: true,
//  });
// await server.start();

// app.use(
//   '/graphql',
//   cors(),
//   express.json(),
//   expressMiddleware(server),
// );

// const PORT = Number(process.env.PORT || 5001);
// app.listen(PORT, () => {
//   console.log(`GraphQL server ready at http://localhost${PORT}/graphql`);
// });

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