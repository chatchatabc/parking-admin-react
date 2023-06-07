import {
  userGetAllDoc,
  userGetBanHistoryByPhoneDoc,
  userGetBanHistoryByUsernameDoc,
  userGetBanHistoryDoc,
  userGetByParkingLotUuidDoc,
  userGetByPhoneDoc,
  userGetByUsernameDoc,
  userRolesGetDoc,
} from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost, restPut } from "../infra/apis/restAction";
import { axiosPut } from "../infra/axios/axiosActions";
import { AxiosResponseData } from "../models/AxiosModel";
import { CommonPageInfo, CommonVariables } from "../models/CommonModel";
import { User, UserBan, UserRole } from "../models/UserModel";
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

export async function userGetAll(variables: CommonVariables) {
  const response = await graphqlQuery(userGetAllDoc(), variables);

  if (response.data.errors) {
    return response.data;
  }

  const data = response.data.data.getUsers;

  return { data } as AxiosResponseData & {
    data: {
      content: User[];
      pageInfo: CommonPageInfo;
    };
  };
}

export async function userAllOptionsGet(variables: { keyword: string }) {
  const response = await graphqlQuery(userGetAllDoc(), variables);

  if (response.data.errors) {
    return response.data;
  }

  const responseData = response.data.data.getUsers.content as User[];

  const data = responseData.map((user) => ({
    label: user.username ?? user.phone ?? user.email,
    value: user.userUuid,
  }));

  return { data } as AxiosResponseData;
}

export async function userRoleOptionsGet() {
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

export async function userGetByParkingLotUuid(parkingLotUuid: string) {
  const response = await graphqlQuery(userGetByParkingLotUuidDoc(), {
    parkingLotUuid,
  });

  if (response.data.errors) {
    return response.data;
  }

  const data = response.data.data.getUserByParkingLotUuid;

  return { data: data } as AxiosResponseData & { data: User };
}

export async function userGetBanHistory(variables: CommonVariables) {
  let response, data;

  if (variables.username) {
    response = await graphqlQuery(userGetBanHistoryByUsernameDoc(), variables);
    if (response.data.errors) {
      return response.data;
    }
    data = response.data.data.getBanHistoryLogsByUsername;
  } else if (variables.phone) {
    response = await graphqlQuery(userGetBanHistoryByPhoneDoc(), variables);
    if (response.data.errors) {
      return response.data;
    }
    data = response.data.data.getBanHistoryLogsByPhone;
  } else {
    return {
      errors: [
        {
          message: "Username or phone is required",
          title: "Error",
        },
      ],
    };
  }

  return { data } as AxiosResponseData & {
    data: {
      content: UserBan[];
      pageInfo: CommonPageInfo;
    };
  };
}
