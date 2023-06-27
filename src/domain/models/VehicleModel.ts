export type Vehicle = {
  vehicleUuid?: string | null;
  name?: string | null;
  plateNumber?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  typeUuid?: string | null;

  type?: VehicleType | null;
};

export type VehicleType = {
  typeUuid?: string | null;
  name?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  status?: number | null;
};
