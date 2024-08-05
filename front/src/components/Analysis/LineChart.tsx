import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { AverageData, TransformedData } from "@/dto/dto";

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
  colors: ["#FE9FAB", "#FFA949", "#39D4C0", "#01AFDA"],
  xaxis: {
    categories: ["월", "화", "수", "목", "금", "토", "일"],
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
};

type EmotionKeys = keyof AverageData;

const transformData = (countsData: AverageData[]): TransformedData[] => {
  const transformedData: TransformedData[] = [];
  const emotionNames = ["화남", "슬픔", "평온", "행복"];

  for (let i = 0; i < 4; i++) {
    const emotionName = emotionNames[i];
    const emotionKey = `emotion_${i}_mean` as EmotionKeys;
    const emotionData = {
      name: emotionName,
      data: countsData.map((item) => item[emotionKey]),
    };
    transformedData.push(emotionData);
  }

  return transformedData;
};

interface LineChartProps {
  data: AverageData[];
}

const LineChart = ({ data }: LineChartProps) => {
  const transformedData: TransformedData[] = transformData(data);
  return (
    // @ts-ignore
    <ReactApexChart
      options={options}
      series={transformedData}
      height="240"
      width="380"
    />
  );
};

export default LineChart;
