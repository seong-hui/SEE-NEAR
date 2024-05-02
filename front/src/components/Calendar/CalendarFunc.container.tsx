import CalendarFunc from "@/components/Calendar/CalenderFunc";
import { useState } from "react";
import { formatDate } from "@/utils/formatDateUtils";

const CalendarFuncContainer = () => {
  // const [value, setValue] = useState(new Date());
  // const onClickDay = (date: Date) => {
  //   setValue(date);
  //   console.log("Selected date:", formatDate(date));
  // };
  return <CalendarFunc />;
};

export default CalendarFuncContainer;
