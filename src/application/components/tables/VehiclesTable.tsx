import DynamicTable from "./DynamicTable";
import { vehicleGetAll } from "../../../domain/services/vehicleService";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { ColumnsType } from "antd/es/table";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function VehiclesTable({ showPagination, localPagination }: Props) {
  const columns: ColumnsType<Vehicle> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Vehicle Type",
      key: "type",
      render: (record: Vehicle) => {
        if (record.type) {
          return <span>{record.type?.name}</span>;
        }
        return <span>Unknown</span>;
      },
    },
    {
      title: "Plate Number",
      key: "plateNumber",
      dataIndex: "plateNumber",
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      title="vehicle-table"
      getData={vehicleGetAll}
    />
  );
}

export default VehiclesTable;
