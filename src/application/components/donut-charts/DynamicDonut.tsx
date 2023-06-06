import { Spin } from "antd";
import Chart from "react-apexcharts";

type Props = {
  series: number[];
  labels: string[];
  loading: boolean;
};

function DynamicDonut({ series, labels, loading }: Props) {
  return (
    <div className="relative">
      {loading && (
        <div className="z-[1] absolute h-full w-full bg-white bg-opacity-75 flex items-center justify-center">
          <Spin />
        </div>
      )}
      <Chart
        series={series}
        options={{
          labels,
          legend: {
            labels: {
              colors: "var(--t1)",
            },
          },
        }}
        type="donut"
        width="100%"
      />
    </div>
  );
}

export default DynamicDonut;
