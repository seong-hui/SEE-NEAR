import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { styled } from "styled-components";

const CalendarFunc = () => {
  const [today, setToday] = useState(new Date());
  const onChangeToday = () => {
    setToday(today);
  };

  return (
    <>
      <StyleCalendar onChange={onChangeToday} value={today} />
    </>
  );
};

export const StyleCalendar = styled(Calendar)`
  width: 700px;
  padding: 20px;
  .react-calendar {
    width: 500px;
    max-width: 100%;
    background: white;
    border: 1px solid #a0a096;
    line-height: 1.125em;
  }

  .react-calendar__tile--now {
    background: var(--main-color);
    color: white;
    border-radius: 50px;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: var(--main-color);
    color: white;
  }
`;
export default CalendarFunc;
