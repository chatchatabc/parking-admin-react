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
        authorities {
          authority
        }
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
        authorities {
          authority
        }
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

export function userGetByParkingLotDoc() {
  return `
    query GetUserByParkingLot($keyword: String!) {
      getUserByParkingLot(id: $keyword) {
        userUuid
        username
        phone
        phoneVerifiedAt
        emailVerifiedAt
        email
        authorities {
          authority
        }
      }
    }
  `;
}

export function userGetByParkingLotUuidDoc() {
  return `
    query GetUserByParkingLotUuid($parkingLotUuid: String!) {
      getUserByParkingLotUuid(uuid: $parkingLotUuid) {
        userUuid
        username
        phone
        phoneVerifiedAt
        emailVerifiedAt
        email
        authorities {
          authority
        }
      }
    }
  `;
}

export function userGetAllDoc() {
  return `
  query GetAllUsers ($page: Int! = 0, $size: Int! = 10, $keyword: String, $sortField: String = "username", $sortBy: Int = 1) {
    getUsers(page:$page, size:$size, keyword:$keyword, sortField:$sortField, sortBy:$sortBy) {
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

export function userGetBanHistoryDoc() {
  return `
  query GetBanHistory($uuid: String!, $page: Int! = 0, $size: Int! = 10) {
    getBanHistoryLogsByUser(uuid: $uuid, page: $page, size: $size) {
      content {
        id
        createdAt
        until
        reason
        unbanReason
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

export function userGetBanHistoryByUsernameDoc() {
  return `
  query GetBanHistory($username: String!, $page: Int! = 0, $size: Int! = 10) {
    getBanHistoryLogsByUsername(username: $username, page: $page, size: $size) {
      content {
        id
        createdAt
        until
        reason
        unbanReason
        unbannedAt
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

export function userGetBanHistoryByPhoneDoc() {
  return `
  query GetBanHistory($phone: String!, $page: Int! = 0, $size: Int! = 10) {
    getBanHistoryLogsByPhone(phone: $phone, page: $page, size: $size) {
      content {
        id
        createdAt
        until
        reason
        unbanReason
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
