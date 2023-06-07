import { UserBan } from "../../../domain/models/UserModel";
import DynamicTable from "./DynamicTable";
import { userGetBanHistory } from "../../../domain/services/userService";
import { authUsername } from "../../../domain/services/authService";
import { ColumnsType } from "antd/es/table";

type Props = {
  showPagination?: boolean;
  username?: string;
  phone?: string;
};

function UserBanTable({
  showPagination,
  username = authUsername(),
  phone,
}: Props) {
  const columns: ColumnsType<UserBan> = [
    {
      title: "Status",
      key: "status",
      render: (record: UserBan) => {
        if (record.unbanReason) {
          return <p className="text-green-500">PERMITTED</p>;
        }
        return <p className="text-red-500">BANNED</p>;
      },
    },
    {
      title: "Details",
      key: "details",
      render: (record: UserBan) => {
        return <p>{record.unbanReason ?? record.reason}</p>;
      },
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "createdAt",
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      columns={columns}
      title="users-table"
      getData={(variables) => {
        return userGetBanHistory({ ...variables, username, phone });
      }}
    />
  );
}

export default UserBanTable;
