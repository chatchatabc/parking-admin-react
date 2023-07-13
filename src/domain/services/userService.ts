import {
  userGetAllDoc,
  userGetAllLoginByUserDoc,
  userGetAllLogoutByUserDoc,
  userGetBanHistoryByUserDoc,
  userGetByParkingLotDoc,
  userGetByVehicleDoc,
  userRolesGetDoc,
} from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import {
  restGet,
  restPost,
  restPostFormData,
  restPut,
} from "../infra/apis/restActions";
import {
  AxiosResponse,
  AxiosResponseData,
  AxiosResponseError,
} from "../models/AxiosModel";
import {
  CommonContent,
  CommonPagination,
  CommonVariables,
} from "../models/CommonModel";
import {
  User,
  UserBan,
  UserLogin,
  UserLogout,
  UserRole,
} from "../models/UserModel";

export async function userGet(variables: { id: string }) {
  const response: AxiosResponse<User> = await restGet(
    `/user/${variables.id}`,
    {},
    "UserGet"
  );

  return response.data;
}

export async function userGetAll(variables: CommonVariables) {
  const response: AxiosResponse<CommonPagination<User>> = await restGet(
    "/user",
    variables,
    "UserGetAll"
  );

  return response.data;
}

export async function userUpdateProfile(values: Record<string, any>) {
  const response = await restPut(`/user/update/${values.userId}`, values);

  return response.data;
}

export async function userOptionsUuid() {
  const response = await graphqlQuery(userGetAllDoc(), {
    page: 0,
    size: 10000,
  });

  if (response.data.errors) {
    return response.data;
  }

  const responseData = response.data.data.getUsers.content as User[];

  const data = responseData.map((user) => ({
    label: user.username ?? user.phone ?? user.email ?? "",
    value: user.userUuid ?? "",
  }));

  return { data } as AxiosResponseData<typeof data>;
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

export async function userGetByParkingLot(variables: { id: string }) {
  const response = await graphqlQuery(
    userGetByParkingLotDoc(),
    variables,
    "UserGetByParkingLot"
  );

  if (response.data.errors) {
    return response.data;
  }

  const data = response.data.data.getUserByParkingLot;

  return { data } as AxiosResponseData<User>;
}

export async function userGetAllLogoutByUser(
  params: CommonVariables & { id: string }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<CommonPagination<UserLogout>> = await restGet(
    `/log/user-logout/${id}`,
    values,
    "UserGetAllLogoutByUser"
  );

  return response.data;
}

export async function userGetAllLoginByUser(
  params: CommonVariables & { id: string }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<CommonPagination<UserLogin>> = await restGet(
    `/log/user-login/${id}`,
    values,
    "UserGetAllLoginByUser"
  );

  return response.data;
}

export async function userUpdateAvatar(values: Record<string, any>) {
  const { userUuid, file } = values;

  const response = await restPostFormData(
    `/user/upload-avatar/${userUuid}`,
    { file },
    "UserUpdateAvatar"
  );

  return response.data;
}

export async function userGetByVehicle(variables: { id: string }) {
  const response = await graphqlQuery(
    userGetByVehicleDoc(),
    variables,
    "UserGetByVehicle"
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  const data = response.data.data.getUserByVehicle;

  return { data } as AxiosResponseData<User>;
}

export async function userGetBanHistoryByUser(
  params: CommonVariables & { id: string }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<CommonPagination<UserBan>> = await restGet(
    `/log/user-ban-history/${id}`,
    values,
    "UserGetBanHistoryByUser"
  );

  return response.data;
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
