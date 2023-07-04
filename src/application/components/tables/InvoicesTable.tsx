import DynamicTable from "./DynamicTable";
import { ColumnsType } from "antd/es/table";
import { Invoice } from "../../../domain/models/InvoiceModel";
import { useNavigate } from "react-router-dom";
import {
  CommonContent,
  CommonVariables,
} from "../../../domain/models/CommonModel";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";

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

  const columns: ColumnsType<Invoice> = [
    {
      title: "Invoice ID",
      key: "invoiceUuid",
      render: (record: Invoice) => {
        return (
          <button
            className="underline hover:no-underline"
            onClick={() => {
              navigate(`/invoices/${record.invoiceUuid}`);
            }}
          >
            {record.invoiceUuid}
          </button>
        );
      },
    },
    {
      title: "Parking Lot",
      key: "parkingLot",
      render: (record: Invoice) => {
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
      title: "Plate Number",
      key: "plateNumber",
      render: (record) => {
        if (record.vehicle) {
          return (
            <button
              className="underline hover:no-underline"
              onClick={() => {
                navigate(`/vehicles/${record.vehicle.id}`);
              }}
            >
              {record.id}
            </button>
          );
        }
        return <p>{record.plateNumber ?? "Unknown"}</p>;
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      columns={columns}
      getData={getData}
    />
  );
}

export default InvoicesTable;
