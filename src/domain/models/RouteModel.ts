export type Route = {
  routeUuid?: string;
  slug?: string | null;
  name?: string | null;
  description?: string | null;
  points?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  color?: string | null;

  id?: number;
  status?: number | null;

  nodes?: RouteNode[];
  edges?: RouteEdge[];
};

export type RouteEdgeCreate = {
  routeId: number;
  nodeFrom: number;
  nodeTo: number;
};

export type RouteEdge = {
  id?: number;
  routeId?: number;
  nodeFrom?: number;
  nodeTo?: number;
  distance?: number;
  createdAt?: string;
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
