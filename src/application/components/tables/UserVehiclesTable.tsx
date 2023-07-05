import DynamicTable from "./DynamicTable";
import { ColumnsType } from "antd/es/table";
import { vehicleGetAllByUser } from "../../../domain/services/vehicleService";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { CommonVariables } from "../../../domain/models/CommonModel";
import { useNavigate } from "react-router-dom";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
  userUuid: string;
};

function UserVehiclesTable({
  showPagination,
  localPagination,
  userUuid,
}: Props) {
  const navigate = useNavigate();

  const columns: ColumnsType<Vehicle> = [
    {
      width: "50%",
      title: "Plate Number",
      key: "plateNumber",
      render: (record: Vehicle) => {
        return (
          <button
            className="underline hover:no-underline"
            onClick={() => {
              navigate(`/vehicles/${record.plateNumber}`);
            }}
          >
            {record.plateNumber}
          </button>
        );
      },
    },
    {
      width: "50%",
      title: "Model",
      key: "car type",
      render: (record: Vehicle) => {
        if (record.model) {
          return <span>{record.model?.name}</span>;
        }
        return <span>Unknown</span>;
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      getData={(variables) => {
        variables.id = userUuid;
        return vehicleGetAllByUser(
          variables as CommonVariables & { id: string }
        );
      }}
    />
  );
}

export default UserVehiclesTable;
