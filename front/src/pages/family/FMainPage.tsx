import styled from "styled-components";
import LeftNavContainer from "@/components/LeftNav/LeftNav.container";
import CalendarFuncContainer from "@/components/Calendar/CalendarFunc.container";
import DailySectionContainer from "@/components/DailySection/DailySection.container";
import { formatDateToYYYYMM } from "@/utils/formatDateUtils";


const FMainPage = () => {
  return (
    <FMainPageStyled>
      <LeftNavContainer />
      <MainSection>
        <CalendarFuncContainer />
      </MainSection>
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

const MainSection = styled.section`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default FMainPage;
