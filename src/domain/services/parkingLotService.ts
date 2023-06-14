import {
  parkingLotGetAllDoc,
  parkingLotGetByUserDoc,
  parkingLotGetByUuidDoc,
  parkingLotGetImagesByParkingLotDoc,
} from "../gql-docs/parkingDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost, restPut } from "../infra/apis/restAction";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { ParkingLot } from "../models/ParkingModel";
import { User } from "../models/UserModel";
import { userGetByParkingLot, userGetByParkingLotUuid } from "./userService";

export async function parkingLotGetAll({
  page = 0,
  size = 10,
  keyword = "",
}: Record<string, any>) {
  const query = await graphqlQuery(parkingLotGetAllDoc(), {
    page,
    size,
    keyword,
  });

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLots;

  return { data } as AxiosResponseData<CommonContent<ParkingLot>>;
}

export async function parkingLotGetAllWithOwners(variables: CommonVariables) {
  const query = await graphqlQuery(parkingLotGetAllDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  // Add owner info to each parking lot
  const parkingLots = query.data.data.getParkingLots.content as ParkingLot[];
  const additionalInfo = parkingLots.map(async (parkingLot) => {
    const newParkingLot: ParkingLot<User> = {
      ...parkingLot,
    };

    const queryOwner = await userGetByParkingLot({
      keyword: parkingLot.parkingLotUuid ?? "",
    });

    if (queryOwner.errors) {
      return newParkingLot;
    }

    newParkingLot.owner = queryOwner.data;
    return newParkingLot;
  });

  // Wait for all promises to resolve
  const newContent = await Promise.all(additionalInfo);
  const data = { ...query.data.data.getParkingLots, content: newContent };

  console.log(data);

  return { data } as AxiosResponseData<CommonContent<ParkingLot<User>>>;
}

export async function parkingLotGetWithOwner(variables: {
  parkingLotUuid: string;
}) {
  const response = await parkingLotGetByUuid(variables);

  if (response.errors) {
    return response;
  }

  const parkingLot = response.data as ParkingLot;

  const queryOwner = await userGetByParkingLotUuid(
    parkingLot.parkingLotUuid ?? ""
  );

  if (queryOwner.errors) {
    return queryOwner;
  }

  const owner = queryOwner.data as User;

  const data = { ...parkingLot, owner };

  return { data } as AxiosResponseData<ParkingLot<User>>;
}

export async function parkingLotGetByUuid(variables: {
  parkingLotUuid: string;
}) {
  const query = await graphqlQuery(parkingLotGetByUuidDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLotByUuid;

  return { data } as AxiosResponseData<ParkingLot>;
}

export async function parkingLotGetByUser(variables: { keyword: string }) {
  const response = await graphqlQuery(parkingLotGetByUserDoc(), variables);

  if (response.data.errors) {
    return response.data;
  }

  const data = response.data.data.getParkingLotByUser;

  return { data } as AxiosResponseData<ParkingLot>;
}

export async function parkingLotCreate(values: Record<string, any>) {
  const userUuid = values.userUuid;

  delete values.userUuid;

  const response = await restPost(`/parking-lot/create/${userUuid}`, values);

  return response.data;
}

export async function parkingLotUpdate(values: Record<string, any>) {
  const parkingLotUuid = values.parkingLotUuid;

  delete values.parkingLotUuid;

  const response = await restPut(
    `/parking-lot/update/${parkingLotUuid}`,
    values
  );

  return response.data;
}

export async function parkingLotVerify(parkingLotUuid: string) {
  const response = await restPut(`/parking-lot/verify/${parkingLotUuid}`, {});

  return response.data;
}

export async function parkingLotGetDonut() {
  const query = await graphqlQuery(parkingLotGetAllDoc(), { size: 100000 });

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLots;

  const verified = data.content.filter((parkingLot: ParkingLot) => {
    // If verifiedAt exists
    if (parkingLot.verifiedAt) {
      return true;
    }
    return false;
  });

  const series = [verified.length, data.content.length - verified.length];
  const labels = ["Verified", "Unverified"];

  return {
    data: {
      series,
      labels,
    },
  } as AxiosResponseData<{ series: number[]; labels: string[] }>;
}

export async function parkingLotUpdateRate(values: Record<string, any>) {
  const parkingLotUuid = values.parkingLotUuid;

  delete values.parkingLotUuid;

  const response = await restPost(`/rate/update/${parkingLotUuid}`, values);

  return response.data;
}

export async function parkingLotGetImagesByParkingLot(
  variables: CommonVariables & {
    keyword: string;
  }
) {
  const query = await graphqlQuery(
    parkingLotGetImagesByParkingLotDoc(),
    variables
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getParkingLotImageKeysByParkingLotUuid;

  return { data } as AxiosResponseData<string[]>;
}

export function parkingLotGetFilters() {
  return [
    {
      label: "Name, ASC",
      value: "name,1",
    },
    {
      label: "Name, DESC",
      value: "name,0",
    },
    {
      label: "Verified, ASC",
      value: "verifiedAt,1",
    },
    {
      label: "Verified, DESC",
      value: "verifiedAt,0",
    },
  ];
}
