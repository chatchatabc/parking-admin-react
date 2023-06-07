import { UserBan } from "../../../domain/models/UserModel";
import DynamicTable from "./DynamicTable";
import { userGetBanHistory } from "../../../domain/services/userService";
import { authUsername } from "../../../domain/services/authService";
import { ColumnsType } from "antd/es/table";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
  username?: string;
  phone?: string;
};

function UserBanTable({
  showPagination,
  localPagination,
  username = authUsername(),
  phone,
}: Props) {
  const columns: ColumnsType<UserBan> = [
    {
      width: "50%",
      title: "Banned At",
      key: "bannedAt",
      render: (record: UserBan) => {
        if (record.unbannedAt) {
          return (
            <>
              <p className="text-green-500">{record.createdAt}</p>
              <p className="text-t2">{record.reason}</p>
            </>
          );
        }
        return (
          <>
            <p className="text-green-500">{record.createdAt}</p>
            <p className="text-t2">{record.reason}</p>
          </>
        );
      },
    },
    {
      width: "50%",
      title: "Until",
      key: "until",
      render: (record: UserBan) => {
        if (record.unbannedAt) {
          return (
            <>
              <p className="text-green-500">{record.unbannedAt}</p>
              <p className="text-t2">{record.unbanReason}</p>
            </>
          );
        }
        return <p className="text-red-500">{record.until}</p>;
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      localPagination={localPagination}
      columns={columns}
      title="users-table"
      getData={(variables) => {
        return userGetBanHistory({ ...variables, username, phone });
      }}
    />
  );
}

export default UserBanTable;
