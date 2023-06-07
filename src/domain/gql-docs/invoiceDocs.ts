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
  query GetInvoiceByParkingLotUuid($parkingLotUuid: String!) {
    getInvoicesByParkingLotUuid(uuid: $parkingLotUuid) {
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
