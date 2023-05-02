import { gql } from "@apollo/client";

export function userGetDoc() {
  return gql`
    query GetUsers($size: Int!, $page: Int!) {
      getUsers(size: $size, page: $page) {
        content {
          id
          username
          phone
          phoneVerifiedAt
          emailVerifiedAt
          email
        }

        pageInfo {
          size
          totalElements
        }
      }
    }
  `;
}

export function userAddDoc() {
  return gql`
    mutation CreateUser($username: String!, $phone: String!) {
      createUser(username: $username, phone: $phone) {
        id
        username
        phone
      }
    }
  `;
}
