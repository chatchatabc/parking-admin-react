import {
  parkingAllGetDoc,
  parkingGetAllByOwnerDoc,
} from "../gql-docs/parkingDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData } from "../models/AxiosModel";
import { Pagination } from "../models/CommonModel";
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
    pageInfo: Pagination;
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
