import { axiosGet } from "../infra/axios/axiosService";

export async function userGet() {
  const response = await axiosGet("/user/get");

  return response.data;
}
