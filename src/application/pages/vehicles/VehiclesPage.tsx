import VehiclesTable from "../../components/tables/VehiclesTable";
import MyButton from "../../components/common/MyButton";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

function VehiclesPage() {
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Vehicles Table</h2>
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Create User",
                  content: "userCreate",
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
    </div>
  );
}

export default VehiclesPage;
