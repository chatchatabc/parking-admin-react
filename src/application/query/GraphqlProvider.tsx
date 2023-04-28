import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  DocumentNode,
} from "@apollo/client";

interface Props {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "http://192.168.1.11:5180/graphql",
  cache: new InMemoryCache(),
});

export function graphqlQuery(schema: DocumentNode, name: string) {
  const query = useQuery(schema);

  React.useEffect(() => {
    if (query.data) {
      console.log(`${name} debug`);
      console.log({
        data: query.data,
        errors: query.error,
        loading: query.loading,
      });
    }
  }, [query.data]);

  return query;
}

function GraphqlProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphqlProvider;
