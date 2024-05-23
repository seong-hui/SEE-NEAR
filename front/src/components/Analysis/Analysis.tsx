import styled from "styled-components";
import ApexChart from "apexcharts";

const Analysis = () => {
  return (
    <AnalysisLayout>
      <AnalysisColBox>
        <DataBoxWrapper>
          <DateTitle>주간 키워드</DateTitle>
          <DataBox>
            <KeywordBox>
              <NumBox>1</NumBox>
              <KeywordText>저녁 식사</KeywordText>
            </KeywordBox>
            <KeywordBox>
              <NumBox>2</NumBox>
              <KeywordText>꽃놀이</KeywordText>
            </KeywordBox>
            <KeywordBox>
              <NumBox>3</NumBox>
              <KeywordText>임영웅</KeywordText>
            </KeywordBox>
          </DataBox>
        </DataBoxWrapper>
        <DataBoxWrapper>
          <DateTitle>주간 감정</DateTitle>
          <DataBox>{/* <ApexCharts /> */}</DataBox>
        </DataBoxWrapper>
      </AnalysisColBox>
      <AnalysisColBox>
        <DataBoxWrapper>
          <DateTitle>주간 키워드</DateTitle>
          <DataBox>
            <KeywordBox>
              <NumBox>1</NumBox>
              <KeywordText>저녁 식사</KeywordText>
            </KeywordBox>
            <KeywordBox>
              <NumBox>2</NumBox>
              <KeywordText>꽃놀이</KeywordText>
            </KeywordBox>
            <KeywordBox>
              <NumBox>3</NumBox>
              <KeywordText>임영웅</KeywordText>
            </KeywordBox>
          </DataBox>
        </DataBoxWrapper>
        <DataBoxWrapper>
          <DateTitle>주간 감정</DateTitle>
          <DataBox>
            <KeywordBox>
              <NumBox>1</NumBox>
              <KeywordText>저녁 식사</KeywordText>
            </KeywordBox>
            <KeywordBox>
              <NumBox>2</NumBox>
              <KeywordText>꽃놀이</KeywordText>
            </KeywordBox>
            <KeywordBox>
              <NumBox>3</NumBox>
              <KeywordText>임영웅</KeywordText>
            </KeywordBox>
          </DataBox>
        </DataBoxWrapper>
      </AnalysisColBox>
    </AnalysisLayout>
  );
};

const AnalysisLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const AnalysisColBox = styled.div`
  display: flex;
  gap: 35px;
  margin-bottom: 30px;
`;

const DataBoxWrapper = styled.div``;

const DataBox = styled.div`
  border: 1px solid #eaeaea;
  background-color: white;
  height: 240px;
  border-radius: 15px;
  padding: 0 20px 15px;
`;

const DateTitle = styled.h3`
  font-size: 20px;
  margin: 0 0 15px 10px;
`;

const KeywordBox = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }
  padding: 15px 0;
  display: flex;
  gap: 16px;
`;

const NumBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f1f6fc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--main-color);
  font-weight: bold;
  font-size: 20px;
`;

const KeywordText = styled.p`
  font-weight: bold;
  width: 120px;
`;
export default Analysis;