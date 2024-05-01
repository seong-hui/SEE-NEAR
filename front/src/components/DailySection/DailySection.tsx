import { styled } from "styled-components";
import TodoContainer from "@/components/Todo/Todo.container";
import KeywordContainer from "@/components/Keyword/Keyword.container";
import { useRecoilValue } from "recoil";
import { selectedDateState } from "@/recoil/atom";
import { formatDate2 } from "@/utils/formatDateUtils";

const DailySection = () => {
  const currentDate = useRecoilValue(selectedDateState);

  return (
    <DailySectionStyled>
      <TodayDateStyled>{formatDate2(currentDate)}</TodayDateStyled>
      <TodoBoxStyled>
        <BoxTitleStyled>오늘의 일정</BoxTitleStyled>
        <TodoContainer />
      </TodoBoxStyled>
      <KeywordBoxStyled>
        <BoxTitleStyled>오늘의 키워드</BoxTitleStyled>
        <KeywordContainer />
      </KeywordBoxStyled>
    </DailySectionStyled>
  );
};

const DailySectionStyled = styled.div`
  width: 280px;
  height: 100%;
  background-color: #cddbed;
  padding: 50px 40px;
  border-left: 1px solid var(--light-grey-color);
  border-top-left-radius: 30px;
`;
const TodayDateStyled = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
const TodoBoxStyled = styled.div``;
const BoxTitleStyled = styled.div`
  font-weight: bold;
  margin: 30px 0 15px;
`;

const KeywordBoxStyled = styled.div``;
export default DailySection;
