import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  DocumentNode,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { authTokenGet } from "../domain/service/authService";

interface Props {
  children: React.ReactNode;
}

const httpLink = createHttpLink({
  uri: "http://192.168.1.11:5180/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = authTokenGet();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function GraphqlManager({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphqlManager;
