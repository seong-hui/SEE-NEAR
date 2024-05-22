import styled from "styled-components";
import WeeklyPagination from "@/components/pagination/WeeklyPagination";

const Analysis = () => {
  return (
    <AnalysisLayout>
      <WeeklyPagination />
    </AnalysisLayout>
  );
};

const AnalysisLayout = styled.div`
  width: 100%;
`;
export default Analysis;
