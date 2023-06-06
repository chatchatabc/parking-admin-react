import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import ParkingTable from "../../components/tables/ParkingLotTable";
import MyButton from "../../components/common/MyButton";

function ParkingLotsPage() {
  // React Router
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Parking Lots</h2>
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Add Parking Lot",
                  content: "parkingCreate",
                  mode: "create",
                })
              );
            }}
          >
            Add Parking Lot +
          </MyButton>
        </header>

        <section>
          <ParkingTable />
        </section>
      </section>
    </div>
  );
}

export default ParkingLotsPage;
