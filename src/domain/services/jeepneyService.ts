import { jeepneyGetAllDoc } from "../gql-docs/jeepneyDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost } from "../infra/apis/restActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { Jeepney } from "../models/JeepneyModel";

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

export async function jeepneyCreate(params: Record<string, any>) {
  params = {
    name: params.name,
    plateNumber: params.plateNumber,
    capacity: params.capacity,
    latitude: params.latitude,
    longitude: params.longitude,
    status: params.status,
    flag: 0,
  };

  const response = await restPost("/jeepney", params, "JeepneyCreate");

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData<Jeepney>;
}
