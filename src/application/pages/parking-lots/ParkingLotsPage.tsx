import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import ParkingTable from "../../components/tables/ParkingLotTable";
import MyButton from "../../components/common/MyButton";
import { Select } from "antd";
import React from "react";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { utilGenerateRandomNumber } from "../../../domain/utils/commonUtils";
import { parkingLotGetFilters } from "../../../domain/services/parkingLotService";

function ParkingLotsPage() {
  // Local States
  const [sort, setSort] = React.useState("name,1");

  // React Router
  const dispatch = useDispatch();

  const options = parkingLotGetFilters();

  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Parking Lots</h2>
          <Select
            suffixIcon={
              <svg
                className="w-6 h-6 text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"
                />
              </svg>
            }
            onChange={(value) => {
              setSort(value);
              dispatch(
                globalStateUpdate({
                  reset: utilGenerateRandomNumber(),
                })
              );
            }}
            className="w-48 ml-auto mr-2"
            value={sort}
            options={options}
          />
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Add Parking Lot",
                  content: "parkingLotCreate",
                  mode: "create",
                })
              );
            }}
          >
            Add Parking Lot +
          </MyButton>
        </header>

        <section>
          <ParkingTable
            variables={{
              sortField: sort.split(",")[0],
              sortBy: Number(sort.split(",")[1]),
            }}
          />
        </section>
      </section>
    </div>
  );
}

export default ParkingLotsPage;
