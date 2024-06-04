import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const options: ApexOptions = {
  theme: {
    mode: "light",
  },
  chart: {
    type: "line",
  },
  plotOptions: {
    bar: {
      borderRadius: 3,
    },
  },
  colors: ["#FE9FAB", "#FEE471", "#39D4C0", "#01AFDA"],
  xaxis: {
    categories: ["월", "화", "수", "목", "금", "토", "일"],
  },
  yaxis: {
    labels: {
      show: false,
      formatter: function (val) {
        return val + "개";
      },
    },
  },
};

const series = [
  {
    name: "부정",
    data: [45, 52, 38, 24, 33, 26, 21],
  },
  {
    name: "행복",
    data: [35, 41, 62, 42, 13, 18, 29],
  },
  {
    name: "보통",
    data: [87, 57, 74, 99, 75, 38, 62],
  },
  {
    name: "슬픔",
    data: [38, 62, 47, 82, 56, 45, 47],
  },
];

const LineChart = () => {
  return (
    // @ts-ignore
    <ReactApexChart
      options={options}
      series={series}
      height="240"
      width="380"
    />
  );
};

export default LineChart;
