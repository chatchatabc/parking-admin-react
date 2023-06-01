import React from "react";
import { Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import ErrorMessageComp from "../components/ErrorMessageComp";
import { userGetProfile } from "../../domain/services/userService";
import { User } from "../../domain/models/UserModel";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../redux/slices/drawers/drawerForm";

interface Props {
  username?: string;
  phone?: string;
}

function ProfilePage({ username, phone }: Props) {
  const location = useLocation();
  const dispatch = useDispatch();

  // Local States
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<User | null>(null);
  const [form] = useForm();

  React.useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await userGetProfile({ username, phone });

      if (response.errors) {
        return message.error("Failed to fetch user.");
      } else {
        form.setFieldsValue(response.data);
        setData(response.data);
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
    <div className="flex-1">
      <ErrorMessageComp message="User cannot be found!" />
    </div>;
  }

  return (
    <div className="flex-1 px-4 pb-4 relative">
      <section className="flex gap-4">
        {/* Left side */}
        <section className="w-1/4">
          {/* 1st row */}
          <div className="border-2 border-primary bg-bg1 p-2 pb-8 rounded-lg">
            <header className="flex items-center">
              <h2 className="text-lg font-bold">User Avatar</h2>
              <button className="ml-auto bg-primary text-white px-4 py-1 rounded-md transition hover:bg-secondary">
                Edit
              </button>
            </header>

            <div className="w-1/2 mx-auto mt-2">
              <div className="pb-[100%] border-2 border-primary rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex-1 space-y-4">
          {/* First Entry */}
          <div className="border-2 border-primary bg-bg1 p-2 pb-8 rounded-lg">
            {/* Header */}
            <header className="flex items-center">
              <h2 className="text-lg font-bold">User Information</h2>
              <button
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
                className="ml-auto bg-primary text-white px-4 py-1 rounded-md transition hover:bg-secondary"
              >
                Edit
              </button>
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
          </div>

          {/* Second Entry */}
          <div className="border-2 border-primary bg-bg1 p-2 pb-8 rounded-lg">
            {/* <ProfileParking
              username={username ?? authUsername()}
              phone={phone}
              userId={data?.userId}
            /> */}
          </div>
        </section>
      </section>
    </div>
  );
}

export default ProfilePage;
