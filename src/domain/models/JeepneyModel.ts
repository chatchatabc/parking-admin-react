import { Route } from "./RouteModel";

export type Jeepney = {
  jeepneyUuid?: string | null;
  name?: string | null;
  plateNumber?: string | null;
  capacity?: number | null;
  createdAt?: string | null;
  status?: number;
  routeUuid?: string | null;

  route?: Route | null;
};

export type JeepneyPosition = {
  jeepneyUuid?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  direction?: number | null;
};
