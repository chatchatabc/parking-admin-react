import { jeepneyGetAllDoc } from "../gql-docs/jeepneyDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost } from "../infra/apis/restActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { Jeepney } from "../models/JeepneyModel";
import { routeGet } from "./routeService";

export async function jeepneyGetAll(variables: CommonVariables) {
  const response = await graphqlQuery(
    jeepneyGetAllDoc(),
    variables,
    "JeepneyGetAll"
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  const data = response.data.data.getJeepneys;

  return { data } as AxiosResponseData<CommonContent<Jeepney>>;
}

export async function jeepneyGetAllWithRoute(variables: CommonVariables) {
  const query = await jeepneyGetAll(variables);

  if (query.errors) {
    return query as AxiosResponseError;
  }

  const dataWithRoutes = query.data.content.map(async (jeepney: Jeepney) => {
    console.log(jeepney.routeUuid);
    const route = await routeGet({ keyword: jeepney.routeUuid ?? "" });

    if (route.errors) {
      return jeepney;
    }
    jeepney.route = route.data;

    return jeepney;
  });

  const content = await Promise.all(dataWithRoutes);

  return { data: { content } } as AxiosResponseData<CommonContent<Jeepney>>;
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
  };

  const response = await restPost("/jeepney", params, "JeepneyCreate");

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData<Jeepney>;
}
