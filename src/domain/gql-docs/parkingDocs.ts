export function parkingLotGetAllDoc() {
  return `
    query GetParkingLots($size: Int! = 10, $page: Int! = 0, $keyword: String, $verified: Int, $sortBy: Int! = 1, $sortField: String! = "name") {
      getParkingLots(size: $size, page: $page, keyword: $keyword, verified: $verified, sortBy: $sortBy, sortField: $sortField) {
        content {
          parkingLotUuid
          availableSlots
          address
          capacity
          name
          verifiedAt

          rate{
            freeHours
            interval
            payForFreeHoursWhenExceeding
            rate
            startingRate
            type
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

export function parkingLotGetDoc() {
  return `
    query GetParkingLot($id: String!) {
      getParkingLot(id: $id) {
        parkingLotUuid
        availableSlots
        address
        capacity
        name
        businessHoursEnd
        businessHoursStart
        latitude
        longitude
        description
        openDaysFlag
        verifiedAt
        rate{
          freeHours
          interval
          payForFreeHoursWhenExceeding
          rate
          startingRate
          type
        }
      }
    }
  `;
}

export function parkingLotGetByUserDoc() {
  return `
    query GetParkingLotByUser($id: String!) {
      getParkingLotByUser(id: $id) {
        parkingLotUuid
        availableSlots
        address
        capacity
        name
        businessHoursEnd
        businessHoursStart
        latitude
        longitude
        description
        openDaysFlag
        verifiedAt
        rate{
          freeHours
          interval
          payForFreeHoursWhenExceeding
          rate
          startingRate
          type
        }
      }
    }
  `;
}

export function parkingLotGetImagesByParkingLotDoc() {
  return `
    query GetParkingLotImages($page: Int! = 0, $size: Int! = 10, $id: String!) {
      getParkingLotImageKeysByParkingLot(page: $page, size: $size, id: $id) 
    }
  `;
}
