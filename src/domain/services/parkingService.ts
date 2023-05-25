import {
  parkingGetAllByOwnerDoc,
  parkingGetAllDoc,
} from "../gql-docs/parkingDocs";
import {
  apolloClient,
  graphqlQuery,
} from "../infra/apollo-client/apolloActions";

export async function parkingGetAll({
  page = 0,
  size = 10,
  keyword = undefined,
}: Record<string, any>) {
  const query = await apolloClient.query({
    query: parkingGetAllDoc(),
    variables: { page, size, keyword },
    fetchPolicy: "network-only",
  });

  return query.data.getParkingLots;
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
