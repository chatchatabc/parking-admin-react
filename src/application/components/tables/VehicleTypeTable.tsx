import { useDispatch } from "react-redux";
import { VehicleType } from "../../../domain/models/VehicleModel";
import DynamicTable from "./DynamicTable";
import { ColumnsType } from "antd/es/table";
import {
  vehicleGetAllType,
  vehicleGetAllTypeOptions,
} from "../../../domain/services/vehicleService";
import MyButton from "../common/MyButton";
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
            <MyButton
              onClick={() => {
                console.log(record);
                dispatch(
                  drawerFormUpdate({
                    show: true,
                    title: "Edit",
                    content: "vehicleTypeUpdate",
                    mode: "update",
                    data: record,
                  })
                );
              }}
            >
              Edit
            </MyButton>
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
      caption="vehicle-type-table"
      getData={vehicleGetAllType}
    />
  );
}

export default VehicleTypeTable;
