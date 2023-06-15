import { AxiosRequestConfig } from "axios";
import { authTokenGet } from "../../services/authService";
import { axiosPost } from "../axios/axiosActions";

function graphqlConfig() {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = authTokenGet();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
}

export async function graphqlQuery(
  query: string,
  variables: Record<string, any>,
  title: string = "GraphQL Query"
) {
  const config = graphqlConfig();

  const response = await axiosPost(
    "/graphql",
    { query, variables },
    config,
    title
  );

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
  const config = graphqlConfig();

  const response = await axiosPost(
    "/graphql",
    { mutation, variables },
    config,
    title
  );

  if (response.data.errors && response.data.errors.length > 0) {
    return response;
  }
  response.data.errors = null;

  return response;
}
