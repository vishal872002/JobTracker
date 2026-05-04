import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "production"
    ? "https://jobapptracker-api.azurewebsites.net/graphql"
    : "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

export default client;