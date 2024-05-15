import CalendarFunc from "@/components/Calendar/CalenderFunc";
import { selectedDateState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

const CalendarFuncContainer = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const onClickDay = (date: Date) => {
    setSelectedDate(date);
  };
  return <CalendarFunc onClickDay={onClickDay} selectedDate={selectedDate} />;
};

export default CalendarFuncContainer;
