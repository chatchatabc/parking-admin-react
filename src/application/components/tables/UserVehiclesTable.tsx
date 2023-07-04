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
        return vehicleGetAllByUserUuid({ ...variables, userUuid });
      }}
    />
  );
}

export default UserVehiclesTable;
