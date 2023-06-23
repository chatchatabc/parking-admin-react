export type Route = {
  routeUuid?: string | null;
  name?: string | null;
  description?: string | null;
  points?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  status?: number | null;
};

export type RouteNode = {
  longitude: number;
  latitude: number;
  poi: string;
};
