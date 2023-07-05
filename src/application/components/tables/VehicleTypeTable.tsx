import { useDispatch } from "react-redux";
import { VehicleType } from "../../../domain/models/VehicleModel";
import DynamicTable from "./DynamicTable";
import { ColumnsType } from "antd/es/table";
import {
  vehicleGetAllType,
  vehicleGetAllTypeOptions,
} from "../../../domain/services/vehicleService";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function VehicleTypeTable({ showPagination, localPagination }: Props) {
  const dispatch = useDispatch();

  const columns: ColumnsType<VehicleType> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      render: (record: VehicleType) => {
        const options = vehicleGetAllTypeOptions();
        return options.find((option) => option.value === record.status)?.label;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: VehicleType) => {
        return (
          <div>
            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    show: true,
                    title: "Edit Type",
                    content: "vehicleType",
                    mode: "update",
                    data: record,
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
      getData={vehicleGetAllType}
    />
  );
}

export default VehicleTypeTable;
