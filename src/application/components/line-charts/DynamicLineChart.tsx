import { message } from "antd";
import React from "react";
import Chart from "react-apexcharts";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import { CommonSeries } from "../../../domain/models/CommonModel";

type Props = {
  getData: () => Promise<
    | (AxiosResponseData & {
        data: { series: CommonSeries[]; categories: string[] };
      })
    | AxiosResponseError
  >;
};

function DynamicLineChart({ getData }: Props) {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [series, setSeries] = React.useState<
    { name: string; data: number[] }[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories,
    },
  };

  React.useEffect(() => {
    async function fetchData() {
      const response = await getData();

      if (response.errors) {
        message.error("Failed to fetch data.");
      } else {
        setSeries(response.data.series);
        setCategories(response.data.categories);
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        height={500}
      />
    </div>
  );
}

export default DynamicLineChart;
