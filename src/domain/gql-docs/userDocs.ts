import { gql } from "@apollo/client";

export function userGetListDoc() {
  return gql`
    query GetUsers($size: Int!, $page: Int!, $keyword: String) {
      getUsers(size: $size, page: $page, keyword: $keyword) {
        content {
          userId
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

export function userGetByUsernameDoc() {
  return gql`
    query GetUserByUsername($username: String!) {
      getUserByUsername(username: $username) {
        userId
        username
        phone
        phoneVerifiedAt
        emailVerifiedAt
        email
      }
    }
  `;
}

export function userGetByPhoneDoc() {
  return gql`
    query GetUserByPhone($phone: String!) {
      getUserByPhone(phone: $phone) {
        userId
        username
        phone
        phoneVerifiedAt
        emailVerifiedAt
        email
      }
    }
  `;
}

export function userGetByIdDoc() {
  return gql`
    query GetUserById($userId: String!) {
      getUserById(userId: $userId) {
        userId
        username
        phone
        phoneVerifiedAt
        emailVerifiedAt
        email
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

export function userRoleListDoc() {
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
