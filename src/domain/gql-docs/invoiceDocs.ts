export function invoiceGetAllDoc() {
  return `
  query GetAllInvoices($page: Int = 0, $size: Int = 10) {
    getInvoices(page: $page, size: $size) {
      content {
        id
        startAt
        endAt

        vehicle {
          vehicleUuid
          name
          plateNumber
          type
          createdAt
          updatedAt
        }
        
        parkingLot {
          parkingLotUuid
          availableSlots
          address
          capacity
          name
          verifiedAt

          rate {
            id
          }
        }
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
