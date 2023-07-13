import { User } from "./UserModel";

export type ParkingLot = {
  parkingLotUuid: string;
  address: string;
  businessHoursEnd: string;
  businessHoursStart: string;
  createdAt: string;
  description: string;
  name: string;
  updatedAt: string;
  verifiedAt: string;

  latitude: number;
  longitude: number;
  capacity: number;
  availableSlots: number;
  openDaysFlag: number;

  rate: ParkingLotRate;
  owner?: User;
};

export type ParkingLotRate = {
  id: string;
  createdAt: string;
  updatedAt: string;

  rate: number;
  startingRate: number;
  type: number;
  freeHours: number;
  interval: number;

  payForFreeHoursWhenExceeding: Boolean;
};
