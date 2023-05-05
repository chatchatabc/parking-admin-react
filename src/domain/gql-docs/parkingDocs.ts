import { gql } from "@apollo/client";

export function parkingGetDoc() {
  return gql`
    query GetParkingLots($size: Int!, $page: Int!) {
      getParkingLots(size: $size, page: $page) {
        content {
          id
          availableSlots
          address
          capacity

          rate {
            id
          }

          owner {
            userId
            username
            phone
          }
        }

        pageInfo {
          size
          totalElements
        }
      }
    }
  `;
}
