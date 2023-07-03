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

export function vehicleGetBrandByIdDoc() {
  return `
  query GetVehicleBrandById($id: String) {
    getVehicleBrand(id: $id) {
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

export function vehicleGetTypeByIdDoc() {
  return `
  query GetVehicleTypeById($id: String!) {
    getVehicleType(id: $id) {
      typeUuid
      name
      status
      createdAt
      updatedAt
    }
  }
  `;
}

export function vehicleGetAllModelDoc() {
  return `
  query GetAllVehicleModels($page: Int, $size: Int, $keyword: String, $sortField: String, $sortBy: Int) {
    getVehicleModels(page: $page, size: $size, keyword: $keyword, sortField: $sortField, sortBy: $sortBy) {
      content {
        modelUuid
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

export function vehicleGetModelDoc() {
  return `
  query GetVehicleModel($id: String!) {
    getVehicleModel(id: $id) {
      modelUuid
      brandUuid
      name
      status
      createdAt
      updatedAt
    }
  }
  `;
}

export function vehicleGetAllModelByBrandDoc() {
  return `
  query GetAllVehicleModelsByBrand($page: Int, $size: Int, $brandUuid: String!) {
    getVehicleModelsByBrand(page: $page, size: $size, brandUuid: $brandUuid) {
      content {
        modelUuid
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
