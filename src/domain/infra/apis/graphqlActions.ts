import { axiosPost } from "../axios/axiosActions";

export async function graphqlQuery(
  query: string,
  variables: Record<string, any>
) {
  const response = await axiosPost("/graphql", { query, variables });

  console.log(response);

  return response;
}

export async function graphqlMutation(
  mutation: string,
  variables: Record<string, any>
) {
  const response = await axiosPost("/graphql", { mutation, variables });

  console.log(response);

  return response;
}
