import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { CountData, TransformedData } from "@/dto/dto";

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
    name: "emotion_0_count",
    data: [44, 55, 41, 37, 22, 43, 21],
  },
  {
    name: "emotion_1_count",
    data: [53, 32, 33, 52, 13, 43, 32],
  },
  {
    name: "emotion_2_count",
    data: [12, 17, 11, 9, 15, 11, 20],
  },
  {
    name: "emotion_3_count",
    data: [9, 7, 5, 8, 6, 9, 4],
  },
];

type EmotionKeys = keyof CountData;

const transformData = (countsData: CountData[]): TransformedData[] => {
  const transformedData: TransformedData[] = [];

  for (let i = 0; i < 4; i++) {
    const emotionName = `emotion_${i}_count` as EmotionKeys;
    const emotionData = {
      name: emotionName,
      data: countsData.map((item) => item[emotionName]),
    };
    transformedData.push(emotionData);
  }

  return transformedData;
};

interface StackedChartProps {
  data: CountData[];
}

const StackedChart = ({ data }: StackedChartProps) => {
  const transformedData: TransformedData[] = transformData(data);
  return (
    // @ts-ignore
    <ReactApexChart
      options={options}
      series={transformedData}
      type="bar"
      height="240"
      width="580"
    />
  );
};

export default StackedChart;
