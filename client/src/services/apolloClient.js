import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.PROD
    ? "https://jobapptracker-api.azurewebsites.net/graphql"
    : "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

export default client;