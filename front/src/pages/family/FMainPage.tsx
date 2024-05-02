import styled from "styled-components";
import LeftNavContainer from "@/components/LeftNav/LeftNav.container";
import CalendarFuncContainer from "@/components/Calendar/CalendarFunc.container";
import DailySectionContainer from "@/components/DailySection/DailySection.container";

const FMainPage = () => {
  return (
    <FMainPageStyled>
      <LeftNavContainer />
      <CalendarFuncContainer />
      <DailySectionContainer />
    </FMainPageStyled>
  );
};

const FMainPageStyled = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
`;
export default FMainPage;
