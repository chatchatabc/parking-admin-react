import { Input, Pagination, Table, TableColumnsType } from "antd";
import React from "react";
import { graphqlQuery } from "../../../domain/infra/apollo-client/apolloActions";
import { userGetDoc } from "../../../domain/infra/apollo-client/docs/userDoc";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

function UsersPage() {
  const [pagination, setPagination] = React.useState({
    current: 0,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();

  // Queries
  const { loading, data, refetch } = graphqlQuery(userGetDoc(), "Users", {
    variables: {
      size: pagination.pageSize,
      page: pagination.current,
    },
  });

  const dataSource = data?.getUsers?.content.map((user: any) => {
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
        if (record.phoneVerifiedAt || record.emailVerifiedAt) {
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
        return <div className="text-red-500">N/A</div>;
      },
    },
    {
      title: "Email",
      key: "email",
      render: (record) => {
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

  React.useEffect(() => {
    if (data) {
      console.log(data.getUsers.pageInfo.totalElements);
      setPagination({
        ...pagination,
        total: data?.getUsers?.pageInfo?.totalElements,
      });
    }
  }, [data]);

  return (
    <div className="px-4 w-full">
      <section className="py-2">
        <Breadcrumbs />
      </section>
      <section className="bg-bg4 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Users List</h2>
        </header>

        {/* Table Actions */}
        <section className="flex gap-2">
          <Pagination
            current={pagination.current + 1}
            total={pagination.total}
            onChange={(page, pageSize) => {
              setPagination({
                ...pagination,
                current: page - 1,
              });
              refetch({
                size: pageSize,
                page: page - 1,
              });
            }}
          />

          <button
            onClick={() => {
              navigate("create");
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
            pagination={{
              ...pagination,
              current: pagination.current + 1,
              onChange: (page, pageSize) => {
                setPagination({
                  ...pagination,
                  current: page - 1,
                });
                refetch({
                  size: pageSize,
                  page: page - 1,
                });
              },
            }}
          />
        </section>
      </section>
    </div>
  );
}

export default UsersPage;
