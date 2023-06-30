export function vehicleGetAllDoc() {
  return `
  query GetAllVehicles($page: Int, $size: Int) {
    getVehicles(page: $page, size: $size) {
      content {
        vehicleUuid
        name
        plateNumber
        typeUuid
        createdAt
        updatedAt
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

export function vehicleGetTypeDoc() {
  return `
  query GetVehicleType($keyword: String) {
    getVehicleType(id: $keyword) {
      typeUuid
      name
      status
      createdAt
      updatedAt
    }
  }
  `;
}

export function vehicleGetAllByUserUuidDoc() {
  return `
  query GetAllVehiclesByUserUuid($page: Int, $size: Int, $userUuid: String!) {
    getVehiclesByOwner(page: $page, size: $size, ownerUuid: $userUuid) {
      content {
        vehicleUuid
        name
        plateNumber
        typeUuid
        createdAt
        updatedAt
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

export function vehicleGetOwnerByVehicleIdDoc() {
  return `
  query GetOwnerByVehicleId($id: String!) {
    getOwnerByVehicleId(id: $id) {
      userUuid
      username
      email
      phone
      createdAt
      updatedAt
    }
  }
  `;
}
