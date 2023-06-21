export function routeGetDoc() {
  return `
  query GetRoute($keyword: String!) {
    getRoute(id: $keyword) {
      routeUuid
      name
      description
      status
      points
      createdAt
      updatedAt
    }
  }
  `;
}

export function routeGetAllDoc() {
  return `
  query GetRoutes($page: Int = 0, $size: Int = 10, $keyword: String = "", $sortField: String = "name", $sortBy: Int = 1) {
    getRoutes(page: $page, size: $size, keyword: $keyword, sortField: $sortField, sortBy: $sortBy) {
      content {
        routeUuid
        name
        description
        status
        points
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
