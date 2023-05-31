export type Parking = {
  id: string | null | undefined;
  address: string | null | undefined;
  businessHoursEnd: string | null | undefined;
  businessHoursStart: string | null | undefined;
  createdAt: string | null | undefined;
  description: string | null | undefined;
  name: string | null | undefined;
  updatedAt: string | null | undefined;
  verifiedAt: string | null | undefined;

  latitude: number | null | undefined;
  longitude: number | null | undefined;

  capacity: number | null | undefined;
  availableSlots: number | null | undefined;

  rate: ParkingRate | null | undefined;
};

export type ParkingRate = {
  id: string;
  createdAt: string;
  updatedAt: string;

  rate: number | null | undefined;
  startingRate: number | null | undefined;
  type: number | null | undefined;
  freeHours: number | null | undefined;
  interval: number | null | undefined;

  payForFreeHoursWhenExceeding: Boolean;
};
