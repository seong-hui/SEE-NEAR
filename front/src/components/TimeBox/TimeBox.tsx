import styled from "styled-components";
import { useState, useEffect } from "react";
import { currentTimer } from "@/utils/timerUtils";

const TimeBox = () => {
  const [timer, setTimer] = useState("0000년 00월 00일 00시 00분 00초");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = currentTimer();
      setTimer(newTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return <TimeBoxStyled>{timer}</TimeBoxStyled>;
};

const TimeBoxStyled = styled.div`
  font-size: 80px;
  font-weight: bold;
`;

export default TimeBox;
