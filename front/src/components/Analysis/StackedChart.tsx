import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const options: ApexOptions = {
  theme: {
    mode: "light",
  },
  chart: {
    type: "bar",
    stacked: true,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 3,
    },
  },
  colors: ["#FE9FAB", "#FEE471", "#39D4C0", "#01AFDA"],
  yaxis: {
    title: {
      text: undefined,
    },
  },
  xaxis: {
    categories: ["월", "화", "수", "목", "금", "토", "일"],
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
    data: [44, 55, 41, 37, 22, 43, 21],
  },
  {
    name: "행복",
    data: [53, 32, 33, 52, 13, 43, 32],
  },
  {
    name: "보통",
    data: [12, 17, 11, 9, 15, 11, 20],
  },
  {
    name: "슬픔",
    data: [9, 7, 5, 8, 6, 9, 4],
  },
];

const StackedChart = () => {
  return (
    // @ts-ignore
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height="240"
      width="600"
    />
  );
};

export default StackedChart;
