import { useNavigate } from "react-router-dom";
import UsersTable from "../components/tables/UsersTable";
import MyButton from "../components/common/MyButton";
import ParkingLotDonut from "../components/donut-charts/ParkingLotDonut";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap p-2 bg-bg1">
      <section className="p-2 w-1/3">
        <section className="w-full bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Parking Lots Verified</h2>
            <MyButton
              onClick={() => {
                navigate("/parking-lots");
              }}
            >
              Open
            </MyButton>
          </header>

          <section>
            <ParkingLotDonut />
          </section>
        </section>
      </section>

      <section className="p-2 w-1/3">
        <section className="w-full bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Users Verified</h2>
            <MyButton
              onClick={() => {
                navigate("/users");
              }}
            >
              Open
            </MyButton>
          </header>

          <section>
            <ParkingLotDonut />
          </section>
        </section>
      </section>

      <section className="p-2 w-1/3">
        <section className="w-full bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Vehicles Verified</h2>
            <MyButton
              onClick={() => {
                navigate("/vehicles");
              }}
            >
              Open
            </MyButton>
          </header>

          <section>
            <ParkingLotDonut />
          </section>
        </section>
      </section>

      {/* <section className="p-2 w-full">
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
      </section> */}

      <section className="p-2 w-full">
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
      </section>
    </div>
  );
}

export default HomePage;
