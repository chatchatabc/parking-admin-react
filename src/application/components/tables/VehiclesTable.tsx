import DynamicTable from "./DynamicTable";
import { vehicleGetAll } from "../../../domain/services/vehicleService";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { ColumnsType } from "antd/es/table";
import { Popover } from "antd";
import CheckIconAsset from "../../assets/CheckIconAsset";
import XIconAsset from "../../assets/XIconAsset";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function VehiclesTable({ showPagination, localPagination }: Props) {
  const columns: ColumnsType<Vehicle> = [
    {
      title: "Plate Number",
      key: "plateNumber",
      render: (record: Vehicle) => {
        const date = new Date(record.verifiedAt ?? "");

        return (
          <div className='flex items-center gap-1'>
            <p>{record.plateNumber}</p>
            <Popover
              color={record.verifiedAt ? "green" : "red"}
              content={
                <p className='text-white text-xs'>
                  {record.verifiedAt ? (
                    <span>
                      Verified at <br />
                      {new Intl.DateTimeFormat("en", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(date)}
                    </span>
                  ) : (
                    "Not yet verified"
                  )}
                </p>
              }
            >
              {record.verifiedAt ? (
                <div className='w-5 h-5 text-green-500 self-start'>
                  <CheckIconAsset />
                </div>
              ) : (
                <div className='w-5 h-5 text-red-500 self-start'>
                  <XIconAsset />
                </div>
              )}
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Vehicle Type",
      key: "type",
      render: (record: Vehicle) => {
        if (record.type === 1) {
          return <p>Motorcycle</p>;
        }
        return <p>Car</p>;
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      title='vehicle-table'
      getData={vehicleGetAll}
    />
  );
}

export default VehiclesTable;
