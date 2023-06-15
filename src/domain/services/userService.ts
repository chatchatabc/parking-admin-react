import {
  userGetAllDoc,
  userGetBanHistoryByUserDoc,
  userGetByParkingLotDoc,
  userGetByParkingLotUuidDoc,
  userGetDoc,
  userRolesGetDoc,
} from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost, restPut } from "../infra/apis/restAction";
import { AxiosResponseData } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { User, UserBan, UserRole } from "../models/UserModel";

export async function userGet(variables: { keyword: string }) {
  const query = await graphqlQuery(userGetDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getUser;

  return { data } as AxiosResponseData<User>;
}

export async function userUpdateProfile(values: Record<string, any>) {
  const response = await restPut(`/user/update/${values.userId}`, values);

  return response.data;
}

export async function userGetAll(variables: CommonVariables) {
  const response = await graphqlQuery(userGetAllDoc(), variables);

  if (response.data.errors) {
    return response.data;
  }

  const data = response.data.data.getUsers;

  return { data } as AxiosResponseData<CommonContent<User>>;
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

  return { data } as AxiosResponseData<typeof data>;
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

  return { data } as AxiosResponseData<typeof data>;
}

export async function userCreate(values: Record<string, any>) {
  values = {
    email: values.email,
    phone: values.phone,
    username: values.username,
    roles: values.roles,
  };

  const response = await restPost("/user/create", values);

  return response.data;
}

export async function userUpdate(values: Record<string, any>) {
  const response = await restPut(`/user/update/${values.userUuid}`, values);

  return response.data;
}

export async function userGetByParkingLot(variables: { keyword: string }) {
  const response = await graphqlQuery(userGetByParkingLotDoc(), variables);

  if (response.data.errors) {
    return response.data;
  }

  const data = response.data.data.getUserByParkingLot;

  return { data } as AxiosResponseData<User>;
}

export async function userGetByParkingLotUuid(parkingLotUuid: string) {
  const response = await graphqlQuery(userGetByParkingLotUuidDoc(), {
    parkingLotUuid,
  });

  if (response.data.errors) {
    return response.data;
  }

  const data = response.data.data.getUserByParkingLotUuid;

  return { data } as AxiosResponseData<User>;
}

export async function userGetBanHistoryByUser(variables: CommonVariables) {
  const response = await graphqlQuery(userGetBanHistoryByUserDoc(), variables);
  if (response.data.errors) {
    return response.data;
  }
  const data = response.data.data.getBanHistoryLogsByUser;

  return { data } as AxiosResponseData<CommonContent<UserBan>>;
}

export async function userBanCreate(values: Record<string, any>) {
  let response;

  if (values.method === "BAN") {
    response = await restPost(`/user/ban/${values.userUuid}`, {
      reason: values.reason,
      until: values.until,
    });
  } else {
    response = await restPost(`/user/unban/${values.userUuid}`, {
      unbanReason: values.unbanReason,
    });
  }

  return response.data;
}

export function userGetFilters() {
  return [
    {
      label: "Username, ASC",
      value: "username,1",
    },
    {
      label: "Username, DESC",
      value: "username,0",
    },
    {
      label: "Phone Verified, ASC",
      value: "phoneVerifiedAt,1",
    },
    {
      label: "Phone Verified, DESC",
      value: "phoneVerifiedAt,0",
    },
    {
      label: "Email Verified, ASC",
      value: "emailVerifiedAt,1",
    },
    {
      label: "Email Verified, DESC",
      value: "emailVerifiedAt,0",
    },
  ];
}
