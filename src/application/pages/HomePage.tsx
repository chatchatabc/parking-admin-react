import { useNavigate } from "react-router-dom";
import ParkingTable from "../components/tables/ParkingLotTable";
import UsersTable from "../components/tables/UsersTable";
import MyButton from "../components/common/MyButton";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 p-4 bg-bg1">
      <section className="w-full bg-bg2 p-4 rounded-lg">
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Parking Lots Table</h2>
          <MyButton
            onClick={() => {
              navigate("/parking-lots");
            }}
          >
            Open
          </MyButton>
        </header>
        <section className="mt-2">
          <ParkingTable showPagination={false} />
        </section>
      </section>

      <section className="w-full bg-bg2 p-4 rounded-lg">
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Users Table</h2>
          <MyButton
            onClick={() => {
              navigate("/users");
            }}
          >
            Open
          </MyButton>
        </header>
        <section className="mt-2">
          <UsersTable showPagination={false} />
        </section>
      </section>
    </div>
  );
}

export default HomePage;
