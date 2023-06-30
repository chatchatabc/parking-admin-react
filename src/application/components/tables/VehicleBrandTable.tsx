import { ColumnsType } from "antd/es/table";
import DynamicTable from "./DynamicTable";
import { VehicleBrand } from "../../../domain/models/VehicleModel";
import {
  vehicleGetAllBrand,
  vehicleGetAllBrandOptions,
} from "../../../domain/services/vehicleService";
import MyButton from "../common/MyButton";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function VehicleBrandTable({ showPagination, localPagination }: Props) {
  const dispatch = useDispatch();

  const columns: ColumnsType<VehicleBrand> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      render: (record: VehicleBrand) => {
        const options = vehicleGetAllBrandOptions();
        return options.find((option) => option.value === record.status)?.label;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: VehicleBrand) => {
        return (
          <div>
            <MyButton
              onClick={() => {
                console.log(record);
                dispatch(
                  drawerFormUpdate({
                    show: true,
                    title: "Edit",
                    content: "vehicleBrandUpdate",
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
      title="vehicle-brand-table"
      getData={vehicleGetAllBrand}
    />
  );
}

export default VehicleBrandTable;
