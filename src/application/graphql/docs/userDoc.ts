import { gql } from "@apollo/client";

export function userGetDoc(size = 10, page = 0) {
  return gql`
  query {
    getUsers(size: ${size}, page: ${page}) {
      id,
      username,
      phone,
    }
  }
  `;
}
