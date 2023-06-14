import React from "react";
import { Spin, message } from "antd";
import ErrorMessageComp from "../components/ErrorMessageComp";
import { userGet } from "../../domain/services/userService";
import { User } from "../../domain/models/UserModel";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../redux/slices/drawers/drawerForm";
import MyButton from "../components/common/MyButton";
import UserBanTable from "../components/tables/UserBanTable";
import InvoicesTable from "../components/tables/InvoicesTable";
import UserVehiclesTable from "../components/tables/UserVehiclesTable";
import { invoiceGetByUser } from "../../domain/services/invoiceService";

interface Props {
  username?: string;
  phone?: string;
}

function ProfilePage({ username, phone }: Props) {
  const globalState = useSelector((state: any) => state.globalState);
  const dispatch = useDispatch();

  // Local States
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
  }, [globalState.reset]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await userGet({ keyword: username ?? phone ?? "" });

      if (response.errors) {
        message.error("Failed to fetch user.");
      } else {
        const processedData = {
          ...response.data,
          roles: response.data.authorities?.map(
            (authority) => authority.authority
          ),
        };

        setData(processedData);
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 relative">
        <ErrorMessageComp message="User cannot be found!" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 p-2 relative">
      {/* Ban History */}
      <section className="p-2 grid col-span-4 row-span-2">
        <section className="p-4 pb-8 bg-bg2 rounded-lg">
          {/* Header */}
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Ban History</h2>
            <MyButton
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    content: "userBan",
                    mode: "create",
                    show: true,
                    title: "User Ban",
                    data: {
                      method: "BAN",
                      userUuid: data.userUuid,
                    },
                  })
                );
              }}
            >
              Add +
            </MyButton>
          </header>

          {/* Body */}
          <div className="mt-2">
            <UserBanTable username={username} phone={phone} />
          </div>
        </section>
      </section>

      {/* User Information */}
      <section className="p-2 grid col-span-8">
        <section className="p-4 pb-8 bg-bg2 rounded-lg">
          {/* Header */}
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-bold">User Information</h2>
            <MyButton
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    content: "userDetails",
                    mode: "update",
                    show: true,
                    title: "User Details",
                    data,
                  })
                );
              }}
            >
              Edit
            </MyButton>
          </header>

          {/* Body */}
          <div className="flex flex-wrap mt-2 gap-y-2 [&>*]:w-1/3">
            <div>
              <p className="text-xs font-bold uppercase">Username</p>
              <p>{data?.username}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase">
                Phone{" "}
                {data?.phoneVerifiedAt ? (
                  <span className="text-green-500">(Verified)</span>
                ) : (
                  <span className="text-red-500">(Not Verified)</span>
                )}
              </p>
              <p>{data?.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase">
                Email{" "}
                {data?.emailVerifiedAt ? (
                  <span className="text-green-500">(Verified)</span>
                ) : (
                  <span className="text-red-500">(Not Verified)</span>
                )}
              </p>
              <p>{data?.email}</p>
            </div>
          </div>
        </section>
      </section>

      {/* Invoice history */}
      <section className="p-2 grid col-span-8 row-span-3">
        <section className="bg-bg2 p-4 rounded-lg">
          {/* Header */}
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Invoice History</h2>
          </header>

          <section className="mt-2">
            <InvoicesTable
              getData={(variables) => {
                variables.keyword = data.userUuid;
                return invoiceGetByUser(variables);
              }}
            />
          </section>
        </section>
      </section>

      {/* Vehicles */}
      <section className="p-2 grid col-span-4 row-span-4">
        <section className="p-4 pb-8 bg-bg2 rounded-lg">
          {/* Header */}
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Vehicles</h2>
            <MyButton
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    data: {
                      userUuid: data.userUuid,
                    },
                    mode: "create",
                    show: true,
                    title: "Add Vehicle",
                    content: "vehicle",
                  })
                );
              }}
            >
              Add +
            </MyButton>
          </header>

          {/* Body */}
          <div className="mt-2">
            <UserVehiclesTable userUuid={data.userUuid ?? ""} />
          </div>
        </section>
      </section>
    </div>
  );
}

export default ProfilePage;
