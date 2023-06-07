import DynamicTable from "./DynamicTable";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { ColumnsType } from "antd/es/table";
import { invoiceGetAll } from "../../../domain/services/invoiceService";
import { Invoice } from "../../../domain/models/InvoiceModel";
import { Parking } from "../../../domain/models/ParkingModel";
import { User } from "../../../domain/models/UserModel";

type NewInvoice = Invoice & {
  parkingLot: Parking & {
    owner: User;
  };
};

type Props = {
  showPagination?: boolean;
};

function InvoicesTable({ showPagination }: Props) {
  const columns: ColumnsType<Vehicle> = [
    {
      title: "Parking Lot",
      key: "parkingLot",
      render: (record: NewInvoice) => {
        if (record.parkingLot.owner.username || record.parkingLot.owner.phone) {
          return (
            <a href={`/parking-lots/${record.parkingLot.owner}`}>
              {record?.parkingLot?.name}
            </a>
          );
        }
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
      getData={invoiceGetAll}
    />
  );
}

export default InvoicesTable;
