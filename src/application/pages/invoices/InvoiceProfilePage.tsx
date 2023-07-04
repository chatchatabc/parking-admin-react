import React from "react";
import MyButton from "../../components/common/MyButton";
import { Invoice } from "../../../domain/models/InvoiceModel";
import { invoiceGetWithAllInfo } from "../../../domain/services/invoiceService";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, message } from "antd";

function InvoiceProfilePage() {
  const [loading, setLoading] = React.useState(true);
  const [invoice, setInvoice] = React.useState<Invoice | null>(null);

  const { invoiceId = "" } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loading) {
      (async () => {
        const response = await invoiceGetWithAllInfo({ keyword: invoiceId });

        if (response.errors) {
          message.error("Failed to fetch invoice.");
        } else {
          setInvoice(response.data);
        }

        setLoading(false);
      })();
    }
  }, [loading]);

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

  if (!invoice) {
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

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  });
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const startAtDate = new Date(invoice?.startAt ?? "");
  const endAtDate = new Date(invoice?.endAt ?? "");
  const paidAtDate = new Date(invoice?.paidAt ?? "");
  const parkingLotStartDate = new Date(
    invoice?.parkingLot?.businessHoursStart ?? ""
  );
  const parkingLotEndDate = new Date(
    invoice?.parkingLot?.businessHoursEnd ?? ""
  );

  return (
    <div className="p-2 flex flex-wrap">
      {/* Transaction Information */}
      <section className="p-2 w-full flex">
        <section className="bg-bg2 p-4 rounded-lg w-full">
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Transaction Information</h2>
          </header>

          <section className="mt-2 flex flex-wrap gap-y-2">
            <div className="w-1/5">
              <p className="text-xs font-bold">Total Payment</p>
              <p>{moneyFormatter.format(invoice?.total ?? 0)}</p>
            </div>

            <div className="w-1/5">
              <p className="text-xs font-bold">Hours Taken</p>
              <p>{invoice?.estimatedParkingDurationInHours} Hours</p>
            </div>

            <div className="w-1/5">
              <p className="text-xs font-bold">Start At</p>
              <p>{dateFormatter.format(startAtDate)}</p>
            </div>

            <div className="w-1/5">
              <p className="text-xs font-bold">End At</p>
              <p>{dateFormatter.format(endAtDate)}</p>
            </div>

            <div className="w-1/5">
              <p className="text-xs font-bold">Paid At</p>
              <p>{dateFormatter.format(paidAtDate)}</p>
            </div>
          </section>
        </section>
      </section>

      {/* Customer Information */}
      <section className="p-2 w-1/2 flex">
        <section className="bg-bg2 p-4 rounded-lg w-full">
          <section>
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Customer Information</h2>
              <MyButton
                onClick={() => {
                  navigate("/users/" + invoice?.parkingLotUuid);
                }}
              >
                View
              </MyButton>
            </header>

            <section className="mt-2 flex flex-wrap gap-y-2">
              <div className="w-1/3">
                <p className="text-xs font-bold">First Name</p>
                <p>{invoice?.vehicle?.owner?.firstName ?? "No First Name"}</p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Last Name</p>
                <p>{invoice?.vehicle?.owner?.firstName ?? "No Last Name"}</p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Phone</p>
                <p>{invoice?.vehicle?.owner?.phone ?? "No Phone"}</p>
              </div>

              <div className="w-full">
                <p className="text-xs font-bold">Email</p>
                <p>{invoice?.vehicle?.owner?.email ?? "No Email"}</p>
              </div>
            </section>
          </section>
          <section className="mt-8">
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Customer Vehicle</h2>
            </header>

            <section className="mt-2 flex flex-wrap gap-y-2">
              <div className="w-1/3">
                <p className="text-xs font-bold">Plate Number</p>
                <p>
                  {invoice?.vehicle?.plateNumber ??
                    invoice?.plateNumber ??
                    "Unknown Plate Number"}
                </p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Vehicle Color</p>
                <p>{invoice.vehicle?.color ?? "Unknown Color"}</p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Vehicle Brand</p>
                <p>{invoice.vehicle?.model?.brand?.name ?? "Unknown Brand"}</p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Vehicle Model</p>
                <p>{invoice.vehicle?.model?.brand?.name ?? "Unknown Model"}</p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Vehicle Type</p>
                <p>{invoice?.vehicle?.model?.type?.name ?? "Unknown Type"}</p>
              </div>
            </section>
          </section>
        </section>
      </section>

      {/* Parking Lot Information */}
      <section className="p-2 w-1/2 flex">
        <section className="bg-bg2 p-4 rounded-lg w-full">
          <section>
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Parking Lot Information</h2>
              <MyButton
                onClick={() => {
                  navigate("/parking-lots/" + invoice?.parkingLotUuid);
                }}
              >
                View
              </MyButton>
            </header>

            <section className="mt-2 flex flex-wrap gap-y-2">
              <div className="w-1/3">
                <p className="text-xs font-bold">Name</p>
                <p>{invoice?.parkingLot?.name}</p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Open hours</p>
                <p>{timeFormatter.format(parkingLotStartDate)}</p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Closing hours</p>
                <p>{timeFormatter.format(parkingLotEndDate)}</p>
              </div>

              <div className="w-full">
                <p className="text-xs font-bold">Address</p>
                <p>{invoice?.parkingLot?.address}</p>
              </div>
            </section>
          </section>

          <section className="mt-8">
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Parking Lot Rate</h2>
            </header>
            <section className="mt-2 flex flex-wrap gap-y-2">
              <div className="w-1/3">
                <p className="text-xs font-bold">Starting Fare</p>
                <p>
                  {moneyFormatter.format(
                    invoice?.parkingLot?.rate?.startingRate ?? 0
                  )}
                </p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Free hours</p>
                <p>{invoice?.parkingLot?.rate?.freeHours} Hours</p>
              </div>

              <div className="w-1/3">
                <p className="text-xs font-bold">Rate</p>
                <p>
                  {moneyFormatter.format(invoice?.parkingLot?.rate?.rate ?? 0)}{" "}
                  / {invoice?.parkingLot?.rate?.interval}
                </p>
              </div>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}

export default InvoiceProfilePage;
