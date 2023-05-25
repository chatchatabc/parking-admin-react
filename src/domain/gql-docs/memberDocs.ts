import { gql } from "@apollo/client";

export function memberGetAllDoc() {
  return gql`
    query GetMembers($size: Int!, $page: Int!, $keyword: String) {
      getMembers(size: $size, page: $page, keyword: $keyword) {
        content {
          memberUuid
          username
          email
          phone
        }
        pageInfo {
          size
          totalElements
          first
          last
          empty
        }
      }
    }
  `;
}

export function memberRolesGetDoc() {
  return gql`
    query GetRoles($size: Int!, $page: Int!) {
      getRoles(size: $size, page: $page) {
        content {
          name
        }
      }
    }
  `;
}

export function memberGetByUsernameDoc() {
  return gql`
    query GetMemberByUsername($username: String!) {
      getMemberByUsername(username: $username) {
        memberUuid
        username
        email
        phone
        lastName
        firstName
        createdAt
        updatedAt
        phoneVerifiedAt
        emailVerifiedAt
      }
    }
  `;
}

export function memberGetByPhoneDoc() {
  return gql`
    query GetMemberByPhone($phone: String!) {
      getMemberByPhone(phone: $phone) {
        memberUuid
        username
        email
        phone
        lastName
        firstName
        createdAt
        updatedAt
        phoneVerifiedAt
        emailVerifiedAt
      }
    }
  `;
}
