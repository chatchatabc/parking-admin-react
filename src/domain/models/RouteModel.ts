export type Route = {
  routeUuid?: string | null;
  name?: string | null;
  description?: string | null;
  points?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  status?: number | null;
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
