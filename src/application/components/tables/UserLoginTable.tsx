import DynamicTable from "./DynamicTable";
import { ColumnsType } from "antd/es/table";
import { UserLogin } from "../../../domain/models/UserModel";
import { userGetAllLoginByUser } from "../../../domain/services/userService";

type Props = {
  id: string;
  showPagination?: boolean;
  localPagination?: boolean;
};

function UserLoginTable({ showPagination, localPagination, id }: Props) {
  const columns: ColumnsType<UserLogin> = [
    {
      title: "IP Address",
      key: "ipAddress",
      dataIndex: "ipAddress",
    },
    {
      title: "Date",
      render: (record: UserLogin) => {
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        });
        const date = record.createdAt ? new Date(record.createdAt) : null;
        return (
          <p
            className={`${record.success ? "text-green-500" : "text-red-500"}`}
          >
            {date && dateFormatter.format(date)}
          </p>
        );
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      getData={(variables) => {
        return userGetAllLoginByUser({ ...variables, id });
      }}
    />
  );
}

export default UserLoginTable;
