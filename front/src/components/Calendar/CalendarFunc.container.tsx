import CalendarFunc from "@/components/Calendar/CalenderFunc";
import { formatDateToYYYYMM } from "@/utils/formatDateUtils";
import { useState } from "react";
import { useGeEmotions } from "@/api/query/reactQuery";

interface CalendarFuncContainerProps {
  selectedDate: Date;
  changeDate: (date: Date) => void;
}

const CalendarFuncContainer = ({
  selectedDate,
  changeDate,
}: CalendarFuncContainerProps) => {
  const selectMonth = formatDateToYYYYMM(selectedDate);
  const [activeMonth, setActiveMonth] = useState(selectMonth);

  const onMonthChange = (startDate: Date) => {
    setActiveMonth(formatDateToYYYYMM(startDate));
  };

  const { data: emotionData = [], error, isError } = useGeEmotions(activeMonth);
  if (isError) {
    console.error(error);
  }

  return (
    <CalendarFunc
      onClickDay={changeDate}
      selectedDate={selectedDate}
      onMonthChange={onMonthChange}
      emotionData={emotionData}
    />
  );
};

export default CalendarFuncContainer;
