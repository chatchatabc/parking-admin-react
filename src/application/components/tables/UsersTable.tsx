import { User } from "../../../domain/models/UserModel";
import { useNavigate } from "react-router-dom";
import DynamicTable from "./DynamicTable";
import { userGetAll } from "../../../domain/services/userService";

type Props = {
  showPagination?: boolean;
};

function UsersTable({ showPagination }: Props) {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Username",
      key: "name",
      render: (record: User) => {
        if (record.username || record.phone) {
          return (
            <button
              className="text-blue-500 underline hover:no-underline"
              onClick={() => {
                navigate(
                  `/users/${
                    record.username
                      ? `u-${record.username}`
                      : `p-${record.phone}`
                  }`
                );
              }}
            >
              {record.username ?? record.phone}
            </button>
          );
        }
        return <p>Unknown</p>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (record: User) => {
        if (record.phoneVerifiedAt || record.emailVerifiedAt) {
          return <div className="text-green-500 font-bold">Enabled</div>;
        }
        return <div className="text-red-500">Disabled</div>;
      },
    },
    {
      title: "Phone",
      key: "phone",
      render: (record: User) => {
        if (record.phone && record.phoneVerifiedAt) {
          const dateVerified = new Date(record.phoneVerifiedAt);
          const dateFormatted = dateVerified.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          });
          return (
            <div className="flex gap-2 items-center">
              <span>{record.phone}</span>
              <span className="text-green-500 text-xs font-bold">
                ({dateFormatted})
              </span>
            </div>
          );
        } else if (record.phone) {
          return (
            <div className="flex items-center gap-2">
              <span>{record.phone}</span>
              <span className="text-red-500 text-xs font-bold">
                (Not yet verified)
              </span>
            </div>
          );
        }
        return <div className="text-red-500">N/A</div>;
      },
    },
    {
      title: "Email",
      key: "email",
      render: (record: User) => {
        if (record.email && record.emailVerifiedAt) {
          const dateVerified = new Date(record.emailVerifiedAt);
          const dateFormatted = dateVerified.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          });
          return (
            <div className="flex gap-2 items-center">
              <span>{record.email}</span>
              <span className="text-green-500 text-xs font-bold">
                ({dateFormatted})
              </span>
            </div>
          );
        } else if (record.email) {
          return (
            <div className="flex items-center gap-2">
              <span>{record.email}</span>
              <span className="text-red-500 text-xs font-bold">
                (Not yet verified)
              </span>
            </div>
          );
        }
        return <div className="text-red-500">N/A</div>;
      },
    },
  ];

  return (
    <DynamicTable
      showPagination={showPagination}
      columns={columns}
      title="users-table"
      getData={userGetAll}
    />
  );
}

export default UsersTable;
