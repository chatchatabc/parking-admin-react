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
  const carTypes: Record<number, string> = {
    0: "Motorcycle",
    1: "Car",
  };

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
        return <p>{carTypes[record.type ?? 1]}</p>;
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
