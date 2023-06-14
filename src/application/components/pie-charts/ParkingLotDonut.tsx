import React from "react";
import { parkingLotGetDonut } from "../../../domain/services/parkingLotService";
import { message } from "antd";
import DynamicDonut from "./DynamicDonut";

function ParkingLotDonut() {
  const [loading, setLoading] = React.useState(true);
  const [series, setSeries] = React.useState<number[]>([]);
  const [labels, setLabels] = React.useState<string[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await parkingLotGetDonut();

      if (response.errors) {
        if (response.errors.length > 0) {
          message.error("Parking lot donut failed");
        }
      } else {
        const data = response.data;

        setSeries(data.series);
        setLabels(data.labels);
        setLoading(false);
      }
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);

  return <DynamicDonut series={series} labels={labels} loading={loading} />;
}

export default ParkingLotDonut;
