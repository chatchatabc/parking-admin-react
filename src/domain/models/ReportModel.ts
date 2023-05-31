import { User } from "./UserModel";

export type Report = {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  plateNumber?: string | null;
  cancelledAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  latitude?: number | null;
  longitude?: number | null;

  reportedBy?: User | null;
  status?: ReportStatus[] | null;
};

export type ReportStatus = {
  id?: string | null;
  remarks?: string | null;
  createdAt?: string | null;

  status?: number | null;

  performedBy?: User;
};
