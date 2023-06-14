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

export function invoiceGetByParkingLotDoc() {
  return `
  query GetInvoiceByParkingLot($page: Int = 0, $size: Int = 10, $keyword: String!) {
    getInvoicesByParkingLot(page: $page, size: $size, id: $keyword) {
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

export function invoiceGetByUserDoc() {
  return `
  query GetInvoiceByUser($page: Int = 0, $size: Int = 10, $keyword: String!) {
    getInvoicesByUser(page: $page, size: $size, id: $keyword) {
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
