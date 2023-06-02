import DynamicTable from "./DynamicTable";
import { useNavigate } from "react-router-dom";
import { Parking } from "../../../domain/models/ParkingModel";
import { User } from "../../../domain/models/UserModel";
import { parkingLotGetAllWithOwners } from "../../../domain/services/parkingService";

function ParkingTable() {
  const navigate = useNavigate();

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
                  `/parking-lots/${
                    owner.username
                      ? `u-${record.owner.username}`
                      : `p-${record.owner.phone}`
                  }`
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

  return (
    <DynamicTable
      title={"Parking Table"}
      columns={columns}
      getData={parkingLotGetAllWithOwners}
    />
  );
}

export default ParkingTable;
