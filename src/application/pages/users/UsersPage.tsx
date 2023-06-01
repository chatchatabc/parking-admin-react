import { Pagination, Table, message } from "antd";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formRefHandler } from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { User } from "../../../domain/models/UserModel";
import { userAllGet } from "../../../domain/services/userService";

function UsersPage() {
  // React Router
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, _] = useSearchParams();

  // Saved States
  const globalState = useSelector((state: any) => state.globalState);
  const keyword = searchParams.get("keyword") ?? undefined;
  const page = searchParams.get("page") ?? 1;
  const pageSize = searchParams.get("pageSize") ?? 10;

  // Local States
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    current: Number(page) - 1,
    pageSize: Number(pageSize),
    total: 0,
  });
  const [data, setData] = React.useState<User[]>([]);

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
                  record.username ? `u-${record.username}` : `p-${record.phone}`
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

  function handleNavigation(page: number, size: number) {
    setPagination({
      ...pagination,
      current: page - 1,
    });
    setLoading(true);
    navigate(
      `?page=${page}&size=${size}${keyword ? "&keyword=" + keyword : ""}`
    );
  }

  React.useEffect(() => {
    async function fetchData() {
      const query = await userAllGet({
        page: pagination.current,
        size: pagination.pageSize,
        keyword: keyword,
      });

      if (query.errors) {
        message.error("Failed to fetch data for users.");
      } else {
        const processedData = query.content.map((user) => {
          return {
            ...user,
            key: `users-list-${user.userUuid}`,
          };
        });

        setData(processedData);
        setPagination((prev) => ({
          ...prev,
          total: query.pageInfo.totalElements,
        }));
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);

  React.useEffect(() => {
    if (globalState.reset) {
      setLoading(true);
      dispatch(globalStateUpdate({ reset: false }));
    }
  }, [globalState.reset]);

  return (
    <div className="px-4 pb-4 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg4 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Users</h2>
        </header>

        {/* Table Actions */}
        <section className="flex gap-2">
          <Pagination
            current={pagination.current + 1}
            total={pagination.total}
            onChange={handleNavigation}
          />

          <button
            onClick={() => {
              formRefHandler.resetFields();
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Create User",
                  content: "userCreate",
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
            dataSource={data}
            columns={columns}
            pagination={{
              ...pagination,
              current: pagination.current + 1,
              onChange: handleNavigation,
            }}
          />
        </section>
      </section>
    </div>
  );
}

export default UsersPage;
