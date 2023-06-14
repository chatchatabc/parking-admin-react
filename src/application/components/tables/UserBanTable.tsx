import { UserBan } from "../../../domain/models/UserModel";
import DynamicTable from "./DynamicTable";
import { authUsername } from "../../../domain/services/authService";
import { ColumnsType } from "antd/es/table";
import { Popover } from "antd";
import { userGetBanHistoryByUser } from "../../../domain/services/userService";

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
        const date = new Date(record.createdAt ?? "");
        if (record.unbannedAt) {
          return (
            <Popover
              content={<p className="text-xs max-w-xs">{record.reason}</p>}
            >
              <p className="text-green-500">
                {new Intl.DateTimeFormat("en", {
                  dateStyle: "medium",
                  timeStyle: "medium",
                }).format(date)}
              </p>
            </Popover>
          );
        }
        return (
          <Popover
            content={<p className="text-xs max-w-xs">{record.reason}</p>}
          >
            <p className="text-red-500">
              {new Intl.DateTimeFormat("en", {
                dateStyle: "medium",
                timeStyle: "medium",
              }).format(date)}
            </p>
          </Popover>
        );
      },
    },
    {
      width: "50%",
      title: "Until",
      key: "until",
      render: (record: UserBan) => {
        if (record.unbannedAt) {
          const unbannedAt = new Date(record.unbannedAt ?? "");
          return (
            <Popover
              content={<p className="text-xs max-w-xs">{record.unbanReason}</p>}
            >
              <p className="text-green-500">
                {new Intl.DateTimeFormat("en", {
                  dateStyle: "medium",
                  timeStyle: "medium",
                }).format(unbannedAt)}
              </p>
            </Popover>
          );
        }

        const until = new Date(record.until ?? "");
        return (
          <p className="text-red-500">
            {new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "medium",
            }).format(until)}
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
      title="users-table"
      getData={(variables) => {
        return userGetBanHistoryByUser({
          ...variables,
          keyword: username ?? phone ?? "",
        });
      }}
    />
  );
}

export default UserBanTable;
