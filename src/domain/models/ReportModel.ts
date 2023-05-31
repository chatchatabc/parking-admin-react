import { User } from "./UserModel";

export type Report = {
  id: string | null | undefined;
  name: string | null | undefined;
  description: string | null | undefined;
  plateNumber: string | null | undefined;
  cancelledAt: string | null | undefined;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;

  latitude: number | null | undefined;
  longitude: number | null | undefined;

  reportedBy: User | null | undefined;
  status: ReportStatus[] | null | undefined;
};

export type ReportStatus = {
  id: string | null | undefined;
  remarks: string | null | undefined;
  createdAt: string | null | undefined;

  status: number | null | undefined;

  performedBy: User;
};
