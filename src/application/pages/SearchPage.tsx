import UsersTable from "../components/tables/UsersTable";
import ParkingTable from "../components/tables/ParkingLotTable";

function SearchPage() {
  return (
    <div className="px-4 pb-4 space-y-4 w-full relative">
      <UsersTable />
      <ParkingTable />
    </div>
  );
}

export default SearchPage;
