export function dashboardGetPieGraphDoc() {
  return `
    query GetDashboardPieGraph {
      getDashboardPieGraph {
        parkingLotVerifiedCount
        parkingLotUnverifiedCount
        userVerifiedCount
        userUnverifiedCount
        vehicleVerifiedCount
        vehicleUnverifiedCount
      }
    }
  `;
}
