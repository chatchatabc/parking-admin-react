import { ParkingLot } from "./ParkingLotModel";
import { Vehicle } from "./VehicleModel";

export type Invoice = {
  invoiceUuid?: string | null;
  createdAt?: string | null;
  endAt?: string | null;
  paidAt?: string | null;
  plateNumber?: string | null;
  startAt?: string | null;
  updatedAt?: string | null;
  parkingLotUuid?: string | null;
  vehicleUuid?: string | null;

  total?: number | null;
  estimatedParkingDurationInHours?: number | null;

  parkingLot?: ParkingLot | null;
  vehicle?: Vehicle | null;
};
