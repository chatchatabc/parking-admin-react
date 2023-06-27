import DynamicTable from "./DynamicTable";
import { ColumnsType } from "antd/es/table";
import { vehicleGetAllByUserUuid } from "../../../domain/services/vehicleService";
import { Vehicle } from "../../../domain/models/VehicleModel";

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
  const columns: ColumnsType<Vehicle> = [
    {
      width: "50%",
      title: "Plate Number",
      key: "plateNumber",
      dataIndex: "plateNumber",
    },
    {
      width: "50%",
      title: "Car Type",
      key: "car type",
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
      title="users-table"
      getData={(variables) => {
        return vehicleGetAllByUserUuid({ ...variables, userUuid });
      }}
    />
  );
}

export default UserVehiclesTable;
