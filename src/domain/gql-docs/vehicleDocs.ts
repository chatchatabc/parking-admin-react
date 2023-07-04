export function vehicleGetDoc() {
  return `
  query GetVehicle($keyword: String!) {
    getVehicle(id: $keyword) {
      vehicleUuid
      name
      plateNumber
      typeUuid
      createdAt
      updatedAt
    }
  }
  `;
}

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

export function vehicleGetAllBrandDoc() {
  return `
  query GetAllVehicleBrands($page: Int, $size: Int, $keyword: String, $sortField: String, $sortBy: Int) {
    getVehicleBrands(page: $page, size: $size, keyword: $keyword, sortField: $sortField, sortBy: $sortBy) {
      content {
        brandUuid
        name
        status
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

export function vehicleGetBrandDoc() {
  return `
  query GetVehicleBrandById($keyword: String!) {
    getVehicleBrand(id: $keyword) {
      brandUuid
      name
      status
      createdAt
      updatedAt
    }
  }
  `;
}

export function vehicleGetAllTypeDoc() {
  return `
  query GetAllVehicleTypes($page: Int, $size: Int, $keyword: String, $sortField: String, $sortBy: Int) {
    getVehicleTypes(page: $page, size: $size, keyword: $keyword, sortField: $sortField, sortBy: $sortBy) {
      content {
        typeUuid
        name
        status
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
