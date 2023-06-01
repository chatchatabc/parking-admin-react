import React from "react";
import { Pagination, Table, TableColumnsType, message } from "antd";
import { formRefHandler } from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { parkingAllGet } from "../../../domain/services/parkingService";
import { Parking } from "../../../domain/models/ParkingModel";

function ParkingPage() {
  // React Router
  const navigate = useNavigate();
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
  const [data, setData] = React.useState<Parking[]>([]);

  function handleNavigation(page: number) {
    setPagination({ ...pagination, current: page - 1 });
  }

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: "Parking Name",
      key: "name",
      render: (record) => {
        if (record.owner.username || record.owner.phone) {
          return (
            <button
              className="text-blue-500 underline hover:no-underline"
              onClick={() => {
                navigate(
                  record.username
                    ? `u-${record.owner.username}`
                    : `p-${record.owner.phone}`
                );
              }}
            >
              {record.name}
            </button>
          );
        }
        return <p>Unknown</p>;
      },
    },
    {
      title: "Owner",
      key: "owner",
      render: (record) => {
        if (record.owner.username || record.owner.phone) {
          return (
            <button
              className="text-blue-500 underline hover:no-underline"
              onClick={() => {
                navigate(
                  record.username
                    ? `/users/u-${record.owner.username}`
                    : `/users/p-${record.owner.phone}`
                );
              }}
            >
              {record.owner.username ?? record.owner.phone}
            </button>
          );
        }
        return <p>Unknown</p>;
      },
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Slots",
      key: "slots",
      render: (record) => {
        return (
          <div>
            {record.availableSlots}/{record.capacity}
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    async function fetchData() {
      const query = await parkingAllGet({
        page: pagination.current,
        size: pagination.pageSize,
        keyword: keyword,
      });

      if (query.errors) {
        message.error("Failed to fetch parking list.");
      } else {
        const processedData = query.content.map((user: any, index: number) => {
          return {
            ...user,
            key: `parking-list-${index}`,
          };
        });
        setData(processedData);
        setPagination((prev) => ({
          ...prev,
          total: query.pageInfo.totalElements,
        }));
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);

  React.useEffect(() => {
    if (globalState.reset) {
      setLoading(true);
      dispatch(globalStateUpdate({ reset: false }));
    }
  }, [globalState.reset]);

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
          <Table
            loading={loading}
            className={`my-table`}
            dataSource={data}
            columns={columns}
            pagination={{
              ...pagination,
              current: pagination.current + 1,
              onChange: handleNavigation,
            }}
          />
        </section>
      </section>
    </div>
  );
}

export default ParkingPage;
