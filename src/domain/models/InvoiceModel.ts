export type Invoice = {
  id?: string | null;
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
};
