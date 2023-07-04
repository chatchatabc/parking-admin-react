import { ColumnsType } from "antd/es/table";
import DynamicTable from "./DynamicTable";
import { VehicleModel } from "../../../domain/models/VehicleModel";
import {
  vehicleGetAllBrand,
  vehicleOptionsModelStatus,
} from "../../../domain/services/vehicleService";
import MyButton from "../common/MyButton";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

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
        return <p>{record.brand?.name ?? "No Brand"}</p>;
      },
    },
    {
      title: "Type",
      key: "type",
      render: (record: VehicleModel) => {
        return <p>{record.type?.name ?? "No Type"}</p>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (record: VehicleModel) => {
        const options = vehicleOptionsModelStatus();
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
                    title: "Vehicle Update",
                    content: "vehicleModel",
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
      caption="vehicle-brand-table"
      getData={vehicleGetAllBrand}
    />
  );
}

export default VehicleModelTable;
