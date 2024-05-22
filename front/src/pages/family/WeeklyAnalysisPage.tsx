import styled from "styled-components";
import LeftNavContainer from "@/components/LeftNav/LeftNav.container";
import AnalysisContainer from "@/components/Analysis/AnalysisContainer";
import WeeklyPagination from "@/components/pagination/WeeklyPagination";

const WeeklyAnalysisPage = () => {
  return (
    <WeeklyAnalysisPageLayout>
      <LeftNavContainer />
      <AnalysisSection>
        <SectionTitle>주간 분석</SectionTitle>
        <AnalysisContent>
          <WeeklyPagination />
          <AnalysisContainer />
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

const SectionTitle = styled.h1`
  font-size: 32px;
  display: flex;
  width: 100%;
  margin: 0;
`;

const AnalysisSection = styled.section`
  width: 100%;
  padding: 40px;
  margin: 0 100px;
`;

const AnalysisContent = styled.section`
  width: 100%;
  margin-top: 60px;
`;

export default WeeklyAnalysisPage;
