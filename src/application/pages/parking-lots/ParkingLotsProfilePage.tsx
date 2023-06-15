import { Modal, Spin, message } from "antd";
import React from "react";
import ErrorMessageComp from "../../components/ErrorMessageComp";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import {
  parkingLotGetByUser,
  parkingLotGetImagesByParkingLot,
  parkingLotVerify,
} from "../../../domain/services/parkingLotService";
import { ParkingLot } from "../../../domain/models/ParkingModel";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { User } from "../../../domain/models/UserModel";
import MyButton from "../../components/common/MyButton";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { utilGenerateRandomNumber } from "../../../domain/utils/commonUtils";
import InvoicesTable from "../../components/tables/InvoicesTable";
import { userGet } from "../../../domain/services/userService";
import { invoiceGetByParkingLot } from "../../../domain/services/invoiceService";

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
  const [data, setData] = React.useState<ParkingLot | null>(null);
  const [images, setImages] = React.useState<string[]>([]);
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
      const response = await parkingLotGetByUser({
        keyword: username ?? phone ?? "",
      });

      if (response.errors) {
        message.error("Failed to fetch parking lot.");
      } else {
        setData(response.data);

        const responseImages = await parkingLotGetImagesByParkingLot({
          keyword: response?.data?.parkingLotUuid ?? "",
          page: 0,
          size: 100,
        });
        if (responseImages.errors) {
          message.error("Failed to fetch parking lot images.");
        } else {
          setImages(responseImages.data ?? []);
        }
      }

      const responseOwner = await userGet({ keyword: username ?? phone ?? "" });
      if (responseOwner.errors) {
        message.error("Failed to fetch parking lot owner.");
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

  return (
    <div className="p-2 grid grid-cols-12 flex-1">
      {/* Parking Verification */}
      <section className="p-2 grid col-span-4">
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

                      if (response.errors) {
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
      </section>

      {/* Parking Information */}
      <section className="p-2 grid row-span-2 col-span-8">
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
              <a
                target="_blank"
                href={`https://www.google.com/maps/dir/?api=1&destination=${data.address}`}
                className="text-blue-500 underline hover:no-underline"
              >
                {data?.address}
              </a>
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
      </section>

      {/* Parking Lot Rate */}
      <section className="p-2 grid col-span-4">
        <section className="bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Parking Lot Rate</h2>
            <MyButton
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    show: true,
                    content: "parkingLotRate",
                    title: "Edit Parking Lot Rate",
                    data: {
                      parkingLotUuid: data.parkingLotUuid,
                      ...data.rate,
                    },
                  })
                );
              }}
            >
              Edit
            </MyButton>
          </header>

          <section className="flex flex-wrap gap-y-4 mt-2">
            <div className="w-1/3">
              <p className="text-xs font-bold">Interval</p>
              <p>
                {data.rate?.interval ? (
                  "Daily"
                ) : data.rate?.interval === 0 ? (
                  "Hourly"
                ) : (
                  <span className="text-red-500">N/A</span>
                )}
              </p>
            </div>
            <div className="w-1/3">
              <p className="text-xs font-bold">Rate</p>
              <p>
                {data.rate?.rate ? (
                  new Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "PHP",
                  }).format(data.rate?.rate ?? 0)
                ) : (
                  <span className="text-red-500">N/A</span>
                )}
              </p>
            </div>
            <div className="w-1/3">
              <p className="text-xs font-bold">Starting Rate</p>
              <p>
                {data.rate?.startingRate ? (
                  new Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "PHP",
                  }).format(data.rate?.startingRate)
                ) : (
                  <span className="text-red-500">N/A</span>
                )}
              </p>
            </div>
            <div className="w-1/3">
              <p className="text-xs font-bold">
                Free {data.rate?.interval === 0 ? "hours" : "days"}
              </p>
              <p>
                {data.rate?.freeHours ?? (
                  <span className="text-red-500">N/A</span>
                )}
              </p>
            </div>
            <div className="w-1/3">
              <p className="text-xs font-bold">
                Pay for free {data.rate?.interval === 0 ? "hours" : "days"}
              </p>
              <p>
                {data.rate?.payForFreeHoursWhenExceeding ? (
                  "TRUE"
                ) : data.rate?.payForFreeHoursWhenExceeding === false ? (
                  "FALSE"
                ) : (
                  <span className="text-red-500">N/A</span>
                )}
              </p>
            </div>
          </section>
        </section>
      </section>

      {/* Owner Information */}
      <section className="p-2 grid col-span-4">
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

      {/* Invoice History */}
      <section className="p-2 grid col-span-8 row-span-2">
        <section className="bg-bg2 p-4 rounded-lg">
          {/* Header */}
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Invoice History</h2>
          </header>

          <section className="mt-2">
            <InvoicesTable
              getData={(variables) => {
                variables.keyword = data.parkingLotUuid;
                return invoiceGetByParkingLot(variables);
              }}
            />
          </section>
        </section>
      </section>

      {/* Owner Information */}
      <section className="p-2 grid col-span-4 row-span-2">
        <section className="bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Parking Lot Photos</h2>
            <MyButton>Add +</MyButton>
          </header>

          <section className="mt-2 grid grid-cols-4">
            {images.map((imageUuid) => {
              return (
                <div className="p-2">
                  <div className="pb-[100%] bg-t2 relative">
                    <img
                      className="absolute h-full w-full object-cover"
                      src={`/api/parking-lot/get-image/${imageUuid}`}
                    />
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </section>
    </div>
  );
}

export default ParkingLotsProfilePage;
