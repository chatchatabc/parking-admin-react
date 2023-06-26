import {
  routeGetAllDoc,
  routeGetDoc,
  routeGetNodesAndEdgesDoc,
  routeGetNodesDoc,
} from "../gql-docs/routeDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { mapboxGet, mapboxGetPublicToken } from "../infra/apis/mapboxActions";
import { restDelete, restPost, restPut } from "../infra/apis/restActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import {
  Route,
  RouteEdge,
  RouteEdgeCreate,
  RouteNode,
  RouteNodeCreate,
} from "../models/RouteModel";

export async function routeCreateWithNodes(params: Record<string, any>) {
  const { nodes, name, description, slug, status } = params;
  const responseRoute = await routeCreate({ name, description, slug, status });

  if (responseRoute.errors) {
    return responseRoute as AxiosResponseError;
  }

  const routeId = responseRoute.data.id ?? 0;
  const edges = routeCreateEdgesFromNodes({ nodes }).map((edge) => {
    return {
      ...edge,
      routeId,
    } as RouteEdgeCreate;
  });
  const responseEdges = await routeCreateEdgeMany({ edges });

  if (responseEdges.errors) {
    return responseEdges as AxiosResponseError;
  }

  return responseRoute as AxiosResponseData<Route>;
}

export async function routeUpdateWithNodes(params: Record<string, any>) {
  const { nodes, name, description, slug, status, routeId, routeUuid } = params;
  const responseRoute = await routeUpdate({
    routeUuid,
    name,
    description,
    slug,
    status,
  });
  const edges = params.edges.map((edge: RouteEdge) => {
    return {
      ...edge,
      nodeFrom: edge.nodeFrom,
    };
  });

  if (responseRoute.errors) {
    return responseRoute as AxiosResponseError;
  }

  const responseEdges = await routeUpdateEdgeMany({ nodes, routeId, edges });

  if (responseEdges.errors) {
    return responseEdges as AxiosResponseError;
  }

  return responseRoute as AxiosResponseData<Route>;
}

export async function routeUpdate(params: {
  routeUuid: number;
  name: string;
  description: string;
  slug: string;
  status: number;
}) {
  const { routeUuid, ...rest } = params;

  const response = await restPut(`/route/${routeUuid}`, rest, "RouteUpdate");

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData<Route>;
}

export async function routeCreate(params: {
  name: string;
  description: string;
  slug: string;
  status: number;
}) {
  const response = await restPost("/route", params, "RouteCreate");

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData<Route>;
}

export async function routeUpdateEdgeMany(params: {
  nodes: RouteNode[];
  edges: RouteEdge[];
  routeId: number;
}) {
  const { nodes, routeId, edges } = params;

  // Create edges from new nodes
  const newEdges = routeCreateEdgesFromNodes({ nodes });

  // If new edges are more than current edges, update current edges and create new edges
  if (newEdges.length > edges.length) {
    const updateEdges = newEdges.splice(0, edges.length).map((edge, index) => {
      return {
        ...edge,
        id: edges[index].id,
        routeId,
      } as RouteEdgeCreate & { id: number };
    });

    const responseUpdate = await restPut(
      "/route-edge/many",
      {
        edges: updateEdges,
      },
      "RouteUpdateEdgeMany"
    );

    if (responseUpdate.data.errors) {
      return responseUpdate.data as AxiosResponseError;
    }

    const createEdges = newEdges.map((edge) => {
      return {
        ...edge,
        routeId,
      } as RouteEdgeCreate;
    });

    const responseCreate = await routeCreateEdgeMany({ edges: createEdges });

    if (responseCreate.errors) {
      return responseCreate as AxiosResponseError;
    }

    return responseUpdate.data as AxiosResponseData;
  } else if (newEdges.length < edges.length) {
    // If new edges are less than current edges, update current edges and delete the rest
    const updateEdges = newEdges.map((edge, index) => {
      return {
        ...edge,
        id: edges[index].id,
        routeId,
      } as RouteEdgeCreate & { id: number };
    });

    const responseUpdate = await restPut(
      "/route-edge/many",
      {
        edges: updateEdges,
      },
      "RouteUpdateEdgeMany"
    );

    if (responseUpdate.data.errors) {
      return responseUpdate.data as AxiosResponseError;
    }

    const deleteEdges = edges
      .splice(newEdges.length, edges.length)
      .map((edge) => {
        return edge.id;
      });

    const ids = deleteEdges.filter((edge) => edge !== undefined) as number[];
    const responseDelete = await routeDeleteEdgeMany({
      ids,
    });

    if (responseDelete.errors) {
      return responseDelete as AxiosResponseError;
    }

    return responseUpdate.data as AxiosResponseData;
  }

  const response = await restPut(
    "/route-edge/many",
    {
      edges,
    },
    "RouteUpdateEdgeMany"
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData;
}

export async function routeDeleteEdgeMany(params: { ids: number[] }) {
  const response = await restDelete(
    "/route-edge/many",
    params,
    "RouteDeleteEdgeMany"
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData;
}

export async function routeCreateEdgeMany(params: {
  edges: RouteEdgeCreate[];
}) {
  const response = await restPost(
    "/route-edge/many",
    params,
    "RouteCreateEdgeMany"
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData;
}

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

export function routeGetStatusOptions() {
  return [
    {
      value: -1,
      label: "Inactive",
    },
    {
      value: 1,
      label: "Active",
    },
    {
      value: 0,
      label: "Draft",
    },
  ];
}

export function routeGetSortedEdgeMany(edges: RouteEdge[]) {
  const firstEdge =
    edges.find(
      (edge) => !edges.some((edge1) => edge1.nodeTo === edge.nodeFrom)
    ) ?? edges[0];
  let toEdge = firstEdge?.nodeTo ?? 0;

  const sortedEdges = [firstEdge];

  while (sortedEdges.length < edges.length) {
    const nextEdge = edges.find((edge) => edge.nodeFrom === toEdge);
    if (nextEdge) {
      sortedEdges.push(nextEdge);
      toEdge = nextEdge.nodeTo ?? 0;
    }
  }

  return sortedEdges;
}

export function routeGetNodesFromEdges(params: {
  edges: RouteEdge[];
  nodes: RouteNode[];
}) {
  const { edges, nodes } = params;
  const sortedEdges = routeGetSortedEdgeMany(edges);

  let sortedNodes = sortedEdges.map((edge) => {
    const node = nodes.find((node) => node.id === edge.nodeFrom);
    return node;
  });
  sortedNodes.push(
    nodes.find((node) => node.id === sortedEdges[sortedEdges.length - 1].nodeTo)
  );

  sortedNodes = sortedNodes.filter((node) => {
    return node !== undefined;
  });

  return sortedNodes as RouteNode[];
}

export function routeCreateEdgesFromNodes(params: { nodes: RouteNode[] }) {
  const { nodes } = params;

  const edges = nodes.map((node, index) => {
    if (index === nodes.length - 1) {
      return null;
    }

    return {
      nodeFrom: node.id,
      nodeTo: nodes[index + 1].id,
    };
  });

  return edges.filter((edge) => edge !== null) as {
    nodeFrom: number;
    nodeTo: number;
  }[];
}
