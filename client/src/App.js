import { ApolloProvider } from "@apollo/client/react";
import client from "./services/apolloClient";
import { JobProvider } from "./context/JobContext";
import BoardPage from "./pages/BoardPage";

export default function App() {
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
