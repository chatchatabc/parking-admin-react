import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

interface Props {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "http://192.168.1.11:5180/graphql/",
  cache: new InMemoryCache(),
});

function GraphqlProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphqlProvider;
