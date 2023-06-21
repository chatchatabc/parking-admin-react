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
