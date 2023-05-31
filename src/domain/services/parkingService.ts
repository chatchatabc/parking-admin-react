import {
  parkingGetAllByOwnerDoc,
  parkingGetAllDoc,
} from "../gql-docs/parkingDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData } from "../models/AxiosModel";

export async function parkingGetAll({
  page = 0,
  size = 10,
  keyword = undefined,
}: Record<string, any>) {
  const query = await graphqlQuery(parkingGetAllDoc(), { page, size, keyword });

  if (query.data.errors) {
    return query.data;
  }

  return query.data.getParkingLots;
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
