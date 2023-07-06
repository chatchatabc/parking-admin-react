import DynamicTable from "./DynamicTable";
import { ColumnsType } from "antd/es/table";
import { UserLogout } from "../../../domain/models/UserModel";
import { userGetAllLogoutByUser } from "../../../domain/services/userService";

type Props = {
  id: string;
  showPagination?: boolean;
  localPagination?: boolean;
};

function UserLogoutTable({ showPagination, localPagination, id }: Props) {
  const columns: ColumnsType<UserLogout> = [
    {
      title: "IP Address",
      key: "ipAddress",
      dataIndex: "ipAddress",
    },
    {
      title: "Date",
      render: (record: UserLogout) => {
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        });
        const date = record.createdAt ? new Date(record.createdAt) : null;
        return <p>{date && dateFormatter.format(date)}</p>;
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      getData={(variables) => {
        return userGetAllLogoutByUser({ ...variables, id });
      }}
    />
  );
}

export default UserLogoutTable;
