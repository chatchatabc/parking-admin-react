import { restGet, restPost } from "../infra/apis/restActions";
import {
  AxiosResponse,
  AxiosResponseData,
  AxiosResponseError,
} from "../models/AxiosModel";
import { CommonPagination, CommonVariables } from "../models/CommonModel";
import { Jeepney } from "../models/JeepneyModel";
import { routeGet } from "./routeService";

export async function jeepneyGetAllInfo(jeepney: Jeepney) {
  const route = await routeGet({ id: jeepney.routeUuid ?? "" });
  if (!route.errors) {
    jeepney.route = route.data;
  }

  return jeepney;
}

export async function jeepneyGetAll(params: CommonVariables) {
  const response: AxiosResponse<CommonPagination<Jeepney>> = await restGet(
    "/jeepney",
    params,
    "JeepneyGetAll"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (jeepney) => {
    return await jeepneyGetAllInfo(jeepney);
  });

  response.data.data.content = await Promise.all(contentPromise);

  return response.data;
}

export async function jeepneyGetAllByRoute(
  params: CommonVariables & { id: string }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<CommonPagination<Jeepney>> = await restGet(
    `/jeepney/route/${id}`,
    values,
    "JeepneyGetAllByRoute"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (jeepney) => {
    return await jeepneyGetAllInfo(jeepney);
  });

  response.data.data.content = await Promise.all(contentPromise);

  return response.data;
}

export async function jeepneyCreate(params: Record<string, any>) {
  params = {
    jeepneyUuid: params.jeepneyUuid,
    name: params.name,
    drivers: params.drivers,
    plateNumber: params.plateNumber,
    capacity: Number(params.capacity),
    latitude: Number(params.latitude),
    longitude: Number(params.longitude),
    status: params.status,
    flag: 0,
    routeUuid: params.routeUuid,
  };

  const response = await restPost("/jeepney", params, "JeepneyCreate");

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData<Jeepney>;
}
