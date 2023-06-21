import { routeGetDoc } from "../gql-docs/routeDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonVariables } from "../models/CommonModel";
import { Route } from "../models/RouteModel";

// export async function routeCreate(params: {
//   name: string;
//   description: string;
//   status: 0;
// }) {
//   const response = await restPost("/route/create", params, "RouteCreate");

//   return response.data as AxiosResponseData;
// }

export async function routeGet(
  variables: CommonVariables & {
    keyword: string;
  }
) {
  const query = await graphqlQuery(routeGetDoc(), variables, "RouteGet");

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getRoute;
  return { data } as AxiosResponseData<Route>;
}

// 8080;
// 6080;
