import { Parking } from "./ParkingModel";
import { Vehicle } from "./VehicleModel";

export type Invoice = {
  id?: string | null;
  createdAt?: string | null;
  endAt?: string | null;
  paidAt?: string | null;
  plateNumber?: string | null;
  startAt?: string | null;
  updatedAt?: string | null;

  total?: number | null;
  estimatedParkingDurationInHours?: number | null;

  parkingLot?: Parking | null;
  vehicle?: Vehicle | null;
};
