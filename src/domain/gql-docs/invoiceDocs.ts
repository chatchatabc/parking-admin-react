export function invoiceGetAllDoc() {
  return `
  query GetAllInvoices($page: Int = 0, $size: Int = 10) {
    getInvoices(page: $page, size: $size) {
      content {
        id
        startAt
        endAt
        plateNumber

        parkingLotUuid
        vehicleUuid
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

export function invoiceGetByParkingLotUuidDoc() {
  return `
  query GetInvoiceByParkingLotUuid($page: Int = 0, $size: Int = 10, $parkingLotUuid: String!) {
    getInvoicesByParkingLotUuid(page: $page, size: $size, uuid: $parkingLotUuid) {
      content {
        id
        startAt
        endAt
        plateNumber

        parkingLotUuid
        vehicleUuid
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

export function invoiceGetByUserUuidDoc() {
  return `
  query GetInvoiceByUserUuid($page: Int = 0, $size: Int = 10, $userUuid: String!) {
    getInvoicesByUserUuid(page: $page, size: $size, uuid: $userUuid) {
      content {
        id
        startAt
        endAt
        plateNumber

        parkingLotUuid
        vehicleUuid
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
