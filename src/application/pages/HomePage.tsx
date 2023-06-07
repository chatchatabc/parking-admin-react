import { useNavigate } from "react-router-dom";
import UsersTable from "../components/tables/UsersTable";
import MyButton from "../components/common/MyButton";
import { DashboardPieGraph } from "../../domain/models/DashboardModel";
import React from "react";
import DynamicDonut from "../components/donut-charts/DynamicDonut";
import { dashboardGetPieGraph } from "../../domain/services/dashboardService";
import { message } from "antd";

function HomePage() {
  const navigate = useNavigate();
  const [pieChart, setPieChart] = React.useState<DashboardPieGraph>({
    parkingLotUnverifiedCount: 0,
    parkingLotVerifiedCount: 0,
    userUnverifiedCount: 0,
    userVerifiedCount: 0,
    vehicleUnverifiedCount: 0,
    vehicleVerifiedCount: 0,
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const response = await dashboardGetPieGraph();

      if (response.errors) {
        if (response.errors.length > 0) {
          message.error("Dashboard pie graph failed");
        }
      } else {
        const data = response.data;
        setPieChart(data);
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);

  return (
    <div className="flex flex-wrap p-2 bg-bg1">
      <section className="p-2 w-1/3">
        <section className="w-full bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Parking Lots Verified</h2>
            <MyButton
              onClick={() => {
                navigate("/parking-lots");
              }}
            >
              Open
            </MyButton>
          </header>

          <section>
            <DynamicDonut
              series={[
                pieChart.parkingLotUnverifiedCount,
                pieChart.parkingLotVerifiedCount,
              ]}
              labels={["Unverified", "Verified"]}
              loading={loading}
            />
          </section>
        </section>
      </section>

      <section className="p-2 w-1/3">
        <section className="w-full bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Users Verified</h2>
            <MyButton
              onClick={() => {
                navigate("/users");
              }}
            >
              Open
            </MyButton>
          </header>

          <section>
            <DynamicDonut
              series={[
                pieChart.userUnverifiedCount,
                pieChart.userVerifiedCount,
              ]}
              labels={["Unverified", "Verified"]}
              loading={loading}
            />
          </section>
        </section>
      </section>

      <section className="p-2 w-1/3">
        <section className="w-full bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Vehicles Verified</h2>
            <MyButton
              onClick={() => {
                navigate("/vehicles");
              }}
            >
              Open
            </MyButton>
          </header>

          <section>
            <DynamicDonut
              series={[
                pieChart.vehicleUnverifiedCount,
                pieChart.vehicleVerifiedCount,
              ]}
              labels={["Unverified", "Verified"]}
              loading={loading}
            />
          </section>
        </section>
      </section>

      {/* <section className="p-2 w-full">
        <section className="w-full bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Parking Lots Table</h2>
            <MyButton
              onClick={() => {
                navigate("/parking-lots");
              }}
            >
              Open
            </MyButton>
          </header>
          <section className="mt-2">
            <ParkingTable showPagination={false} />
          </section>
        </section>
      </section> */}

      <section className="p-2 w-full">
        <section className="w-full bg-bg2 p-4 rounded-lg">
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Users Table</h2>
            <MyButton
              onClick={() => {
                navigate("/users");
              }}
            >
              Open
            </MyButton>
          </header>
          <section className="mt-2">
            <UsersTable showPagination={false} />
          </section>
        </section>
      </section>
    </div>
  );
}

export default HomePage;
