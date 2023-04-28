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
import { authTokenGet } from "../../domain/service/authService";

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

export function graphqlQuery(schema: DocumentNode, name: string) {
  const query = useQuery(schema);

  React.useEffect(() => {
    if (query.data) {
      console.log(`${name} debug`);
      console.log({ ...query, token: authTokenGet() });
    } else if (query.error) {
      console.log(`${name} error`);
      console.log({ ...query, token: authTokenGet() });
    }
  }, [query.data, query.error]);

  return query;
}

function GraphqlProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphqlProvider;
