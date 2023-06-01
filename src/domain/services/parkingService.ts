import {
  parkingAllGetDoc,
  parkingGetAllByOwnerDoc,
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

export async function parkingGetAllByOwner(
  page: number = 0,
  size: number = 10,
  userId: string
) {
  const query = await graphqlQuery(parkingGetAllByOwnerDoc(), {
    page,
    size,
    userId,
  });

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data?.getParkingLotsByOwner;

  return { data } as AxiosResponseData;
}

export async function parkingCreate(values: Record<string, any>) {
  const userUuid = values.userUuid;

  delete values.userUuid;

  const response = await restPost(`/parking-lot/create/${userUuid}`, values);

  return response.data;
}
