import { axiosGet, axiosPost, axiosPut } from "../axios/axiosActions";

const baseUrl = "/api";

export async function restGet(url: string, params?: Record<string, any>) {
  const response = await axiosGet(baseUrl + url, params);

  return response;
}

export async function restPost(url: string, values: Record<string, any>) {
  const response = await axiosPost(baseUrl + url, values);

  return response;
}

export async function restPut(url: string, values: Record<string, any>) {
  const response = await axiosPut(baseUrl + url, values);

  return response;
}
