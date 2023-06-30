import { User } from "./UserModel";

export type Vehicle = {
  vehicleUuid?: string | null;
  name?: string | null;
  plateNumber?: string | null;
  brandUuid?: string | null;
  modelUuid?: string | null;
  typeUuid?: string | null;
  color?: string | null;
  year?: string | null;
  verifiedAt?: string | null;
  rejectionReason?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  status?: number | null;
  verifiedBy?: number | null;

  owner?: User | null;
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
