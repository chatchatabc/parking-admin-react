import { gql } from "@apollo/client";

export function parkingGetDoc() {
  return gql`
    query GetParkingLots($size: Int!, $page: Int!, $keyword: String) {
      getParkingLots(size: $size, page: $page, keyword: $keyword) {
        content {
          id
          availableSlots
          address
          capacity
          name

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

export function parkingGetAllByOwnerDoc() {
  return gql`
    query GetParkingLotsByOwner($page: Int!, $size: Int!, $userId: String!) {
      getParkingLotsByOwner(page: $page, size: $size, ownerId: $userId) {
        content {
          id
          availableSlots
          address
          capacity
          name

          rate {
            id
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
