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

export function vehicleGetAllByUserUuidDoc() {
  return `
  query GetAllVehiclesByUserUuid($page: Int, $size: Int, $userUuid: String!) {
    getVehiclesByOwner(page: $page, size: $size, ownerUuid: $userUuid) {
      content {
        vehicleUuid
        name
        plateNumber
        type
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
