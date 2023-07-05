export function jeepneyGetAllDoc() {
  return `
  query GetJeepneys($page: Int = 0, $size: Int = 10, $keyword: String, $sortField: String, $sortBy: Int) {
    getJeepneys(page: $page, size: $size, keyword: $keyword, sortField: $sortField, sortBy: $sortBy) {
      content {
        jeepneyUuid
        name
        plateNumber
        capacity
        status
        createdAt
        routeUuid
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

export function jeepneyGetAllByRouteDoc() {
  return `
  query GetJeepneysByRoute($page: Int = 0, $size: Int = 10, $id: String!) {
    getJeepneysByRoute(page: $page, size: $size, id: $id) {
      content {
        jeepneyUuid
        name
        plateNumber
        capacity
        status
        createdAt
        routeUuid
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
