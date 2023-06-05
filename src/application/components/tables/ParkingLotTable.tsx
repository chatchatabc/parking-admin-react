import DynamicTable from "./DynamicTable";
import { useNavigate } from "react-router-dom";
import { Parking } from "../../../domain/models/ParkingModel";
import { User } from "../../../domain/models/UserModel";
import {
  parkingLotGetAllWithOwners,
  parkingLotVerify,
} from "../../../domain/services/parkingService";
import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { utilGenerateRandomNumber } from "../../../domain/utils/commonUtils";

type Props = {
  showPagination?: boolean;
};

function ParkingTable({ showPagination }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    {
      title: "Verified",
      key: "verified",
      render: (record: Parking) => {
        const date = new Date(record.verifiedAt ?? "");
        return (
          <div>
            {record.verifiedAt ? (
              <p className="text-green-500">
                {new Intl.DateTimeFormat("en", {
                  dateStyle: "medium",
                  timeStyle: "medium",
                }).format(date)}
              </p>
            ) : (
              <div className="flex gap-4">
                <p className="text-red-500">Not verified</p>
                <button
                  onClick={() => {
                    Modal.confirm({
                      title: `Proceed in verifying "${record.name}"?`,
                      okButtonProps: {
                        className: "bg-c1",
                      },
                      maskClosable: true,
                      closable: true,
                      onOk: async () => {
                        const response = await parkingLotVerify(
                          record.parkingLotUuid ?? ""
                        );

                        if (response.errors) {
                          message.error("Failed to verify parking lot");
                        } else {
                          message.success("Successfully verified parking lot");

                          dispatch(
                            globalStateUpdate({
                              reset: utilGenerateRandomNumber(),
                            })
                          );
                        }
                      },
                    });
                  }}
                  className="text-xs text-blue-500 underline"
                >
                  (Click to verify)
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      title={"Parking Table"}
      columns={columns}
      getData={parkingLotGetAllWithOwners}
    />
  );
}

export default ParkingTable;
