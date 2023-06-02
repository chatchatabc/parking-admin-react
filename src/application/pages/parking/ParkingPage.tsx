import { formRefHandler } from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import ParkingTable from "../../components/tables/ParkingTable";

function ParkingPage() {
  // React Router
  const dispatch = useDispatch();

  return (
    <div className="px-4 pb-4 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg4 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Parking Lots</h2>
          <button
            onClick={() => {
              formRefHandler.resetFields();
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Add Parking Lot",
                  content: "parkingCreate",
                  mode: "create",
                })
              );
            }}
            className="bg-primary ml-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary"
          >
            Add Parking Lot +
          </button>
        </header>

        <section>
          <ParkingTable />
        </section>
      </section>
    </div>
  );
}

export default ParkingPage;
