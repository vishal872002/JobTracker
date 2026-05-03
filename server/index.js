require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");
const connectDB = require("./db/connect");

async function main() {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: [
        "http://localhost:3000",
        "https://brave-bay-074abe710.7.azurestaticapps.net",
      ],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server)
  );

  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

main();