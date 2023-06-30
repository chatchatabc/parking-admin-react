import { UploadFile } from "antd";
import {
  parkingLotGetAllDoc,
  parkingLotGetByUserDoc,
  parkingLotGetDoc,
  parkingLotGetImagesByParkingLotDoc,
} from "../gql-docs/parkingDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import {
  restPost,
  restPostMultiPart,
  restPut,
} from "../infra/apis/restActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { ParkingLot } from "../models/ParkingModel";
import { User } from "../models/UserModel";
import { userGetByParkingLot } from "./userService";
import type { Dayjs } from "dayjs";

export async function parkingLotGet(variables: { keyword: string }) {
  const query = await graphqlQuery(
    parkingLotGetDoc(),
    variables,
    "ParkingLotGet"
  );

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLot;

  return { data } as AxiosResponseData<ParkingLot>;
}

export async function parkingLotGetAll({
  page = 0,
  size = 10,
  keyword = "",
}: Record<string, any>) {
  const query = await graphqlQuery(
    parkingLotGetAllDoc(),
    {
      page,
      size,
      keyword,
    },
    "ParkingLotGetAll"
  );

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLots;

  return { data } as AxiosResponseData<CommonContent<ParkingLot>>;
}

export async function parkingLotGetAllWithOwners(variables: CommonVariables) {
  const query = await parkingLotGetAll(variables);

  if (query.errors) {
    return query;
  }

  // Add owner info to each parking lot
  const parkingLots = query.data.content as ParkingLot[];
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
  const data = { ...query.data, content: newContent };

  return { data } as AxiosResponseData<CommonContent<ParkingLot<User>>>;
}

export async function parkingLotGetWithOwner(variables: { keyword: string }) {
  const response = await parkingLotGet(variables);

  if (response.errors) {
    return response;
  }

  const parkingLot = response.data as ParkingLot;

  const queryOwner = await userGetByParkingLot({
    keyword: parkingLot.parkingLotUuid ?? "",
  });

  if (queryOwner.errors) {
    return queryOwner;
  }

  const owner = queryOwner.data as User;

  const data = { ...parkingLot, owner };

  return { data } as AxiosResponseData<ParkingLot<User>>;
}

export async function parkingLotGetByUser(variables: { keyword: string }) {
  const response = await graphqlQuery(
    parkingLotGetByUserDoc(),
    variables,
    "ParkingLotGetByUser"
  );

  if (response.data.errors) {
    return response.data;
  }

  const data = response.data.data.getParkingLotByUser;

  return { data } as AxiosResponseData<ParkingLot>;
}

export async function parkingLotCreate(values: Record<string, any>) {
  const openDaysFlag = values.openDaysFlag as number[];
  const businessHoursEnd = values.businessHoursEnd as Dayjs;
  const businessHoursStart = values.businessHoursStart as Dayjs;

  values.businessHoursEnd = businessHoursEnd.toISOString();
  values.businessHoursStart = businessHoursStart.toISOString();
  values.capacity = Number(values.capacity);
  values.latitude = Number(values.latitude);
  values.longitude = Number(values.longitude);
  values.openDaysFlag = openDaysFlag.reduce((acc, curr) => {
    return acc | curr;
  }, 0);

  const userUuid = values.userUuid;

  delete values.userUuid;

  const response = await restPost(`/parking-lot/create/${userUuid}`, values);

  return response.data;
}

export async function parkingLotUpdate(values: Record<string, any>) {
  const openDaysFlag = values.openDaysFlag as number[];
  const businessHoursEnd = values.businessHoursEnd as Dayjs;
  const businessHoursStart = values.businessHoursStart as Dayjs;

  values.businessHoursEnd = businessHoursEnd.toISOString();
  values.businessHoursStart = businessHoursStart.toISOString();
  values.capacity = Number(values.capacity);
  values.latitude = Number(values.latitude);
  values.longitude = Number(values.longitude);
  values.openDaysFlag = openDaysFlag.reduce((acc, curr) => {
    return acc | curr;
  }, 0);

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

export async function parkingLotUploadImage(params: {
  parkingLotUuid: string;
  file: UploadFile;
}) {
  const { parkingLotUuid, file } = params;

  const response = await restPostMultiPart(
    `/parking-lot/upload-image/${parkingLotUuid}`,
    {
      file,
    }
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  return response.data as AxiosResponseData<any>;
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
    variables,
    "ParkingLotGetImagesByParkingLot"
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
