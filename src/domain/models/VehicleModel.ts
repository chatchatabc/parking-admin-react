import { User } from "./UserModel";

export type Vehicle = {
  vehicleUuid?: string | null;
  name?: string | null;
  plateNumber?: string | null;
  modelUuid?: string | null;
  color?: string | null;
  year?: string | null;
  verifiedAt?: string | null;
  rejectionReason?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  status?: number | null;
  verifiedBy?: number | null;

  owner?: User | null;
  model?: VehicleModel | null;
};

export type VehicleBrand = {
  brandUuid?: string | null;
  name?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  status?: number | null;
};

export type VehicleType = {
  typeUuid?: string | null;
  name?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  status?: number | null;
};

export type VehicleModel = {
  modelUuid?: string | null;
  name?: string | null;
  brandUuid?: string | null;
  typeUuid?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  status?: number | null;

  brand?: VehicleBrand | null;
  type?: VehicleType | null;
};
