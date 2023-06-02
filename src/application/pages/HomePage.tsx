import { NavLink } from "react-router-dom";
import ParkingTable from "../components/tables/ParkingLotTable";
import UsersTable from "../components/tables/UsersTable";

function HomePage() {
  return (
    <div className="space-y-4 px-4 pb-4 [&>*]:p-2">
      <section className="w-full bg-bg1 rounded-lg border-2 border-primary">
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Parking Lots Table</h2>
          <NavLink
            className="bg-primary ml-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary"
            to={"/parking"}
          >
            Open
          </NavLink>
        </header>
        <section className="mt-2">
          <ParkingTable showPagination={false} />
        </section>
      </section>

      <section className="w-full bg-bg1 rounded-lg border-2 border-primary">
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Users Table</h2>
          <NavLink
            className="bg-primary ml-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary"
            to={"/users"}
          >
            Open
          </NavLink>
        </header>
        <section className="mt-2">
          <UsersTable showPagination={false} />
        </section>
      </section>
    </div>
  );
}

export default HomePage;
