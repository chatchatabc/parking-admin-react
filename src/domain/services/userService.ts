import {
  userAllGetDoc,
  userGetByPhoneDoc,
  userGetByUsernameDoc,
  userRolesGetDoc,
} from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost, restPut } from "../infra/apis/restAction";
import { axiosPut } from "../infra/axios/axiosActions";
import { AxiosResponseData } from "../models/AxiosModel";
import { Pagination } from "../models/CommonModel";
import { User, UserRole } from "../models/UserModel";
import { authUsername } from "./authService";

export async function userGetProfile({
  username = authUsername(),
  phone,
}: User) {
  let query, data;

  if (username) {
    query = await graphqlQuery(userGetByUsernameDoc(), { username });

    if (query.data.errors) {
      return query.data;
    }

    data = query.data.data.getUserByUsername;
  } else if (phone) {
    query = await graphqlQuery(userGetByPhoneDoc(), { phone });

    if (query.data.errors) {
      return query.data;
    }

    data = query.data.data.getUserByPhone;
  }

  return { data } as AxiosResponseData & { data: User };
}

export async function userUpdateProfile(values: Record<string, any>) {
  const response = await axiosPut(`/user/update/${values.userId}`, values);

  return response.data;
}

export async function userAllGet(variables: Record<string, any>) {
  const response = await graphqlQuery(userAllGetDoc(), variables);

  if (response.data.errors) {
    return response.data;
  }

  return response.data.data.getUsers as AxiosResponseData & {
    content: User[];
    pageInfo: Pagination;
  };
}

export async function userRolesGet() {
  const response = await graphqlQuery(userRolesGetDoc(), {});

  if (response.data.errors) {
    return response.data;
  }

  const responseData = response.data.data.getRoles.content as UserRole[];

  const data = responseData.map((role) => ({
    label: role.name,
    value: role.name,
  }));

  return { data } as AxiosResponseData;
}

export async function userCreate(values: Record<string, any>) {
  const response = await restPost("/user/create", values);

  return response.data;
}

export async function userUpdate(values: Record<string, any>) {
  const response = await restPut(`/user/update/${values.userUuid}`, values);

  return response.data;
}
