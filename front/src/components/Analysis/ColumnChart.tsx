import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const data = [
  { month: "월", revenue: 12 },
  { month: "화", revenue: 18 },
  { month: "수", revenue: 20 },
  { month: "목", revenue: 15 },
  { month: "금", revenue: 25 },
  { month: "토", revenue: 25 },
  { month: "일", revenue: 25 },
];

const options: ApexOptions = {
  theme: {
    mode: "light",
  },
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 3,
    },
  },
  colors: ["#FE9FAB"],
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
    name: "부정 감정",
    data: data.map((item) => item.revenue),
  },
];

const ColumnChart = () => {
  return (
    // @ts-ignore
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height="240"
      width="380"
    />
  );
};

export default ColumnChart;
