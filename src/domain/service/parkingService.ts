import { parkingGetDoc } from "../gql-docs/parkingDocs";
import { graphqlQuery } from "../infra/apollo-client/apolloActions";

export function parkingGet(page: number = 0, size: number = 10) {
  const query = graphqlQuery(parkingGetDoc(), "Parking Lot", {
    variables: { page, size },
    fetchPolicy: "network-only",
  });

  const processedData = query.data?.getParkingLots;

  return { ...query, data: processedData };
}
