import { useDispatch } from "react-redux";
import MyButton from "../../components/common/MyButton";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import VehicleBrandTable from "../../components/tables/VehicleBrandTable";

function VehicleBrandPage() {
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Vehicle Brands Table</h2>
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Add Vehicle Brand",
                  content: "vehicleBrandCreate",
                  mode: "create",
                })
              );
            }}
          >
            Add Vehicle Brand +
          </MyButton>
        </header>
        <section>
          <VehicleBrandTable />
        </section>
      </section>
    </div>
  );
}

export default VehicleBrandPage;
