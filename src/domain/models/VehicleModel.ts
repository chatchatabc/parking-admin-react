import { User } from "./UserModel";

export type Vehicle = {
  vehicleUuid: string;
  modelUuid: string;
  name: string;
  plateNumber: string;
  color: string;
  year: string;
  verifiedAt: string;
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;

  status: number;
  verifiedBy: number;

  owner?: User;
  model?: VehicleModel;
};

export type VehicleBrand = {
  brandUuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  status: number;
};

export type VehicleType = {
  typeUuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  status: number;
};

export type VehicleModel = {
  modelUuid: string;
  name: string;
  brandUuid: string;
  typeUuid: string;
  createdAt: string;
  updatedAt: string;

  status: number;

  brand?: VehicleBrand;
  type?: VehicleType;
};
