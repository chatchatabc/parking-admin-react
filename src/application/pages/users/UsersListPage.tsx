import { Input, Table, TableColumnsType } from "antd";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import React from "react";
import { graphqlQuery } from "../../graphql/GraphqlProvider";
import { userGetDoc } from "../../graphql/docs/userDoc";

function UsersListPage() {
  const [pagination, setPagination] = React.useState({
    current: 0,
    pageSize: 10,
    total: 0,
  });
  const dispatch = useDispatch();

  // Queries
  const { loading, data } = graphqlQuery(
    userGetDoc(pagination.pageSize, pagination.current),
    "Users"
  );

  const dataSource = data?.getUsers?.map((user: any) => {
    return {
      ...user,
      key: `users-list-${user.id}`,
    };
  });

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: "Username",
      key: "name",
      render: (record) => {
        if (record.username) {
          return <div>{record.username}</div>;
        } else if (record.phone) {
          return <div>{record.phone}</div>;
        }
        return <div>Unknown</div>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (record) => {
        if (record.enabled) {
          return <div className="text-green-500 font-bold">Enabled</div>;
        }
        return <div className="text-red-500">Disabled</div>;
      },
    },
    {
      title: "Phone",
      key: "phone",
      render: (record) => {
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
        return <div className="text-red-500">Not Verified</div>;
      },
    },
  ];

  React.useEffect(() => {
    if (data) {
      setPagination({
        ...pagination,
        total: data?.data?.totalElements,
      });
    }
  }, [data]);

  return (
    <div className="p-4 w-full">
      <section className="bg-bg4 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">User Activity</h2>
        </header>

        {/* Table Actions */}
        <section className="flex gap-2">
          {/* Search bar */}
          <div className="flex space-x-2">
            <Input className="p-2 w-64" placeholder="Search for Users" />
            <button className="h-full px-4 bg-primary rounded-md text-white flex items-center transition hover:bg-secondary">
              Search
            </button>
          </div>

          <button
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Create User",
                  content: "user",
                  mode: "create",
                })
              );
            }}
            className="bg-primary ml-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary"
          >
            Create User +
          </button>
        </section>
        <section>
          <Table
            loading={loading}
            className={`my-table`}
            dataSource={dataSource}
            columns={columns}
          />
        </section>
      </section>
    </div>
  );
}

export default UsersListPage;
