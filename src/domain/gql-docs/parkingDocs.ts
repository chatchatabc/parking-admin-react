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

export function parkingLotGetByUserDoc() {
  return `
    query GetParkingLotByUser($keyword: String!) {
      getParkingLotByUser(id: $keyword) {
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

export function parkingLotGetByUsernameDoc() {
  return `
    query GetParkingLotByUsername($username: String!) {
      getParkingLotByUsername(username: $username) {
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

export function parkingLotGetByPhoneDoc() {
  return `
    query GetParkingLotByPhone($phone: String!) {
      getParkingLotByPhone(phone: $phone) {
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

export function parkingLotGetByUuidDoc() {
  return `
    query GetParkingLotByUuid($parkingLotUuid: String!) {
      getParkingLotByUuid(uuid: $parkingLotUuid) {
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
    query GetParkingLotImages($page: Int! = 0, $size: Int! = 10, $keyword: String!) {
      getParkingLotImageKeysByParkingLot(page: $page, size: $size, id: $keyword) 
    }
  `;
}
