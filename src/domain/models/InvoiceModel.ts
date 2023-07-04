import { ParkingLot } from "./ParkingLotModel";
import { Vehicle } from "./VehicleModel";

export type Invoice = {
  invoiceUuid: string;
  createdAt: string;
  endAt: string;
  paidAt: string;
  plateNumber: string;
  startAt: string;
  updatedAt: string;
  parkingLotUuid: string;
  vehicleUuid: string;

  total?: number | null;
  estimatedParkingDurationInHours?: number | null;

  parkingLot?: ParkingLot | null;
  vehicle?: Vehicle | null;
};
