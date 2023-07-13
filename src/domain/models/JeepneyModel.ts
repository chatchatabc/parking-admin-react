import { Route } from "./RouteModel";

export type Jeepney = {
  jeepneyUuid: string;
  name: string;
  plateNumber: string;
  capacity: number;
  createdAt: string;
  status: number;
  routeUuid: string;

  route?: Route;
  position?: JeepneyPosition;
};

export type JeepneyPosition = {
  jeepneyUuid: string;
  latitude: number;
  longitude: number;
  direction: number;
};
