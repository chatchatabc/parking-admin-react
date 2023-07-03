import { useDispatch } from "react-redux";
import MyButton from "../../components/common/MyButton";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import VehicleTypeTable from "../../components/tables/VehicleTypeTable";

function VehicleTypePage() {
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Vehicle Types Table</h2>
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Add Vehicle Type",
                  content: "vehicleTypeCreate",
                  mode: "create",
                })
              );
            }}
          >
            Add Vehicle Type +
          </MyButton>
        </header>
        <section>
          <VehicleTypeTable />
        </section>
      </section>
    </div>
  );
}

export default VehicleTypePage;
