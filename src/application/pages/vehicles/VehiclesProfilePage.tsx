import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Vehicle } from "../../../domain/models/VehicleModel";
import { Spin, message } from "antd";
import MyButton from "../../components/common/MyButton";
import { vehicleGetWithAllInfo } from "../../../domain/services/vehicleService";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import InvoicesTable from "../../components/tables/InvoicesTable";
import { invoiceGetAllByVehicle } from "../../../domain/services/invoiceService";
import { CommonVariables } from "../../../domain/models/CommonModel";

function VehiclesProfilePage() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [vehicle, setVehicle] = React.useState<Vehicle | null>(null);

  const dispatch = useDispatch();
  const { plateNumber } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loading) {
      (async () => {
        const response = await vehicleGetWithAllInfo({
          keyword: plateNumber ?? "",
        });

        if (response.errors) {
          message.error("Vehicle not found.");
        } else {
          setVehicle(response.data);
        }

        setLoading(false);
      })();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center flex-col">
        <h2>Loading...</h2>
        <div>
          <Spin />
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex-1 flex justify-center items-center flex-col">
        <h2>Invoice not found.</h2>
        <div>
          <MyButton
            onClick={() => {
              navigate("/invoices");
            }}
          >
            Go Back
          </MyButton>
        </div>
      </div>
    );
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
  const verifiedAtDate = new Date(vehicle.verifiedAt ?? "");

  return (
    <div className="p-2 flex">
      {/* Left */}
      <section className="w-1/3">
        {/* Vehicle Verification */}
        <section className="p-2 w-full flex">
          <section className="bg-bg2 p-4 rounded-lg w-full">
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Vehicle Verification</h2>
              <MyButton
                onClick={() => {
                  dispatch(
                    drawerFormUpdate({
                      show: true,
                      title: "Verify Vehicle",
                      content: "vehicleVerify",
                      mode: "update",
                      data: vehicle,
                    })
                  );
                }}
              >
                Edit
              </MyButton>
            </header>

            <section className="mt-2 flex flex-wrap gap-y-2">
              <div className="w-1/2">
                <p className="text-xs font-bold">Status</p>
                <p
                  className={`${
                    vehicle.verifiedAt ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {vehicle.verifiedAt ? "Verified" : "Not yet verified"}
                </p>
              </div>

              <div className="w-1/2">
                <p className="text-xs font-bold">Date</p>
                <p
                  className={`${
                    vehicle.verifiedAt ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {vehicle.verifiedAt
                    ? dateFormatter.format(verifiedAtDate)
                    : "N/A"}
                </p>
              </div>
            </section>
          </section>
        </section>

        {/* Drivers */}
        <section className="p-2 w-full flex">
          <section className="bg-bg2 p-4 rounded-lg w-full">
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Owner Information</h2>
            </header>

            <section className="mt-2 flex flex-wrap gap-y-2">
              <div className="w-1/2">
                <p className="text-xs font-bold">First Name</p>
                <p>{vehicle.owner?.firstName ?? "No First Name"}</p>
              </div>

              <div className="w-1/2">
                <p className="text-xs font-bold">Last Name</p>
                <p>{vehicle.owner?.lastName ?? "No Last Name"}</p>
              </div>

              <div className="w-1/2">
                <p className="text-xs font-bold">Email</p>
                <p>{vehicle.owner?.email ?? "No Last Name"}</p>
              </div>

              <div className="w-1/2">
                <p className="text-xs font-bold">Phone</p>
                <p>{vehicle.owner?.phone ?? "No Last Name"}</p>
              </div>

              <div className="w-1/2">
                <p className="text-xs font-bold">Username</p>
                <p>{vehicle.owner?.username ?? "No Last Name"}</p>
              </div>
            </section>
          </section>
        </section>
      </section>

      {/* Right */}
      <section className="w-2/3">
        {/* Vehicle Information */}
        <section className="p-2 w-full flex">
          <section className="bg-bg2 p-4 rounded-lg w-full">
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Vehicle Information</h2>
            </header>

            <section className="mt-2 flex flex-wrap gap-y-2">
              <div className="w-1/4">
                <p className="text-xs font-bold">Name</p>
                <p>{vehicle.name}</p>
              </div>

              <div className="w-1/4">
                <p className="text-xs font-bold">Plate Number</p>
                <p>{vehicle.plateNumber}</p>
              </div>

              <div className="w-1/4">
                <p className="text-xs font-bold">Brand</p>
                <p>{vehicle.model?.brand?.name}</p>
              </div>

              <div className="w-1/4">
                <p className="text-xs font-bold">Model</p>
                <p>{vehicle.model?.name}</p>
              </div>

              <div className="w-1/4">
                <p className="text-xs font-bold">Color</p>
                <p>{vehicle.color}</p>
              </div>

              <div className="w-1/4">
                <p className="text-xs font-bold">Year</p>
                <p>{vehicle.year}</p>
              </div>

              <div className="w-1/4">
                <p className="text-xs font-bold">Type</p>
                <p>{vehicle.model?.type?.name}</p>
              </div>
            </section>
          </section>
        </section>

        {/* Invoice History */}
        <section className="p-2 w-full flex">
          <section className="bg-bg2 p-4 rounded-lg w-full">
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Invoice History</h2>
            </header>

            <section className="mt-2">
              <InvoicesTable
                getData={(variables: CommonVariables) => {
                  variables.keyword = vehicle.vehicleUuid;
                  return invoiceGetAllByVehicle(
                    variables as CommonVariables & { keyword: string }
                  );
                }}
              />
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}

export default VehiclesProfilePage;
