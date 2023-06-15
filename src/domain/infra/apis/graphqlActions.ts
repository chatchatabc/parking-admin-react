import { axiosPost } from "../axios/axiosActions";

export async function graphqlQuery(
  query: string,
  variables: Record<string, any>,
  title: string = "GraphQL Query"
) {
  const response = await axiosPost("/graphql", { query, variables }, title);

  if (response.data.errors && response.data.errors.length > 0) {
    return response;
  }
  response.data.errors = null;

  return response;
}

export async function graphqlMutation(
  mutation: string,
  variables: Record<string, any>,
  title: string = "GraphQL Mutation"
) {
  const response = await axiosPost("/graphql", { mutation, variables }, title);

  if (response.data.errors && response.data.errors.length > 0) {
    return response;
  }
  response.data.errors = null;

  return response;
}
