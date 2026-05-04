import { ApolloProvider } from "@apollo/client/react";
import client from "./services/apolloClient";
import { JobProvider } from "./context/JobContext";
import BoardPage from "./pages/BoardPage";

export default function App() {
  console.log("Apollo client:", client);
  return (
    <ApolloProvider client={client}>
      <JobProvider>
        <div className="app">
          <BoardPage />
        </div>
      </JobProvider>
    </ApolloProvider>
  );
}
