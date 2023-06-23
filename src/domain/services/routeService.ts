import {
  routeGetAllDoc,
  routeGetDoc,
  routeGetNodesAndEdgesDoc,
  routeGetNodesDoc,
} from "../gql-docs/routeDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { mapboxGet, mapboxGetPublicToken } from "../infra/apis/mapboxActions";
import { restPost, restPut } from "../infra/apis/restActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import {
  Route,
  RouteEdge,
  RouteNode,
  RouteNodeCreate,
} from "../models/RouteModel";

// export async function routeCreate(params: {
//   name: string;
//   slug: string;
//   description: string;
//   status: 0;
// }) {
//   const response = await restPost("/route/create", params, "RouteCreate");

//   return response.data as AxiosResponseData;
// }

export async function routeGetAll(variables: CommonVariables) {
  const query = await graphqlQuery(routeGetAllDoc(), variables, "RouteGetAll");

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getRoutes;

  return { data } as AxiosResponseData<CommonContent<Route>>;
}

export async function routeGetAllOptions(variables: CommonVariables) {
  const response = await routeGetAll(variables);

  if (response.errors) {
    return response as AxiosResponseError;
  }

  const data = response.data.content.map((route: Route) => {
    return {
      value: route.routeUuid ?? "",
      label: route.name ?? "",
    };
  });

  return { data } as AxiosResponseData<
    {
      value: string;
      label: string;
    }[]
  >;
}

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

export async function routeGetMapMatch(coordinations: number[][]) {
  const formatCoordinations = coordinations.join(";");
  const radiuses = coordinations.map(() => 25).join(";");

  const response = await mapboxGet(
    `/driving/${formatCoordinations}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxGetPublicToken()}`
  );

  return response.data;
}

export async function routeGetNodes(variables: CommonVariables) {
  const query = await graphqlQuery(
    routeGetNodesDoc(),
    variables,
    "RouteGetNodes"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getRouteNodes;

  return { data } as AxiosResponseData<CommonContent<RouteNode>>;
}

export async function routeCreateNodeMany(nodes: RouteNodeCreate[]) {
  const data = {
    nodes,
  };

  const response = await restPost(
    "/route-node/many",
    data,
    "RouteCreateNodeMany"
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData;
}

export async function routeUpdateNodeMany(params: RouteNode[]) {
  const data = {
    nodes: params.map((node) => {
      return {
        id: node.id,
        latitude: node.latitude,
        longitude: node.longitude,
        poi: node.poi,
      };
    }),
  };

  const response = await restPut(
    "/route-node/many",
    data,
    "RouteUpdateNodeAll"
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData;
}

export async function routeGetNodesAndEdges(variables: { keyword: string }) {
  const query = await graphqlQuery(
    routeGetNodesAndEdgesDoc(),
    variables,
    "RouteGetNodesAndEdges"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getRouteNodesAndEdges;

  return { data } as AxiosResponseData<{
    nodes: RouteNode[];
    edges: RouteEdge[];
  }>;
}

export async function routeGetAllNodesAndEdges(variables: CommonVariables) {
  const routes = await routeGetAll(variables);

  if (routes.errors) {
    return routes as AxiosResponseError;
  }

  const moreInfoPromise = routes.data.content.map(async (route: Route) => {
    const nodesAndEdges = await routeGetNodesAndEdges({
      keyword: route.routeUuid ?? "",
    });

    if (nodesAndEdges.errors) {
      return nodesAndEdges as AxiosResponseError;
    }

    return {
      ...route,
      nodes: nodesAndEdges.data.nodes,
      edges: nodesAndEdges.data.edges,
    };
  });

  const moreInfo = await Promise.all(moreInfoPromise);

  return {
    data: {
      ...routes.data,
      content: moreInfo,
    },
  } as AxiosResponseData<CommonContent<Route>>;
}
