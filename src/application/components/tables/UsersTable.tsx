import { User } from "../../../domain/models/UserModel";
import { useNavigate } from "react-router-dom";
import DynamicTable from "./DynamicTable";
import { userGetAll } from "../../../domain/services/userService";
import { Popover } from "antd";

type Props = {
  showPagination?: boolean;
  localPagination?: boolean;
};

function UsersTable({ showPagination, localPagination }: Props) {
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
      title: "Phone",
      key: "phone",
      render: (record: User) => {
        if (record.phone && record.phoneVerifiedAt) {
          return (
            <div className="flex gap-2 items-center">
              <Popover
                color="green"
                content={<p className="text-white">Verified</p>}
              >
                <span className="text-green-500">{record.phone}</span>
              </Popover>
            </div>
          );
        } else if (record.phone) {
          return (
            <div className="flex items-center gap-2">
              <Popover
                color="red"
                content={<p className="text-white">Not yet verified</p>}
              >
                <span className="text-red-500">{record.phone}</span>
              </Popover>
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
          return (
            <div className="flex gap-2 items-center">
              <Popover
                color="green"
                content={<p className="text-white">Verified</p>}
              >
                <span className="text-green-500">{record.email}</span>
              </Popover>
            </div>
          );
        } else if (record.email) {
          return (
            <div className="flex items-center gap-2">
              <Popover
                color="red"
                content={<p className="text-white">Not yet verified</p>}
              >
                <span className="text-red-500">{record.email}</span>
              </Popover>
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
      localPagination={localPagination}
      columns={columns}
      title="users-table"
      getData={userGetAll}
    />
  );
}

export default UsersTable;
