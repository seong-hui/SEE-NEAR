import styled from "styled-components";
import { useState } from "react";

interface WeeklyPaginationProps {
  handleDateChange: (date: Date) => void;
}

const WeeklyPagination = ({ handleDateChange }: WeeklyPaginationProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleWeekChange = (direction: "previous" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "previous") {
      newDate.setDate(newDate.getDate() - 7);
    } else if (direction === "next") {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
    handleDateChange(newDate);
  };

  const startOfWeek = new Date(currentDate);
  const diff =
    startOfWeek.getDate() -
    startOfWeek.getDay() +
    (startOfWeek.getDay() === 0 ? -6 : 1);
  startOfWeek.setDate(diff);

  const weekNumber = Math.floor(startOfWeek.getDate() / 7 + 1);

  return (
    <WeeklyPaginationLayout>
      <NextBtn onClick={() => handleWeekChange("previous")}>〈</NextBtn>
      <WeekTitleBox>
        <WeekTitle>{`${
          currentDate.getMonth() + 1
        }월 ${weekNumber}번째 주`}</WeekTitle>
        <WeekDetail>{`${
          startOfWeek.getMonth() + 1
        }.${startOfWeek.getDate()} ~ ${
          startOfWeek.setDate(startOfWeek.getDate() + 6) &&
          startOfWeek.getMonth() + 1
        }.${startOfWeek.getDate()} (${startOfWeek.getFullYear()})`}</WeekDetail>
      </WeekTitleBox>
      <NextBtn onClick={() => handleWeekChange("next")}>〉</NextBtn>
    </WeeklyPaginationLayout>
  );
};

const WeeklyPaginationLayout = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NextBtn = styled.button`
  border: 1.2px solid #eaeaea;
  border-radius: 15px;
  width: 44px;
  height: 44px;
  background-color: var(--background-color);
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const WeekTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const WeekTitle = styled.div`
  font-size: 24px;
`;
const WeekDetail = styled.div`
  font-size: 14px;
  color: gray;
`;

export default WeeklyPagination;
