import { Button, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { parkingGetAllByOwner } from "../../../domain/service/parkingService";
import React from "react";

interface Props {
  username?: string;
  phone?: string;
  userId: string;
}

function ProfileParking({ username, phone, userId }: Props) {
  const [pagination, setPagination] = React.useState({
    current: 0,
    pageSize: 10,
    total: 0,
  });

  const navigate = useNavigate();

  const { data, loading } = parkingGetAllByOwner(
    pagination.current,
    pagination.pageSize,
    userId
  );

  const columns = [
    {
      title: "Address",
      key: "address",
      render: (record: Record<string, any>) => {
        return (
          <Link
            className="text-blue-500 underline hover:no-underline"
            to={`/parking/${record.id}`}
          >
            {record.address}
          </Link>
        );
      },
    },
    {
      title: "Slots",
      key: "slots",
      render: (record: Record<string, any>) => {
        return (
          <p>
            {record.availableSlots}/{record.capacity}
          </p>
        );
      },
    },
  ];

  const dataSource = data?.content.map((parking: Record<string, any>) => ({
    key: parking.id,
    ...parking,
  }));

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Parking Lots</h1>
        <Button
          onClick={() => {
            navigate(`/parking?keywords=${username}`);
          }}
          className="bg-primary text-white"
        >
          Open
        </Button>
      </header>
      <section className="mt-2">
        <Table dataSource={dataSource} loading={loading} columns={columns} />
      </section>
    </div>
  );
}

export default ProfileParking;
