import { NavLink } from "react-router-dom";
import ParkingTable from "../components/tables/ParkingLotTable";
import UsersTable from "../components/tables/UsersTable";

function HomePage() {
  return (
    <div className="space-y-8 px-4 pb-4 [&>*]:p-2">
      <section className="w-full bg-bg1 rounded-lg">
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Parking Lots Table</h2>
          <NavLink
            className="bg-c1 ml-auto text-white px-4 py-1 rounded-md transition hover:bg-blue-600"
            to={"/parking-lots"}
          >
            Open
          </NavLink>
        </header>
        <section className="mt-2">
          <ParkingTable showPagination={false} />
        </section>
      </section>

      <section className="w-full bg-bg1 rounded-lg">
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Users Table</h2>
          <NavLink
            className="bg-c1 ml-auto text-white px-4 py-1 rounded-md transition hover:bg-blue-600"
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
