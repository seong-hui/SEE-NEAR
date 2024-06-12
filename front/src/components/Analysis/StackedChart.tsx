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
  colors: ["#FE9FAB", "#FFA949", "#39D4C0", "#01AFDA"],
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

type EmotionKeys = keyof CountData;

const transformData = (countsData: CountData[]): TransformedData[] => {
  const transformedData: TransformedData[] = [];
  const emotionNames = ["화남", "슬픔", "평온", "행복"];

  for (let i = 0; i < 4; i++) {
    const emotionKey = `emotion_${i}_count` as EmotionKeys;
    const emotionName = emotionNames[i];
    const emotionData = {
      name: emotionName,
      data: countsData.map((item) => item[emotionKey]),
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
