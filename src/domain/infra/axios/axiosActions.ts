import axios, { AxiosRequestConfig } from "axios";
import { authTokenGet } from "../../services/authService";
import { AxiosErrorsItem, AxiosResponse } from "../../models/AxiosModel";

function axiosHandleError(e: any): AxiosResponse {
  if (!e.response) {
    return {
      data: {
        errors: [
          {
            title: "NO_SERVER_RESPONSE_ERROR",
            message: "NO_SERVER_RESPONSE_ERROR",
          },
        ],
      },
    };
  }

  const errors = e.response?.data?.errors as AxiosErrorsItem[];

  if (errors) {
    if (errors.length) {
      return e.response;
    }

    e.response.data = {
      errors: [
        {
          title: "EMPTY_LIST",
          message: "EMPTY_LIST",
        },
      ],
    };
    return e.response;
  } else {
    e.response.data = {
      errors: [
        {
          title: "NULL_OR_UNDEFINED_ERR",
          message: "NULL_OR_UNDEFINED_ERR",
        },
      ],
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
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    console.log("Axios Debug", {
      url,
      method,
      params,
      data,
      response,
    });
  }
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

export async function axiosGet(
  url: string,
  params?: Record<string, any>
): Promise<AxiosResponse> {
  let response;

  const config = axiosConfig();
  config.params = params;

  try {
    response = await axios.get(`${url}`, config);
  } catch (e: any) {
    response = axiosHandleError(e);
  }

  axiosDebug(url, "GET", params ?? {}, {}, response);

  return response;
}

export async function axiosPost(
  url: string,
  data: Record<string, any>
): Promise<AxiosResponse> {
  let response;

  const config = axiosConfig();

  try {
    response = await axios.post(`${url}`, data, config);
  } catch (e: any) {
    response = axiosHandleError(e);
  }

  axiosDebug(url, "POST", {}, data, response);

  return response;
}

export async function axiosPut(
  url: string,
  data: Record<string, any>
): Promise<AxiosResponse> {
  let response;

  const config = axiosConfig();

  try {
    response = await axios.put(`${url}`, data, config);
  } catch (e: any) {
    response = axiosHandleError(e);
  }

  axiosDebug(url, "PUT", {}, data, response);

  return response;
}

export async function axiosDelete(
  url: string,
  data: Record<string, any>
): Promise<AxiosResponse> {
  let response;

  const config = axiosConfig();

  try {
    response = await axios.delete(`${url}`, config);
  } catch (e: any) {
    response = axiosHandleError(e);
  }

  axiosDebug(url, "DELETE", {}, data, response);

  return response;
}
