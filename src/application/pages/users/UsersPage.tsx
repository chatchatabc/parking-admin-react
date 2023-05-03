import { Pagination, Table, TableColumnsType } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { formRefHandler } from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { userGet } from "../../../domain/service/userService";
import ErrorMessageComp from "../../components/ErrorMessageComp";
import { globalStateUpdate } from "../../redux/slices/globalState";

function UsersPage() {
  const [pagination, setPagination] = React.useState({
    current: 0,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalState = useSelector((state: any) => state.globalState);

  // Queries
  const { loading, data, refetch, error } = userGet(
    pagination.current,
    pagination.pageSize
  );

  const dataSource = data?.content.map((user: any) => {
    return {
      ...user,
      key: `users-list-${user.userId}`,
    };
  });

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: "Username",
      key: "name",
      render: (record) => {
        if (record.username) {
          return (
            <button
              onClick={() => {
                navigate(`u-${record.username}`);
              }}
              className="text-blue-500 underline hover:no-underline"
            >
              {record.username}
            </button>
          );
        } else if (record.phone) {
          return (
            <button
              onClick={() => {
                formRefHandler.setFieldsValue(record);
                navigate(`p-${record.phone}`);
              }}
              className="text-blue-500 underline hover:no-underline"
            >
              {record.phone}
            </button>
          );
        }
        return (
          <button
            onClick={() => {
              formRefHandler.setFieldsValue(record);
              navigate(`i-${record.id}`);
            }}
            className="text-blue-500 underline hover:no-underline"
          >
            Unknown
          </button>
        );
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
      setPagination({
        ...pagination,
        total: data?.getUsers?.pageInfo?.totalElements,
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (globalState.reset) {
      refetch({
        size: pagination.pageSize,
        page: pagination.current,
      });
      dispatch(globalStateUpdate({ reset: false }));
    }
  }, [globalState.reset]);

  return (
    <div className="px-4 w-full relative">
      {error && <ErrorMessageComp />}
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
              formRefHandler.resetFields();
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
