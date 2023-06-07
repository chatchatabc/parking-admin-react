import { Modal, Spin, message } from "antd";
import React from "react";
import ErrorMessageComp from "../../components/ErrorMessageComp";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import {
  parkingLotGet,
  parkingLotVerify,
} from "../../../domain/services/parkingService";
import { Parking } from "../../../domain/models/ParkingModel";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import dayjs from "dayjs";
import { User } from "../../../domain/models/UserModel";
import { userGetProfile } from "../../../domain/services/userService";
import MyButton from "../../components/common/MyButton";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { utilGenerateRandomNumber } from "../../../domain/utils/commonUtils";

function ParkingLotsProfilePage() {
  const navigate = useNavigate();

  // Global states
  const globalState = useSelector((state: any) => state.globalState);
  const { identifier } = useParams();
  const dispatch = useDispatch();

  const identifiers = identifier?.split("-");
  if (!identifiers || (identifiers[0] !== "u" && identifiers[0] !== "p")) {
    return <NotFoundPage />;
  }
  const username = identifiers[0] === "u" ? identifiers[1] : undefined;
  const phone = identifiers[0] === "p" ? identifiers[1] : undefined;

  // Local states
  const [owner, setOwner] = React.useState<User | null>(null);
  const [data, setData] = React.useState<Parking | null>(null);
  const [loading, setLoading] = React.useState(true);

  const dates = [
    {
      name: "Saturday",
      value: 64,
    },
    {
      name: "Friday",
      value: 32,
    },
    {
      name: "Thursday",
      value: 16,
    },
    {
      name: "Wednesday",
      value: 8,
    },
    {
      name: "Tuesday",
      value: 4,
    },
    {
      name: "Monday",
      value: 2,
    },
    {
      name: "Sunday",
      value: 1,
    },
  ];
  let flagValue = data?.openDaysFlag ?? 0;
  const activeDates = dates.map((date) => {
    if (flagValue >= date.value) {
      flagValue -= date.value;
      return date.name;
    }

    return null;
  });

  React.useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
  }, [globalState.reset]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await parkingLotGet({ username, phone });
      if (response.errors) {
        message.error("Failed to fetch parking lot.");
      } else {
        setData(response.data);
      }

      const responseOwner = await userGetProfile({ username, phone });

      if (responseOwner.errors) {
        message.error("Failed to fetch owner.");
      } else {
        setOwner(responseOwner.data);
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="relative flex-1">
        <ErrorMessageComp message="Cannot find parking lot information" />
      </div>
    );
  }

  const businessHoursStart = new Date(data.businessHoursStart ?? "");
  const businessHoursEnd = new Date(data.businessHoursEnd ?? "");
  const dateVerified = new Date(data.verifiedAt ?? "");

  console.log(data);

  return (
    <div className="p-4 bg-bg1 flex flex-1 gap-4">
      {/* Left */}
      <section className="w-1/3 space-y-4">
        {/* 1st Entry */}
        <section className="bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Parking Verification</h2>
            {!data.verifiedAt && (
              <MyButton
                onClick={() => {
                  Modal.confirm({
                    title: `Proceed in verifying "${data.name}"?`,
                    okButtonProps: {
                      className: "bg-c1",
                    },
                    maskClosable: true,
                    closable: true,
                    onOk: async () => {
                      const response = await parkingLotVerify(
                        data.parkingLotUuid ?? ""
                      );

                      if (response.errors && response.errors.length > 0) {
                        message.error("Failed to verify parking lot");
                      } else {
                        message.success("Successfully verified parking lot");

                        dispatch(
                          globalStateUpdate({
                            reset: utilGenerateRandomNumber(),
                          })
                        );
                      }
                    },
                  });
                }}
              >
                Verify
              </MyButton>
            )}
          </header>

          <section className="flex flex-wrap mt-2">
            <div className="flex-1">
              <p className="text-xs font-bold">Status</p>
              <p>
                {data.verifiedAt ? (
                  <span className="text-green-500">Verified</span>
                ) : (
                  <span className="text-red-500">Not yet verified</span>
                )}
              </p>
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold">Date</p>
              <p>
                {data.verifiedAt ? (
                  <span className="text-green-500">
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                      timeStyle: "medium",
                    }).format(dateVerified)}
                  </span>
                ) : (
                  <span className="text-red-500">N/A</span>
                )}
              </p>
            </div>
          </section>
        </section>

        {/* 2nd Entry */}
        <section className="bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Parking Lot Rate</h2>
            <MyButton>Edit</MyButton>
          </header>

          <section className="flex justify-between mt-2">
            <p>Type: Daily</p>
            <p>Price: 1000php</p>
          </section>
        </section>

        {/* 3rd Entry */}
        <section className="bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Owner Information</h2>
            <MyButton
              onClick={() => {
                navigate(
                  `/users/${
                    owner?.username
                      ? `u-${owner?.username}`
                      : `p-${owner?.phone}`
                  }`
                );
              }}
            >
              View
            </MyButton>
          </header>

          <section className="mt-2 flex flex-wrap gap-y-2">
            <div className="w-1/2">
              <p className="text-xs font-bold">Username</p>
              <p>{owner?.username}</p>
            </div>

            <div className="w-1/2">
              <p className="text-xs font-bold">Phone</p>
              <p>{owner?.phone}</p>
            </div>

            <div className="w-1/2">
              <p className="text-xs font-bold">Email</p>
              <p>{owner?.email}</p>
            </div>
          </section>
        </section>
      </section>

      {/* Right */}
      <section className="w-2/3 space-y-4">
        {/* 1st Entry */}
        <section className="bg-bg2 p-4 rounded-lg">
          {/* Header */}
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Parking Information</h2>
            <MyButton
              onClick={() => {
                const openDaysFlag = dates.map((date) => {
                  if (activeDates.includes(date.name)) {
                    return date.value;
                  }
                  return 0;
                });
                const businessHoursEnd = dayjs(data.businessHoursEnd ?? "");
                const businessHoursStart = dayjs(data.businessHoursStart ?? "");

                console.log(businessHoursEnd, businessHoursStart);

                dispatch(
                  drawerFormUpdate({
                    show: true,
                    mode: "update",
                    data: {
                      ...data,
                      openDaysFlag,
                      businessHoursEnd,
                      businessHoursStart,
                    },
                    content: "parkingUpdate",
                  })
                );
              }}
            >
              Edit
            </MyButton>
          </header>

          {/* Body */}
          <section className="mt-2 flex flex-wrap gap-y-4">
            <div className="w-1/3">
              <p className="text-xs font-bold">Name</p>
              <p>{data.name}</p>
            </div>

            <div className="w-1/3">
              <p className="text-xs font-bold">Capacity</p>
              <p>
                {data.availableSlots}/{data.capacity}
              </p>
            </div>

            <div className="w-1/3">
              <p className="text-xs font-bold">Business Hours</p>
              <p>
                {new Intl.DateTimeFormat("en", { timeStyle: "medium" }).format(
                  businessHoursStart
                )}{" "}
                -{" "}
                {new Intl.DateTimeFormat("en", { timeStyle: "medium" }).format(
                  businessHoursEnd
                )}
              </p>
            </div>

            <div className="w-1/3">
              <p className="text-xs font-bold">Address</p>
              <p>{data?.address}</p>
            </div>

            <div className="w-1/3">
              <p className="text-xs font-bold">Description</p>
              <p>{data?.description}</p>
            </div>

            <div className="w-1/3">
              <p className="text-xs font-bold">Longitude & Latitude</p>
              <p>
                {data?.longitude} & {data?.latitude}
              </p>
            </div>

            <div className="w-full">
              <p className="text-xs font-bold">Business Dates</p>
              <ul className="flex flex-wrap gap-1">
                {dates.reverse().map((date, index) => {
                  const isActive = activeDates.includes(date.name);
                  return (
                    <li
                      key={`date-${index}`}
                      className={`pl-2 py-1 flex items-center rounded-sm ${
                        isActive
                          ? "bg-green-700 pr-3 text-white"
                          : "bg-gray-300 pr-2 text-black"
                      }`}
                    >
                      {isActive && (
                        <div className="w-4 h-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
                            />
                          </svg>
                        </div>
                      )}
                      <p>{date.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </section>

        {/* 2nd Entry */}
        <section className="bg-bg2 p-4 rounded-lg">
          {/* Header */}
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Invoice History</h2>
          </header>
        </section>
      </section>
    </div>
  );
}

export default ParkingLotsProfilePage;
