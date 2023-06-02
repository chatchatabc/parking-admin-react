import UsersTable from "../components/tables/UsersTable";
import ParkingTable from "../components/tables/ParkingLotTable";

function SearchPage() {
  return (
    <div className="px-4 pb-4 space-y-4 w-full relative">
      <section className="p-4 border-2 rounded-lg bg-bg1 border-primary">
        <header>
          <h2 className="text-xl font-bold">Users Table</h2>
        </header>
        <section className="mt-2">
          <UsersTable showPagination={false} />
        </section>
      </section>

      <section className="p-4 border-2 rounded-lg bg-bg1 border-primary">
        <header>
          <h2 className="text-xl font-bold">Parking Lots Table</h2>
        </header>
        <section className="mt-2">
          <ParkingTable showPagination={false} />
        </section>
      </section>
    </div>
  );
}

export default SearchPage;
