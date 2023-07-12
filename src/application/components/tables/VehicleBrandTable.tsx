import { ColumnsType } from "antd/es/table";
import DynamicTable from "./DynamicTable";
import { VehicleBrand } from "../../../domain/models/VehicleModel";
import {
  vehicleGetAllBrand,
  vehicleGetAllBrandOptions,
} from "../../../domain/services/vehicleService";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import ImageComp from "../ImageComp";

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
      render: (record: VehicleBrand) => {
        return (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <ImageComp
                src={`/api/vehicle-brand/logo/${record.brandUuid}`}
                alt={record.name ?? "No Image"}
              />
            </div>
            <p>{record.name}</p>
          </div>
        );
      },
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
          <div className="flex divide-x">
            <button
              className="px-2 text-blue-500 hover:text-blue-600"
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    show: true,
                    title: "Edit Vehicle Brand",
                    content: "vehicleBrand",
                    mode: "update",
                    data: record,
                  })
                );
              }}
            >
              Edit
            </button>

            <button
              className="px-2 text-blue-500 hover:text-blue-600"
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    show: true,
                    title: "Edit Vehicle Brand Logo",
                    content: "vehicleBrandLogo",
                    mode: "update",
                    data: record,
                  })
                );
              }}
            >
              Update Logo
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
      getData={vehicleGetAllBrand}
    />
  );
}

export default VehicleBrandTable;
