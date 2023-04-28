import { DocumentNode, useQuery } from "@apollo/client";
import React from "react";
import { authTokenGet } from "../../service/authService";

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
