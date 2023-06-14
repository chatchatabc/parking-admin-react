import { axiosPost } from "../axios/axiosActions";

export async function graphqlQuery(
  query: string,
  variables: Record<string, any>
) {
  const response = await axiosPost("/graphql", { query, variables });

  if (response.data.errors && response.data.errors.length > 0) {
    return response;
  }
  response.data.errors = null;

  return response;
}

export async function graphqlMutation(
  mutation: string,
  variables: Record<string, any>
) {
  const response = await axiosPost("/graphql", { mutation, variables });

  if (response.data.errors && response.data.errors.length > 0) {
    return response;
  }
  response.data.errors = null;

  return response;
}
