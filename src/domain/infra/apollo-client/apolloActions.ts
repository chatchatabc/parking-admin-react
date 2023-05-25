import {
  DocumentNode,
  QueryHookOptions,
  createHttpLink,
  useMutation,
  useQuery,
} from "@apollo/client";
import React from "react";
import { authTokenGet } from "../../services/authService";
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

export function graphqlQuery(
  schema: DocumentNode,
  name: string,
  options?: QueryHookOptions
) {
  const query = useQuery(schema, options);

  React.useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      if (query.data) {
        console.log(`${name} debug`);
        console.log({ ...query, token: authTokenGet() });
      } else if (query.error) {
        console.log(`${name} error`);
        console.log({ ...query, token: authTokenGet() });
      }
    }
  }, [query.data, query.error]);

  return query;
}

export function graphqlMutation(schema: DocumentNode, name: string) {
  const [mutateFunction, mutate] = useMutation(schema);

  React.useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      if (mutate.data) {
        console.log(`${name} debug`);
        console.log({ ...mutate, token: authTokenGet() });
      } else if (mutate.error) {
        console.log(`${name} error`);
        console.log({ ...mutate, token: authTokenGet() });
      }
    }
  }, [mutate.data, mutate.error]);

  return [mutateFunction, mutate as any];
}
