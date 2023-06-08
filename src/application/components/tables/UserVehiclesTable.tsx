import { UserBan } from "../../../domain/models/UserModel";
import DynamicTable from "./DynamicTable";
import { ColumnsType } from "antd/es/table";
import { Popover } from "antd";
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
      title: "Car Name",
      key: "name",
      dataIndex: "name",
    },
    {
      width: "50%",
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
      title="users-table"
      getData={(variables) => {
        return vehicleGetAllByUserUuid({ ...variables, userUuid });
      }}
    />
  );
}

export default UserVehiclesTable;
