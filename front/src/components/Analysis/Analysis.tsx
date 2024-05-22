import styled from "styled-components";

const Analysis = () => {
  return (
    <AnalysisLayout>
      <AnalysisColBox>
        <DataBox>
          <DateTitle>주간 키워드</DateTitle>
          <KeywordDataBox>
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
          </KeywordDataBox>
        </DataBox>
      </AnalysisColBox>
      <AnalysisColBox></AnalysisColBox>
    </AnalysisLayout>
  );
};

const AnalysisLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const AnalysisColBox = styled.div``;

const DataBox = styled.div``;
const KeywordDataBox = styled.div`
  border: 1px solid #eaeaea;
  background-color: white;
  width: 190px;
  height: 240px;
  border-radius: 15px;
  padding: 15px 20px;
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
`;
export default Analysis;
