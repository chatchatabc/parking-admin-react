import { jeepneyGetAllByRouteDoc } from "../gql-docs/jeepneyDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restGet, restPost } from "../infra/apis/restActions";
import {
  AxiosResponse,
  AxiosResponseData,
  AxiosResponseError,
} from "../models/AxiosModel";
import {
  CommonContent,
  CommonPagination,
  CommonVariables,
} from "../models/CommonModel";
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

export async function jeepneyGetAllByRouteWithRoute(
  variables: CommonVariables & { id: string }
) {
  const query = await jeepneyGetAllByRoute(variables);

  if (query.errors) {
    return query as AxiosResponseError;
  }

  const dataWithRoutes = query.data.content.map(async (jeepney: Jeepney) => {
    const route = await routeGet({ id: jeepney.routeUuid ?? "" });

    if (route.errors) {
      return jeepney;
    }
    jeepney.route = route.data;

    return jeepney;
  });

  const content = await Promise.all(dataWithRoutes);

  return { data: { ...query.data, content } } as AxiosResponseData<
    CommonContent<Jeepney>
  >;
}

export async function jeepneyGetAllByRoute(
  variables: CommonVariables & { id: string }
) {
  const query = await graphqlQuery(
    jeepneyGetAllByRouteDoc(),
    variables,
    "JeepneyGetAllByRoute"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getJeepneysByRoute;

  return { data } as AxiosResponseData<CommonContent<Jeepney>>;
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
