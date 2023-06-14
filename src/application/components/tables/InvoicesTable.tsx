import DynamicTable from "./DynamicTable";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { ColumnsType } from "antd/es/table";
import { Invoice } from "../../../domain/models/InvoiceModel";
import { ParkingLot } from "../../../domain/models/ParkingModel";
import { User } from "../../../domain/models/UserModel";
import { useNavigate } from "react-router-dom";
import {
  CommonContent,
  CommonVariables,
} from "../../../domain/models/CommonModel";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";

type NewInvoice = Invoice<ParkingLot<User>>;

type Props = {
  showPagination?: boolean;
  getData: (
    variables: CommonVariables
  ) => Promise<
    AxiosResponseData<CommonContent<Record<string, any>>> | AxiosResponseError
  >;
};

function InvoicesTable({ showPagination, getData }: Props) {
  const navigate = useNavigate();

  const columns: ColumnsType<Record<string, any>> = [
    {
      title: "Invoice ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Parking Lot",
      key: "parkingLot",
      render: (record: NewInvoice) => {
        if (
          record.parkingLot?.owner?.username ||
          record.parkingLot?.owner?.phone
        ) {
          const { username, phone } = record.parkingLot.owner;
          return (
            <button
              className="underline hover:no-underline"
              onClick={() => {
                navigate(
                  `/parking-lots/${username ? `u-${username}` : `p-${phone}`}`
                );
              }}
            >
              {record?.parkingLot?.name}
            </button>
          );
        }
        return <p>Unknown</p>;
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
      title: "Plate Number",
      key: "plateNumber",
      dataIndex: "plateNumber",
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      columns={columns}
      title="invoices-table"
      getData={getData}
    />
  );
}

export default InvoicesTable;
