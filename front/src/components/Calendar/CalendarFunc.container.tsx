import CalendarFunc from "@/components/Calendar/CalenderFunc";
import { selectedDateState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import { formatDateToYYYYMM } from "@/utils/formatDateUtils";
import { useState, useEffect } from "react";
import { axiosGetEmotion } from "@/api/axios/axiosCustom";
import { EmotionDto } from "@/dto/dto";

const CalendarFuncContainer = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const selectMonth = formatDateToYYYYMM(selectedDate);
  const onClickDay = (date: Date) => {
    setSelectedDate(date);
  };
  const [activeMonth, setActiveMonth] = useState(selectMonth);
  const [emotionData, setEmotionData] = useState<EmotionDto[]>([]);

  const onMonthChange = (startDate: Date) => {
    setActiveMonth(formatDateToYYYYMM(startDate));
  };

  useEffect(() => {
    console.log(activeMonth);
    const fetchData = async () => {
      try {
        const response = await axiosGetEmotion(activeMonth);
        setEmotionData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [activeMonth]);
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
