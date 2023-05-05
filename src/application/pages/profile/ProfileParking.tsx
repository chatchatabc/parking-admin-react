import { Button, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  username?: string;
  phone?: string;
}

function ProfileParking({ username, phone }: Props) {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Address",
      key: "address",
    },
    {
      title: "Slots",
      key: "slots",
    },
  ];

  console.log(username, phone);

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Parking Lots</h1>
        <Button
          onClick={() => {
            navigate(
              `/parking${
                username
                  ? `?username=${username}`
                  : phone
                  ? `?phone=${phone}`
                  : ""
              }`
            );
          }}
          className="bg-primary text-white"
        >
          Open
        </Button>
      </header>
      <section className="mt-2">
        <Table columns={columns} />
      </section>
    </div>
  );
}

export default ProfileParking;
