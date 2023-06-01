import React from "react";
import { Pagination, Table, message } from "antd";
import { formRefHandler } from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parkingAllGet } from "../../../domain/services/parkingService";
import { Parking } from "../../../domain/models/ParkingModel";
import { userGetByParkingLotUuid } from "../../../domain/services/userService";
import { User } from "../../../domain/models/UserModel";

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
  const [data, setData] = React.useState<
    (Parking & { owner: User; key: string })[]
  >([]);

  function handleNavigation(page: number) {
    setPagination({ ...pagination, current: page - 1 });
  }

  const columns = [
    {
      title: "Parking Name",
      key: "name",
      render: (record: Parking & { owner: User }) => {
        const owner = record.owner;

        if (owner.username || owner.phone) {
          return (
            <button
              className="text-blue-500 underline hover:no-underline"
              onClick={() => {
                navigate(
                  owner.username
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
      render: (record: Parking & { owner: User }) => {
        const owner = record.owner;

        return (
          <p>{owner.username ?? owner.phone ?? owner.email ?? "Unknown"}</p>
        );
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
      render: (record: Parking) => {
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
      // Fetch parking list
      const query = await parkingAllGet({
        page: pagination.current,
        size: pagination.pageSize,
        keyword: keyword,
      });

      if (query.errors) {
        message.error("Failed to fetch parking list.");
      } else {
        // Fetch additional info
        const queryAdditionalInfo = query.content.map(
          async (parking, index) => {
            // Fetch owner
            const queryOwner = await userGetByParkingLotUuid(
              parking.parkingLotUuid ?? ""
            );

            const data = {
              ...parking,
              key: `parking-list-${index}`,
              owner: {},
            };

            if (queryOwner.errors) {
              message.error("Failed to fetch parking owner.");
              return data;
            }

            data.owner = queryOwner.data;
            return data;
          }
        );

        // Wait for all additional info to be fetched
        const processedData = await Promise.all(queryAdditionalInfo);

        // Set data
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
