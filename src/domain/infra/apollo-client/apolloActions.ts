import { DocumentNode, createHttpLink, useQuery } from "@apollo/client";
import React from "react";
import { authTokenGet } from "../../service/authService";
import { setContext } from "@apollo/client/link/context";

export const httpLink = createHttpLink({
  uri: "/graphql",
});

export const authLink = setContext((_, { headers }) => {
  const token = authTokenGet();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
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
