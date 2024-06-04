import Analysis from "./Analysis";
import { useGetWeeklyData } from "@/api/query/reactQuery";
import { formatDate } from "@/utils/formatDateUtils";
import { dummyData } from "./dummy";
import { WeeklyData } from "@/dto/dto";
interface AnalysisContainerProps {
  selectedDate: Date;
}

const AnalysisContainer = ({ selectedDate }: AnalysisContainerProps) => {
  const {
    data: weeklyData,
    error,
    isError,
  } = useGetWeeklyData(formatDate(selectedDate));
  if (isError) {
    console.error(error);
  }
  const weeklyDataTyped: WeeklyData = weeklyData || {
    counts: [],
    averages: [],
    variances: [],
  };
  return <Analysis weeklyData={dummyData} />;
};

export default AnalysisContainer;
