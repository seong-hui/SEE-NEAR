import { styled } from "styled-components";

const DailySection = () => {
  return (
    <DailySectionStyled>
      <TodayDateStyled>4월 12일 금요일</TodayDateStyled>
      <TodoBoxStyled>
        <BoxTitleStyled>오늘의 일정</BoxTitleStyled>
      </TodoBoxStyled>
      <KeywordBoxStyled>
        <BoxTitleStyled>오늘의 키워드</BoxTitleStyled>
      </KeywordBoxStyled>
    </DailySectionStyled>
  );
};

const DailySectionStyled = styled.div`
  width: 280px;
  height: 100%;
  background-color: var(--sub-color);
  padding: 50px 40px;
  border-left: 1px solid var(--light-grey-color);
  border-top-left-radius: 20px;
`;
const TodayDateStyled = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
const TodoBoxStyled = styled.div``;
const BoxTitleStyled = styled.div`
  font-weight: bold;
  margin: 30px 0;
`;

const KeywordBoxStyled = styled.div``;
export default DailySection;
