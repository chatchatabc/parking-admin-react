import React from "react";
import ErrorMessageComp from "../../components/ErrorMessageComp";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Pagination, Table, TableColumnsType } from "antd";
import { formRefHandler } from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { parkingGet } from "../../../domain/service/parkingService";
import { useNavigate } from "react-router-dom";

function ParkingPage() {
  const [pagination, setPagination] = React.useState({
    current: 0,
    total: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, data } = parkingGet();

  function handleNavigation(page: number) {
    setPagination({ ...pagination, current: page - 1 });
  }

  const dataSource = data?.content.map((parking: Record<string, any>) => {
    return {
      ...parking,
      key: `parking-list-${parking.id}`,
    };
  });

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
    if (data) {
      setPagination({
        ...pagination,
        total: data.pageInfo.totalElements,
      });
    }
  }, [data]);

  return (
    <div className="px-4 w-full relative">
      {error && <ErrorMessageComp />}
      <section className="py-2">
        <Breadcrumbs />
      </section>
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
                  content: "parking",
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
            dataSource={dataSource}
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
