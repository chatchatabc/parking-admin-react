import axios, { AxiosRequestConfig } from "axios";
import { authTokenGet } from "../../service/authService";

const baseURL = "http://192.168.1.11:5180/api";

function axiosHandleError(e: any): Record<string, any> {
  if (!e.response) {
    return {
      data: {
        error: true,
        message: "No response from server",
      },
    };
  }

  const error = e.response?.data?.error;
  const message = e.response?.data?.message;

  if (error && message) {
    return e.response;
  } else if (error) {
    e.response.data.message = "No error message receive";
  } else {
    e.response.data = {
      error: true,
      message: "Cannot determine if error or not",
    };
  }

  return e.response;
}

function axiosDebug(
  url: string,
  method: "GET" | "PUT" | "POST" | "DELETE",
  params: Record<string, any>,
  data: Record<string, any>,
  response: Record<string, any>
) {
  console.log("Axios Debug", {
    url,
    method,
    params,
    data,
    response,
  });
}

function axiosConfig() {
  const token = authTokenGet();

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}

export async function axiosGet(url: string, params?: Record<string, any>) {
  let response;

  const config = axiosConfig();
  config.params = params;

  try {
    response = await axios.get(`${baseURL}${url}`, config);
  } catch (e: any) {
    response = axiosHandleError(e);
  }

  axiosDebug(url, "GET", params ?? {}, {}, response);

  return response;
}

export async function axiosPost(url: string, data: Record<string, any>) {
  let response;

  const config = axiosConfig();

  try {
    response = await axios.post(`${baseURL}${url}`, data, config);
  } catch (e: any) {
    response = axiosHandleError(e);
  }

  axiosDebug(url, "POST", {}, data, response);

  return response;
}

export async function axiosPut(url: string, data: Record<string, any>) {
  let response;

  const config = axiosConfig();

  try {
    response = await axios.put(`${baseURL}${url}`, data, config);
  } catch (e: any) {
    response = axiosHandleError(e);
  }

  axiosDebug(url, "PUT", {}, data, response);

  return response;
}

export async function axiosDelete(url: string, data: Record<string, any>) {
  let response;

  const config = axiosConfig();

  try {
    response = await axios.delete(`${baseURL}${url}`, config);
  } catch (e: any) {
    response = axiosHandleError(e);
  }

  axiosDebug(url, "DELETE", {}, data, response);

  return response;
}
