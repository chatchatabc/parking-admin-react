import { authTokenGet } from "../../services/authService";
import { axiosGet, axiosPost, axiosPut } from "../axios/axiosActions";
import { AxiosRequestConfig } from "axios";

const baseUrl = "/api";

function restConfig(): AxiosRequestConfig {
  const token = authTokenGet();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}

export async function restGet(
  url: string,
  params: Record<string, any> = {},
  title: string = "REST GET"
) {
  const config = restConfig();
  config.params = params;

  const response = await axiosGet(baseUrl + url, config, title);

  if (response.data.errors && response.data.errors.length > 0) {
    return response;
  }
  response.data.errors = null;

  return response;
}

export async function restPost(
  url: string,
  values: Record<string, any>,
  title: string = "REST POST"
) {
  const config = restConfig();

  const response = await axiosPost(baseUrl + url, values, config, title);

  if (response.data.errors && response.data.errors.length > 0) {
    return response;
  }
  response.data.errors = null;

  return response;
}

export async function restPut(
  url: string,
  values: Record<string, any>,
  title: string = "REST PUT"
) {
  const config = restConfig();

  const response = await axiosPut(baseUrl + url, values, config, title);

  if (response.data.errors && response.data.errors.length > 0) {
    return response;
  }
  response.data.errors = null;

  return response;
}
