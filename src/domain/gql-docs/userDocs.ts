export function userGetByUsernameDoc() {
  return `
    query GetUserByUsername($username: String!) {
      getUserByUsername(username: $username) {
        userUuid
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
  return `
    query GetUserByPhone($phone: String!) {
      getUserByPhone(phone: $phone) {
        userUuid
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
  return `
    mutation CreateUser($username: String!, $phone: String!) {
      createUser(username: $username, phone: $phone) {
        id
        username
        phone
      }
    }
  `;
}

export function userAllGetDoc() {
  return `
  query GetAllUsers ($page: Int!, $size: Int!, $keyword: String) {
    getUsers(page:$page, size:$size, keyword:$keyword) {
      content {
        userUuid
        username
        email
        phone
        emailVerifiedAt
        phoneVerifiedAt
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

export function userRolesGetDoc() {
  return `
    query GetRoles ($page: Int! = 0, $size: Int! = 100) {
      getRoles (page: $page, size: $size) {
        content {
          name
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
