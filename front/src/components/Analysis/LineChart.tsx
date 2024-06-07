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
  colors: ["#FE9FAB", "#FEE471", "#39D4C0", "#01AFDA"],
  xaxis: {
    categories: ["월", "화", "수", "목", "금", "토", "일"],
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
};

// const series = [
//   {
//     name: "부정",
//     data: [45, 52, 38, 24, 33, 26, 21],
//   },
//   {
//     name: "행복",
//     data: [35, 41, 62, 42, 13, 18, 29],
//   },
//   {
//     name: "보통",
//     data: [87, 57, 74, 99, 75, 38, 62],
//   },
//   {
//     name: "슬픔",
//     data: [38, 62, 47, 82, 56, 45, 47],
//   },
// ];

type EmotionKeys = keyof AverageData;

const transformData = (countsData: AverageData[]): TransformedData[] => {
  const transformedData: TransformedData[] = [];

  for (let i = 0; i < 4; i++) {
    const emotionName = `emotion_${i}_mean` as EmotionKeys;
    const emotionData = {
      name: emotionName,
      data: countsData.map((item) => item[emotionName]),
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
