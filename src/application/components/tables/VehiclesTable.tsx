import DynamicTable from "./DynamicTable";
import { vehicleGetAll } from "../../../domain/services/vehicleService";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { ColumnsType } from "antd/es/table";
import { Popover } from "antd";
import CheckIconAsset from "../../assets/CheckIconAsset";
import XIconAsset from "../../assets/XIconAsset";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { useNavigate } from "react-router-dom";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function VehiclesTable({ showPagination, localPagination }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns: ColumnsType<Vehicle> = [
    {
      title: "Plate Number",
      key: "plateNumber",
      render: (record: Vehicle) => {
        const date = new Date(record.verifiedAt ?? "");
        return (
          <div className="flex items-center gap-1">
            <button
              className="underline hover:no-underline"
              onClick={() => {
                navigate(`/vehicles/${record.plateNumber}`);
              }}
            >
              {record.plateNumber}
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
      },
    },
    {
      title: "Vehicle Details",
      render: (record: Vehicle) => {
        return (
          <p>
            {record.model?.type?.name ?? "No Type"} -{" "}
            {record.model?.brand?.name ?? "No Brand"} -{" "}
            {record.model?.name ?? "No Model"} - {record.year ?? "No Year"} -
            {record.color ?? "No Color"}
          </p>
        );
      },
    },
    {
      title: "Owner",
      key: "owner",
      render: (record: Vehicle) => {
        return <p>{record.owner?.username}</p>;
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Vehicle) => {
        return (
          <div className="flex items-center gap-2">
            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    title: "Edit Vehicle",
                    mode: "update",
                    content: "vehicle",
                    data: { ...record, updating: true },
                    show: true,
                  })
                );
              }}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      getData={vehicleGetAll}
    />
  );
}

export default VehiclesTable;
