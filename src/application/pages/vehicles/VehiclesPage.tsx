import VehiclesTable from "../../components/tables/VehiclesTable";
import MyButton from "../../components/common/MyButton";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import VehicleModelTable from "../../components/tables/VehicleModelTable";

function VehiclesPage() {
  const dispatch = useDispatch();

  return (
    <div className="p-4 space-y-4 bg-bg1 w-full relative">
      {/* Vehicles Table */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Vehicles</h2>
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Add Vehicle",
                  content: "vehicle",
                  mode: "create",
                })
              );
            }}
          >
            Add Vehicle +
          </MyButton>
        </header>

        <section>
          <VehiclesTable />
        </section>
      </section>

      {/* Vehicle Models Table */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Vehicle Models</h2>
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Add Model",
                  content: "vehicleModel",
                  mode: "create",
                })
              );
            }}
          >
            Add Vehicle Model +
          </MyButton>
        </header>

        <section>
          <VehicleModelTable />
        </section>
      </section>
    </div>
  );
}

export default VehiclesPage;
