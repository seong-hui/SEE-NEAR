import styled from "styled-components";
import LeftNavContainer from "@/components/LeftNav/LeftNav.container";
import AnalysisContainer from "@/components/Analysis/AnalysisContainer";
import WeeklyPagination from "@/components/pagination/WeeklyPagination";
import { useState } from "react";

const getMondayFromDate = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const WeeklyAnalysisPage = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    return getMondayFromDate(new Date());
  });

  const handleDateChange = (date: Date) => {
    const mondayDate = getMondayFromDate(date);
    setSelectedDate(mondayDate);
  };

  return (
    <WeeklyAnalysisPageLayout>
      <LeftNavContainer />
      <AnalysisSection>
        <AnalysisContent>
          <WeeklyPagination handleDateChange={handleDateChange} />
          <AnalysisContainer selectedDate={selectedDate} />
        </AnalysisContent>
      </AnalysisSection>
    </WeeklyAnalysisPageLayout>
  );
};

const WeeklyAnalysisPageLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
`;

const AnalysisSection = styled.section`
  width: 100%;
  padding: 40px;
  margin: 0 100px;
`;

const AnalysisContent = styled.section`
  width: 100%;
`;

export default WeeklyAnalysisPage;
