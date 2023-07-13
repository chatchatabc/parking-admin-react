import { restPost } from "../infra/apis/restActions";
import { AuthLogin, AuthLogout } from "../models/AuthModel";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { User } from "../models/UserModel";

export function authTokenGet() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return token;
}

function authTokenSave(token: string) {
  document.cookie = `token=${token}; path=/; max-age=3600`;
}

export function authTokenRemove() {
  document.cookie = `token=; path=/; max-age=0`;
}

export async function authLogin(values: Record<string, any>) {
  const response = await restPost("/auth/login", values);

  if (response.data.errors) {
    authTokenRemove();
    return response.data as AxiosResponseError;
  }

  sessionStorage.setItem("user", JSON.stringify(response.data.data));

  const token = response.headers["x-access-token"];

  authTokenSave(token);

  return response.data as AxiosResponseData<AuthLogin>;
}

export async function authLogout() {
  const response = await restPost("/profile/logout", {});

  authTokenRemove();

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData<AuthLogout>;
}

export function authCheckSession() {
  const cookie = document.cookie;

  const token = cookie.split("; ").find((row) => row.startsWith("token="));

  if (token) {
    return true;
  }

  return false;
}

export function authUser() {
  const userLocal = sessionStorage.getItem("user");

  if (!userLocal) {
    return null;
  }

  try {
    const userParsed = JSON.parse(userLocal) as User;
    return userParsed;
  } catch (error) {
    return null;
  }
}

export function authUsername() {
  const userLocal = authUser();
  if (!userLocal) {
    return null;
  }
  return userLocal.username;
}

export function authUserUuid() {
  const userLocal = authUser();
  if (!userLocal) {
    return null;
  }

  return userLocal.userUuid;
}
