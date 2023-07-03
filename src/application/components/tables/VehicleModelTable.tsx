import { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import { VehicleModel } from "../../../domain/models/VehicleModel";
import {
  vehicleGetAllModelOptions,
  vehicleGetAllModelWithBrand,
} from "../../../domain/services/vehicleService";
import MyButton from "../common/MyButton";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import DynamicTable from "./DynamicTable";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function VehicleModelTable({ showPagination, localPagination }: Props) {
  const dispatch = useDispatch();

  const columns: ColumnsType<VehicleModel> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      key: "brand",
      render: (record: VehicleModel) => {
        return record.brand?.name;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (record: VehicleModel) => {
        const options = vehicleGetAllModelOptions();
        return options.find((option) => option.value === record.status)?.label;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: VehicleModel) => {
        return (
          <div>
            <MyButton
              onClick={() => {
                console.log(record);
                dispatch(
                  drawerFormUpdate({
                    show: true,
                    title: "Edit",
                    content: "vehicleModelUpdate",
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
      caption="vehicle-model-table"
      getData={vehicleGetAllModelWithBrand}
    />
  );
}

export default VehicleModelTable;
