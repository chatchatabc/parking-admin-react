export function routeGetDoc() {
  return `
  query GetRoute($id: String!) {
    getRoute(id: $id) {
      id
      routeUuid
      slug
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
        id
        routeUuid
        slug
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

export function routeGetNodesDoc() {
  return `
  query GetRouteNodes($size: Int = 10, $page: Int = 0) {
    getRouteNodes(size: $size, page: $page) {
      content {
        id
        latitude
        longitude
        poi
        createdAt
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

export function routeGetNodesAndEdgesDoc() {
  return `
  query GetRouteNodesAndEdges($id: String!) {
    getRouteNodesAndEdges(id: $id) {
      nodes {
        id
        latitude
        longitude
        poi
        createdAt
      }
      edges {
        id
        routeId
        nodeFrom
        nodeTo
        distance
        createdAt
      }
    }
  }
  `;
}
