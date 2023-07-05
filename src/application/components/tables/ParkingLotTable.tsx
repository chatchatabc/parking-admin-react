import DynamicTable from "./DynamicTable";
import { useNavigate } from "react-router-dom";
import { ParkingLot } from "../../../domain/models/ParkingLotModel";
import { parkingLotGetAllWithOwners } from "../../../domain/services/parkingLotService";
import { ColumnsType } from "antd/es/table";
import { Popover } from "antd";
import CheckIconAsset from "../../assets/CheckIconAsset";
import XIconAsset from "../../assets/XIconAsset";
import ImageComp from "../ImageComp";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
  variables?: {
    verified?: number;
    sortField?: string;
    sortBy?: number;
  };
};

function ParkingTable({ showPagination, localPagination, variables }: Props) {
  const navigate = useNavigate();

  const columns: ColumnsType<Record<string, any>> = [
    {
      title: "Parking Name",
      key: "name",
      render: (record: ParkingLot) => {
        const owner = record.owner;
        const date = new Date(record.verifiedAt ?? "");

        if (owner?.username || owner?.phone) {
          return (
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 overflow-hidden border border-c1 rounded-full">
                <ImageComp
                  className="w-full h-full object-cover"
                  src={`/api/parking-lot/get-featured-image/${record.parkingLotUuid}`}
                  alt={record.name ?? "Unknown"}
                />
              </div>
              <button
                className="text-start underline hover:no-underline"
                onClick={() => {
                  navigate(`/parking-lots/${owner?.username ?? owner?.phone}`);
                }}
              >
                {record.name}
              </button>
              <Popover
                color={record.verifiedAt ? "green" : "red"}
                content={
                  <p className="text-white text-xs">
                    {record.verifiedAt ? (
                      <span>
                        Verified at <br />
                        {new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(date)}
                      </span>
                    ) : (
                      "Not yet verified"
                    )}
                  </p>
                }
              >
                {record.verifiedAt ? (
                  <div className="w-5 h-5 text-green-500 self-start">
                    <CheckIconAsset />
                  </div>
                ) : (
                  <div className="w-5 h-5 text-red-500 self-start">
                    <XIconAsset />
                  </div>
                )}
              </Popover>
            </div>
          );
        }
        return <p>Unknown</p>;
      },
    },
    {
      title: "Owner",
      key: "owner",
      render: (record: ParkingLot) => {
        const owner = record.owner;

        if (owner?.username || owner?.phone) {
          return (
            <button
              className="underline hover:no-underline"
              onClick={() => {
                navigate(`/users/${owner.username ?? owner.phone}`);
              }}
            >
              {owner.username ?? owner.phone}
            </button>
          );
        }

        return <p>{owner?.email ?? "Unknown"}</p>;
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
      columns={columns}
      getData={(commonVariables) => {
        return parkingLotGetAllWithOwners({ ...commonVariables, ...variables });
      }}
    />
  );
}

export default ParkingTable;
