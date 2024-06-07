import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { VarianceData } from "@/dto/dto";

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
  dataLabels: {
    enabled: false,
  },
  colors: ["#FE9FAB"],
  xaxis: {
    categories: ["월", "화", "수", "목", "금", "토", "일"],
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
};

interface ColumnChartProps {
  data: VarianceData[];
}
const ColumnChart = ({ data }: ColumnChartProps) => {
  const series = [
    {
      name: "감정 분산",
      data: data.map((item) => item.variance),
    },
  ];
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
