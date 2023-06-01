import { Spin, message } from "antd";
import React from "react";
import ErrorMessageComp from "../../components/ErrorMessageComp";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import { parkingLotGet } from "../../../domain/services/parkingService";
import { Parking } from "../../../domain/models/ParkingModel";

function ParkingProfile() {
  const [data, setData] = React.useState<Parking | null>(null);
  const [loading, setLoading] = React.useState(true);

  const { identifier } = useParams();

  const identifiers = identifier?.split("-");

  if (!identifiers || (identifiers[0] !== "u" && identifiers[0] !== "p")) {
    return <NotFoundPage />;
  }

  const username = identifiers[0] === "u" ? identifiers[1] : undefined;
  const phone = identifiers[0] === "p" ? identifiers[1] : undefined;

  React.useEffect(() => {
    async function fetchData() {
      const response = await parkingLotGet({ username, phone });

      if (response.errors) {
        message.error("Failed to fetch user.");
      } else {
        setData(response.data);
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);

  if (loading) {
    <div>
      <Spin />
    </div>;
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

  return (
    <div className="px-4 flex flex-1 gap-4">
      {/* Left */}
      <section className="w-1/3">
        {/* 1st Entry */}
        <section className="border-2 bg-bg1 p-2 rounded-lg border-primary">
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">User Profile</h2>
            <button className="bg-primary ml-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary">
              View
            </button>
          </header>

          <section></section>
        </section>
      </section>

      {/* Right */}
      <section className="w-2/3">
        {/* 1st Entry */}
        <section className="border-2 bg-bg1 p-2 rounded-lg border-primary">
          {/* Header */}
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Parking Information</h2>
            <button className="bg-primary ml-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary">
              Edit
            </button>
          </header>

          {/* Body */}
          <section className="mt-2 flex flex-wrap gap-y-2">
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
          </section>
        </section>
      </section>
    </div>
  );
}

export default ParkingProfile;
