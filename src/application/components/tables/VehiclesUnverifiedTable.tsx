import DynamicTable from "./DynamicTable";
import { vehicleGetAll } from "../../../domain/services/vehicleService";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function VehiclesUnverifiedTable({ showPagination, localPagination }: Props) {
  const navigate = useNavigate();

  const columns: ColumnsType<Vehicle> = [
    {
      width: "50%",
      title: "Plate Number",
      key: "plateNumber",
      render: (record: Vehicle) => {
        return (
          <button
            onClick={() => {
              navigate("/vehicles/" + record.plateNumber);
            }}
            className="underline hover:no-underline"
          >
            {record.plateNumber}
          </button>
        );
      },
    },
    {
      width: "50%",
      title: "Vehicle Type",
      key: "type",
      render: (record: Vehicle) => {
        if (record.model?.type) {
          return <span>{record.model?.type?.name}</span>;
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
      getData={vehicleGetAll}
    />
  );
}

export default VehiclesUnverifiedTable;
