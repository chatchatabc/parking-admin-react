import { User } from "./UserModel";

export type Vehicle = {
  vehicleUuid: string | null | undefined;
  name: string | null | undefined;
  plateNumber: string | null | undefined;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;

  type: number | null | undefined;

  owner: User;
};
