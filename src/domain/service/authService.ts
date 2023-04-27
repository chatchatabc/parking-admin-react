import { axiosPost } from "../infra/axios/axiosService";

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

function authTokenRemove() {
  document.cookie = `token=; path=/; max-age=0`;
}

export async function authLogin(values: Record<string, any>) {
  const response = await axiosPost("/auth/login", values);

  if (response.data.error) {
    authTokenRemove();
    return response.data;
  }

  const token = response.headers["x-access-token"];

  authTokenSave(token);

  return response.data;
}

export async function authLogout() {
  const response = await axiosPost("/profile/logout", {});

  if (response.data.error) {
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
