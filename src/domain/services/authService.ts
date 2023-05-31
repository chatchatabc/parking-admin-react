import { restPost } from "../infra/apis/restAction";
import { AuthLogin } from "../models/AuthModel";
import { AxiosResponseData } from "../models/AxiosModel";

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

export async function authLogin(
  values: Record<string, any>
): Promise<AuthLogin & AxiosResponseData> {
  const response = await restPost("/auth/login", values);

  if (response.data.errors) {
    authTokenRemove();
    return response.data;
  }

  localStorage.setItem("user", JSON.stringify(response.data.data));

  const token = response.headers["x-access-token"];

  authTokenSave(token);

  return response.data;
}

export async function authLogout(): Promise<AuthLogin & AxiosResponseData> {
  const response = await restPost("/profile/logout", {});

  if (response.data.errors) {
    return response.data;
  }

  authTokenRemove();
  return response.data;
}

export function authCheckSession() {
  const cookie = document.cookie;

  const token = cookie.split("; ").find((row) => row.startsWith("token="));

  if (token) {
    return true;
  }

  return false;
}

export function authUsername() {
  const userLocal = localStorage.getItem("user");

  if (!userLocal) {
    return null;
  }

  try {
    const userParsed = JSON.parse(userLocal) as Record<string, any>;
    return userParsed.username;
  } catch (error) {
    return null;
  }
}
