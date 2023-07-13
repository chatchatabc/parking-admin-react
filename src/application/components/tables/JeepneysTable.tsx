import { useNavigate } from "react-router-dom";
import DynamicTable from "./DynamicTable";
import { Jeepney } from "../../../domain/models/JeepneyModel";
import { ColumnsType } from "antd/es/table";
import JeepneyPositionComp from "../JeepneyPositionComp";
import { jeepneyGetAll } from "../../../domain/services/jeepneyService";

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
      render: (record: Jeepney) => {
        if (record.route) {
          return <p>{record.route?.name}</p>;
        }
        return <p>No route</p>;
      },
    },
    {
      title: "Location",
      key: "location",
      render: (record: Jeepney) => {
        return <JeepneyPositionComp jeepneyUuid={record.jeepneyUuid ?? ""} />;
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      getData={(variables) => {
        return jeepneyGetAll({ ...variables, ...extraVariables });
      }}
    />
  );
}

export default JeepneysTable;
