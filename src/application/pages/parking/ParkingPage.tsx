import React from "react";
import { Pagination } from "antd";
import { formRefHandler } from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { useSearchParams } from "react-router-dom";
import { Parking } from "../../../domain/models/ParkingModel";
import { User } from "../../../domain/models/UserModel";
import ParkingTable from "../../components/tables/ParkingTable";

function ParkingPage() {
  // React Router
  const dispatch = useDispatch();
  const [searchParams, _] = useSearchParams();

  // Saved States
  const globalState = useSelector((state: any) => state.globalState);
  const keyword = searchParams.get("keyword") ?? undefined;
  const page = searchParams.get("page") ?? 1;
  const pageSize = searchParams.get("pageSize") ?? 10;

  // Local States
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    current: Number(page) - 1,
    pageSize: Number(pageSize),
    total: 0,
  });
  const [data, setData] = React.useState<
    (Parking & { owner: User; key: string })[]
  >([]);

  function handleNavigation(page: number) {
    setPagination({ ...pagination, current: page - 1 });
  }

  return (
    <div className="px-4 pb-4 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg4 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Parking Lots</h2>
        </header>

        {/* Table Actions */}
        <section className="flex gap-2">
          <Pagination
            current={pagination.current + 1}
            total={pagination.total}
            onChange={handleNavigation}
          />

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
        </section>
        <section>
          <ParkingTable />
        </section>
      </section>
    </div>
  );
}

export default ParkingPage;
