import CalendarFunc from "@/components/Calendar/CalenderFunc";
import { selectedDateState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import { formatDateToYYYYMM } from "@/utils/formatDateUtils";
import { useState } from "react";
import { useGeEmotions } from "@/api/query/reactQuery";

const CalendarFuncContainer = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const selectMonth = formatDateToYYYYMM(selectedDate);
  const onClickDay = (date: Date) => {
    setSelectedDate(date);
  };
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
      onClickDay={onClickDay}
      selectedDate={selectedDate}
      onMonthChange={onMonthChange}
      emotionData={emotionData}
    />
  );
};

export default CalendarFuncContainer;
