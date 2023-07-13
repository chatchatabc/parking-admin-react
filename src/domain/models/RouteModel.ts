export type Route = {
  routeUuid: string;
  slug: string;
  name: string;
  description: string;
  points: string;
  createdAt: string;
  updatedAt: string;
  color: string;

  id: number;
  status: number;

  nodes?: RouteNode[];
  edges?: RouteEdge[];
};

export type RouteEdgeCreate = {
  routeId: number;
  nodeFrom: number;
  nodeTo: number;
};

export type RouteEdge = {
  id: number;
  routeId: number;
  nodeFrom: number;
  nodeTo: number;
  distance: number;
  createdAt: string;
};

export type RouteNodeCreate = {
  longitude: number;
  latitude: number;
  poi: string;
};

export type RouteNode = {
  id: number;
  createdAt: string;
} & RouteNodeCreate;
