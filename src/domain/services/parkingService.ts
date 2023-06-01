import {
  parkingAllGetDoc,
  parkingLotGetByPhoneDoc,
  parkingLotGetByUsernameDoc,
} from "../gql-docs/parkingDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost } from "../infra/apis/restAction";
import { AxiosResponseData } from "../models/AxiosModel";
import { CommonPageInfo } from "../models/CommonModel";
import { Parking } from "../models/ParkingModel";

export async function parkingAllGet({
  page = 0,
  size = 10,
  keyword = "",
}: Record<string, any>) {
  const query = await graphqlQuery(parkingAllGetDoc(), { page, size, keyword });

  if (query.data.errors) {
    return query.data;
  }

  return query.data.data.getParkingLots as AxiosResponseData & {
    content: Parking[];
    pageInfo: CommonPageInfo;
  };
}

export async function parkingLotGet({
  username = "",
  phone = "",
}: {
  username?: string;
  phone?: string;
}) {
  let response, data;

  if (username) {
    response = await graphqlQuery(parkingLotGetByUsernameDoc(), { username });

    if (response.data.errors) {
      return response.data;
    }

    data = response.data.data.getParkingLotByUsername;
  } else if (phone) {
    response = await graphqlQuery(parkingLotGetByPhoneDoc(), { phone });

    if (response.data.errors) {
      return response.data;
    }

    data = response.data.data.getParkingLotByPhone;
  } else {
    return {
      errors: [
        {
          message: "username or phone is required",
        },
      ],
    };
  }

  return { data } as AxiosResponseData & Parking;
}

export async function parkingCreate(values: Record<string, any>) {
  const userUuid = values.userUuid;

  delete values.userUuid;

  const response = await restPost(`/parking-lot/create/${userUuid}`, values);

  return response.data;
}
