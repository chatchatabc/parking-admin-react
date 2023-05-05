import {
  parkingGetAllByOwnerDoc,
  parkingGetDoc,
} from "../gql-docs/parkingDocs";
import { graphqlQuery } from "../infra/apollo-client/apolloActions";

export function parkingGet(
  page: number = 0,
  size: number = 10,
  keyword: string | undefined
) {
  const query = graphqlQuery(parkingGetDoc(), "Parking Lot", {
    variables: { page, size, keyword },
    fetchPolicy: "network-only",
  });

  const processedData = query.data?.getParkingLots;

  return { ...query, data: processedData };
}

export function parkingGetAllByOwner(
  page: number = 0,
  size: number = 10,
  userId: string
) {
  const query = graphqlQuery(
    parkingGetAllByOwnerDoc(),
    "Get Parking Lots by Owner",
    {
      variables: { page, size, userId },
      fetchPolicy: "network-only",
    }
  );

  const processedData = query.data?.getParkingLotsByOwner;

  return { ...query, data: processedData };
}
