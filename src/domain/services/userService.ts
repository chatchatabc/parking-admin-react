import {
  userGetAllDoc,
  userGetByPhoneDoc,
  userGetByUsernameDoc,
} from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { axiosPut } from "../infra/axios/axiosActions";
import { AxiosResponseData } from "../models/AxiosModel";
import { Pagination } from "../models/CommonModel";
import { User } from "../models/UserModel";

export async function userGetProfile(
  params: Record<string, string | undefined>
) {
  const { username, phone } = params;

  let query;

  if (username) {
    query = await graphqlQuery(userGetByUsernameDoc(), { username });
  } else if (phone) {
    query = await graphqlQuery(userGetByPhoneDoc(), { phone });
  }

  return query;
}

export async function userUpdateProfile(values: Record<string, any>) {
  const response = await axiosPut(`/user/update/${values.userId}`, values);

  return response.data;
}

export async function userGetAll(variables: Record<string, any>) {
  const response = await graphqlQuery(userGetAllDoc(), variables);

  if (response.data.errors) {
    return response.data;
  }

  return response.data.data.getUsers as AxiosResponseData & {
    content: User[];
    pageInfo: Pagination;
  };
}
