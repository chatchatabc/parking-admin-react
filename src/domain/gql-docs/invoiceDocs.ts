export function invoiceGetAllDoc() {
  return `
  query GetAllInvoices($page: Int = 0, $size: Int = 10) {
    getInvoices(page: $page, size: $size) {
      content {
        invoiceUuid
        createdAt
        endAt
        paidAt
        plateNumber
        startAt
        updatedAt
        parkingLotUuid
        vehicleUuid
        total
        estimatedParkingDurationInHours
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

export function invoiceGetByParkingLotDoc() {
  return `
  query GetInvoiceByParkingLot($page: Int = 0, $size: Int = 10, $keyword: String!) {
    getInvoicesByParkingLot(page: $page, size: $size, id: $keyword) {
      content {
        invoiceUuid
        createdAt
        endAt
        paidAt
        plateNumber
        startAt
        updatedAt
        parkingLotUuid
        vehicleUuid
        total
        estimatedParkingDurationInHours
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

export function invoiceGetByUserDoc() {
  return `
  query GetInvoiceByUser($page: Int = 0, $size: Int = 10, $keyword: String!) {
    getInvoicesByUser(page: $page, size: $size, id: $keyword) {
      content {
        invoiceUuid
        createdAt
        endAt
        paidAt
        plateNumber
        startAt
        updatedAt
        parkingLotUuid
        vehicleUuid
        total
        estimatedParkingDurationInHours
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

export function invoiceGetAllByVehicleDoc() {
  return `
    query GetAllInvoicesByVehicle($page: Int = 0, $size: Int = 10, $keyword: String = "") {
      getInvoicesByVehicle(page: $page, size: $size, id: $keyword) {
        content {
          invoiceUuid
          createdAt
          endAt
          paidAt
          plateNumber
          startAt
          updatedAt
          parkingLotUuid
          vehicleUuid
          total
          estimatedParkingDurationInHours
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

export function invoiceGetDoc() {
  return `
  query GetInvoice($keyword: String!) {
    getInvoice(id: $keyword) {
      invoiceUuid
      createdAt
      endAt
      paidAt
      plateNumber
      startAt
      updatedAt
      parkingLotUuid
      vehicleUuid
      total
      estimatedParkingDurationInHours
    }
  }
  `;
}
