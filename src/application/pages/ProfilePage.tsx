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
import { authUsername } from "../../domain/services/authService";
import { CommonVariables } from "../../domain/models/CommonModel";
import UserLoginTable from "../components/tables/UserLoginTable";
import UserLogoutTable from "../components/tables/UserLogoutTable";
import ImageComp from "../components/ImageComp";

interface Props {
  id?: string;
}

function ProfilePage({ id = authUsername() ?? "" }: Props) {
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
      const response = await userGet({
        id,
      });

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
    <div className="flex p-2 relative">
      {/* Left */}
      <section className="w-1/3">
        {/* User Profile */}
        <section className="p-2">
          <section className="p-4 pb-8 bg-bg2 rounded-lg">
            {/* Header */}
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-bold">User Profile</h2>
              <MyButton
                onClick={() => {
                  dispatch(
                    drawerFormUpdate({
                      content: "userAvatar",
                      mode: "update",
                      show: true,
                      title: `Change profile of ${data.username ?? data.phone}`,
                      data: {
                        userUuid: data.userUuid,
                      },
                    })
                  );
                }}
              >
                Change
              </MyButton>
            </header>

            {/* Body */}
            <div className="mt-2">
              <div className="max-w-[200px] mx-auto">
                <div className="pb-[100%] rounded-full border relative overflow-hidden">
                  <ImageComp
                    src={`/api/user/avatar/${data.userUuid}`}
                    alt={data.username ?? "User Avatar"}
                    className="w-full h-full absolute object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Ban History */}
        <section className="p-2">
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
              <UserBanTable id={id} />
            </div>
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
                        updating: true,
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
      </section>

      {/* Right */}
      <section className="w-2/3 flex flex-wrap h-fit">
        {/* User Information */}
        <section className="p-2 w-full">
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
        <section className="p-2 w-full">
          <section className="bg-bg2 p-4 rounded-lg">
            {/* Header */}
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Invoice History</h2>
            </header>

            <section className="mt-2">
              <InvoicesTable
                getData={(variables) => {
                  variables.id = data.userUuid;
                  return invoiceGetByUser(
                    variables as CommonVariables & { id: string }
                  );
                }}
              />
            </section>
          </section>
        </section>

        {/* User Login */}
        <section className="p-2 w-1/2">
          <section className="bg-bg2 p-4 rounded-lg">
            {/* Header */}
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Login History</h2>
            </header>

            <section className="mt-2">
              <UserLoginTable id={data.userUuid ?? ""} />
            </section>
          </section>
        </section>

        {/* User Logout */}
        <section className="p-2 w-1/2">
          <section className="bg-bg2 p-4 rounded-lg">
            {/* Header */}
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Logout History</h2>
            </header>

            <section className="mt-2">
              <UserLogoutTable id={data.userUuid ?? ""} />
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}

export default ProfilePage;
