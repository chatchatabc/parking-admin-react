export function parkingLotGetAllDoc() {
  return `
    query GetParkingLots($size: Int! = 10, $page: Int! = 0, $keyword: String) {
      getParkingLots(size: $size, page: $page, keyword: $keyword) {
        content {
          parkingLotUuid
          availableSlots
          address
          capacity
          name

          rate {
            id
          }
        }

        pageInfo {
          size
          totalElements
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
        rate{
          createdAt
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
        rate{
          createdAt
        }
      }
    }
  `;
}
