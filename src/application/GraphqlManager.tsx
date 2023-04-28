import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  authLink,
  httpLink,
} from "../domain/infra/apollo-client/apolloActions";

interface Props {
  children: React.ReactNode;
}

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function GraphqlManager({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphqlManager;
