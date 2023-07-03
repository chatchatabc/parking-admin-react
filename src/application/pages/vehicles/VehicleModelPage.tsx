import { useDispatch } from "react-redux";
import MyButton from "../../components/common/MyButton";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import VehicleModelTable from "../../components/tables/VehicleModelTable";

function VehicleModelPage() {
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Vehicle Models Table</h2>
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Add Vehicle Model",
                  content: "vehicleModelCreate",
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

export default VehicleModelPage;
