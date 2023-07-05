export function vehicleGetDoc() {
  return `
  query GetVehicle($id: String!) {
    getVehicle(id: $id) {
      vehicleUuid
      name
      plateNumber
      modelUuid
      color
      year
      verifiedAt
      verifiedBy
      rejectionReason
      status
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
        modelUuid
        color
        year
        verifiedAt
        verifiedBy
        rejectionReason
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

export function vehicleGetTypeDoc() {
  return `
  query GetVehicleType($id: String) {
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

export function vehicleGetAllByUserDoc() {
  return `
  query GetAllVehiclesByUserUuid($page: Int, $size: Int, $id: String!) {
    getVehiclesByUser(page: $page, size: $size, id: $id) {
      content {
        vehicleUuid
        name
        plateNumber
        modelUuid
        color
        year
        verifiedAt
        verifiedBy
        rejectionReason
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
  query GetVehicleBrandById($id: String!) {
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

export function vehicleGetModelDoc() {
  return `
  query GetVehicleModel($id: String!) {
    getVehicleModel(id: $id) {
      modelUuid
      brandUuid
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
