import { UploadFile } from "antd";
import {
  parkingLotGetAllDoc,
  parkingLotGetImagesByParkingLotDoc,
} from "../gql-docs/parkingDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import {
  restGet,
  restPost,
  restPostMultiPart,
  restPut,
} from "../infra/apis/restActions";
import {
  AxiosResponse,
  AxiosResponseData,
  AxiosResponseError,
} from "../models/AxiosModel";
import { CommonPagination, CommonVariables } from "../models/CommonModel";
import { ParkingLot } from "../models/ParkingLotModel";
import { User } from "../models/UserModel";
import { userGetByParkingLot } from "./userService";
import type { Dayjs } from "dayjs";

export async function parkingLotGet(params: { id: string }) {
  const { id, ...values } = params;

  const response: AxiosResponse<ParkingLot> = await restGet(
    `/parking-lot/${id}`,
    values,
    "ParkingLotGet"
  );

  if (response.data.errors) {
    return response.data;
  }

  response.data.data = await parkingLotGetAllInfo(response.data.data);

  return response.data;
}

export async function parkingLotGetAll(params: CommonVariables) {
  const response: AxiosResponse<CommonPagination<ParkingLot>> = await restGet(
    `/parking-lot`,
    params,
    "ParkingLotGetAll"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (parkingLot) => {
    return await parkingLotGetAllInfo(parkingLot);
  });

  response.data.data.content = await Promise.all(contentPromise);

  return response.data;
}

export async function parkingLotGetWithOwner(variables: { id: string }) {
  const response = await parkingLotGet(variables);

  if (response.errors) {
    return response;
  }

  const parkingLot = response.data as ParkingLot;

  const queryOwner = await userGetByParkingLot({
    id: parkingLot.parkingLotUuid ?? "",
  });

  if (queryOwner.errors) {
    return queryOwner;
  }

  const owner = queryOwner.data as User;

  const data = { ...parkingLot, owner };

  return { data } as AxiosResponseData<ParkingLot>;
}

export async function parkingLotGetByUser(params: { id: string }) {
  const { id, ...values } = params;

  const response: AxiosResponse<ParkingLot> = await restGet(
    `/parking-lot/user/${id}`,
    values,
    "ParkingLotGetByUser"
  );

  if (response.data.errors) {
    return response.data;
  }

  response.data.data = await parkingLotGetAllInfo(response.data.data);

  return response.data;
}

export async function parkingLotGetAllInfo(parking: ParkingLot) {
  const user = await userGetByParkingLot({ id: parking.parkingLotUuid });
  if (!user.errors) {
    parking.owner = user.data;
  }

  return parking;
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

export async function parkingLotGetAllImage(
  params: CommonVariables & {
    id: string;
  }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<string[]> = await restGet(
    `/parking-lot/images/${id}`,
    values,
    "ParkingLotGetAllImage"
  );

  return response.data;
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
