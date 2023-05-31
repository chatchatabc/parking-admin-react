import { axiosGet, axiosPost, axiosPut } from "../axios/axiosActions";

export async function restGet(url: string, params?: Record<string, any>) {
  const response = await axiosGet(url, params);

  return response;
}

export async function restPost(url: string, values: Record<string, any>) {
  const response = await axiosPost(url, values);

  return response;
}

export async function restPut(url: string, values: Record<string, any>) {
  const response = await axiosPut(url, values);

  return response;
}
