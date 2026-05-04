import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === "production"
    ? "https://jobapptracker-api.azurewebsites.net/graphql"
    : "http://localhost:5000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;