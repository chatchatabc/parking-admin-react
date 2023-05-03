import {
  userGetByPhoneDoc,
  userGetByUsernameDoc,
  userGetListDoc,
} from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apollo-client/apolloActions";
import { axiosPost, axiosPut } from "../infra/axios/axiosService";

export function userGet(page: number = 0, size: number = 10) {
  const query = graphqlQuery(userGetListDoc(), "User Get List", {
    variables: { page, size },
    fetchPolicy: "network-only",
  });

  const processedData = query.data?.getUsers;

  return { ...query, data: processedData };
}

export function userGetProfile(params: Record<string, string | undefined>) {
  const { username, phone } = params;

  let query, processedData;
  if (username) {
    query = graphqlQuery(
      userGetByUsernameDoc(),
      "User get profile by username",
      {
        variables: { username },
        fetchPolicy: "network-only",
      }
    );
    processedData = query.data?.getUserByUsername;
  } else if (phone) {
    query = graphqlQuery(userGetByPhoneDoc(), "User get profile by phone", {
      variables: { phone },
      fetchPolicy: "network-only",
    });
    processedData = query.data?.getUserByPhone;
  } else {
    query = {
      error: true,
    };
  }

  return { ...query, data: processedData };
}

export async function userCreateProfile(values: Record<string, any>) {
  const response = await axiosPost("/user/create", values);

  return response.data;
}

export async function userUpdateProfile(values: Record<string, any>) {
  const response = await axiosPut(`/user/update/${values.userId}`, values);

  return response.data;
}
