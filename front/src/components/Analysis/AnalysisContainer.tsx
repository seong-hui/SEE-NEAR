import Analysis from "./Analysis";
import { useGetWeeklyData } from "@/api/query/reactQuery";
import { formatDate } from "@/utils/formatDateUtils";
import { WeeklyData } from "@/dto/dto";
import { useMemo } from "react";
interface AnalysisContainerProps {
  selectedDate: Date;
}

const AnalysisContainer = ({ selectedDate }: AnalysisContainerProps) => {
  const formattedDate = useMemo(() => formatDate(selectedDate), [selectedDate]);
  const { data: weeklyData, error, isError } = useGetWeeklyData(formattedDate);

  if (isError) {
    console.error(error);
  }
  const weeklyDataTyped: WeeklyData = weeklyData || {
    keywords: [],
    counts: [],
    averages: [],
    variances: [],
  };

  // const { data: keywordImg } = useGetKeywordImg(formattedDate);

  return <Analysis weeklyData={weeklyDataTyped} />;
};

export default AnalysisContainer;
