import { Button, Table, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { parkingGetAllByOwner } from "../../../domain/services/parkingService";
import React from "react";

interface Props {
  username?: string;
  phone?: string;
  userId: string;
}

function ProfileParking({ username, phone, userId }: Props) {
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, _] = React.useState({
    current: 0,
    pageSize: 10,
    total: 0,
  });

  const navigate = useNavigate();

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

  React.useEffect(() => {
    async function fetchData() {
      const response = await parkingGetAllByOwner(
        pagination.current,
        pagination.pageSize,
        userId
      );

      if (response.errors) {
        message.error("Failed to fetch parking lots");
      } else {
        setData(response.data);
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Parking Lots</h1>
        <Button
          onClick={() => {
            navigate(`/parking?keyword=${username ?? phone}`);
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
