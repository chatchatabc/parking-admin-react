import { useNavigate } from "react-router-dom";
import DynamicTable from "./DynamicTable";
import { jeepneyGetAll } from "../../../domain/services/jeepneyService";
import { Jeepney } from "../../../domain/models/JeepneyModel";
import { ColumnsType } from "antd/es/table";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
  extraVariables?: Record<string, any>;
};

function JeepneysTable({
  showPagination,
  localPagination,
  extraVariables,
}: Props) {
  const navigate = useNavigate();

  const columns: ColumnsType<Record<string, any>> = [
    {
      title: "Name",
      key: "name",
      render: (record: Jeepney) => {
        return (
          <button
            onClick={() => {
              navigate(`${record.plateNumber}`);
            }}
          >
            {record.name}
          </button>
        );
      },
    },
    {
      title: "Plate Number",
      key: "plateNumber",
      dataIndex: "plateNumber",
    },
    {
      title: "Route",
      key: "route",
    },
    {
      title: "Location",
      key: "location",
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      title="jeepney-table"
      getData={(variables) => {
        return jeepneyGetAll({ ...variables, ...extraVariables });
      }}
    />
  );
}

export default JeepneysTable;
