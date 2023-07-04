import DynamicTable from "./DynamicTable";
import { Route } from "../../../domain/models/RouteModel";
import { ColumnsType } from "antd/es/table";

type Props = {
  data: Route[];
  showPagination?: boolean;
};

function RoutesTable({ data, showPagination = false }: Props) {
  const columns: ColumnsType<Route> = [
    {
      title: "Name",
      key: "name",
      render: (record: Route) => {
        return <p>{record.name}</p>;
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      dataSource={data}
      columns={columns}
    />
  );
}

export default RoutesTable;
