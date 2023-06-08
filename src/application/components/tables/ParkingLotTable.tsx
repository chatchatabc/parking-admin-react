import DynamicTable from "./DynamicTable";
import { useNavigate } from "react-router-dom";
import { Parking } from "../../../domain/models/ParkingModel";
import { User } from "../../../domain/models/UserModel";
import { parkingLotGetAllWithOwners } from "../../../domain/services/parkingService";
import { ColumnsType } from "antd/es/table";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
  variables?: {
    verified?: number;
  };
};

function ParkingTable({ showPagination, localPagination, variables }: Props) {
  const navigate = useNavigate();

  const columns: ColumnsType<Record<string, any>> = [
    {
      title: "Parking Name",
      key: "name",
      render: (record: Parking & { owner: User }) => {
        const owner = record.owner;

        if (owner.username || owner.phone) {
          return (
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 overflow-hidden border border-c1 rounded-full">
                <img
                  className="w-full h-full object-cover"
                  src={`/api/parking-lot/get-featured-image/${record.parkingLotUuid}`}
                  alt={record.name ?? "Unknown"}
                />
              </div>
              <button
                className="text-start underline hover:no-underline"
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
            </div>
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

        if (owner.username || owner.phone) {
          return (
            <button
              className="underline hover:no-underline"
              onClick={() => {
                navigate(
                  `/users/${
                    owner.username ? `u-${owner.username}` : `p-${owner.phone}`
                  }`
                );
              }}
            >
              {owner.username ?? owner.phone}
            </button>
          );
        }

        return <p>{owner.email ?? "Unknown"}</p>;
      },
    },
    {
      title: "Verified",
      key: "verified",
      render: (record: Parking) => {
        return (
          <div>
            {record.verifiedAt ? (
              <p className="text-green-500">TRUE</p>
            ) : (
              <p className="text-red-500">FALSE</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Address",
      key: "address",
      render: (record) => {
        return (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${record.address}`}
            target="_blank"
            className="underline hover:no-underline"
          >
            {record.address}
          </a>
        );
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      title={"Parking Table"}
      columns={columns}
      getData={(commonVariables) => {
        return parkingLotGetAllWithOwners({ ...commonVariables, ...variables });
      }}
    />
  );
}

export default ParkingTable;
