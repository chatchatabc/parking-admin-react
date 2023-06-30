import DynamicTable from "./DynamicTable";
import { vehicleGetAllWithTypes } from "../../../domain/services/vehicleService";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { ColumnsType } from "antd/es/table";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function VehiclesUnverifiedTable({ showPagination, localPagination }: Props) {
  const columns: ColumnsType<Vehicle> = [
    {
      width: "50%",
      title: "Plate Number",
      key: "plateNumber",
      dataIndex: "plateNumber",
    },
    {
      width: "50%",
      title: "Vehicle Type",
      key: "type",
      render: (record: Vehicle) => {
        if (record.type) {
          return <span>{record.type?.name}</span>;
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
      title="vehicle-table"
      getData={vehicleGetAllWithTypes}
    />
  );
}

export default VehiclesUnverifiedTable;
