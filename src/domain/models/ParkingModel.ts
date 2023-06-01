export type Parking = {
  parkingLotUuid?: string | null;
  address?: string | null;
  businessHoursEnd?: string | null;
  businessHoursStart?: string | null;
  createdAt?: string | null;
  description?: string | null;
  name?: string | null;
  updatedAt?: string | null;
  verifiedAt?: string | null;

  latitude?: number | null;
  longitude?: number | null;

  capacity?: number | null;
  availableSlots?: number | null;

  rate?: ParkingRate | null;
};

export type ParkingRate = {
  id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  rate?: number | null;
  startingRate?: number | null;
  type?: number | null;
  freeHours?: number | null;
  interval?: number | null;

  payForFreeHoursWhenExceeding?: Boolean;
};
