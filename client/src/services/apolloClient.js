import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URL || "http://localhost:5001/graphql";

const httpLink = createHttpLink({ uri: GRAPHQL_URI, credentials: "same-origin" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;