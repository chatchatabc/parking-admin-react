import { axiosGet, axiosPost, axiosPut } from "../infra/axios/axiosService";

export async function userGet() {
  const response = await axiosGet("/user/get");

  return response.data;
}

export async function userCreateProfile(values: Record<string, any>) {
  const response = await axiosPost("/user/create", values);

  return response.data;
}

export async function userUpdateProfile(values: Record<string, any>) {
  const response = await axiosPut(`/user/update/${values.id}`, values);

  return response.data;
}
