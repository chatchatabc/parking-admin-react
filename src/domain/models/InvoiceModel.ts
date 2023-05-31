import { Parking } from "./ParkingModel";
import { Vehicle } from "./VehicleModel";

export type Invoice = {
  id: string | null | undefined;
  createdAt: string | null | undefined;
  endAt: string | null | undefined;
  paidAt: string | null | undefined;
  plateNumber: string | null | undefined;
  startAt: string | null | undefined;
  updatedAt: string | null | undefined;

  total: number | null | undefined;
  estimatedParkingDurationInHours: number | null | undefined;

  parkingLot: Parking | null | undefined;
  vehicle: Vehicle | null | undefined;
};
