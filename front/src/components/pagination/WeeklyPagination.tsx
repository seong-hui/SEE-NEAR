import styled from "styled-components";

const WeeklyPagination = () => {
  return (
    <WeeklyPaginationLayout>
      <NextBtn>〈</NextBtn>
      <WeekTitleBox>
        <WeekTitle>5월 3번째 주</WeekTitle>
        <WeekDetail>05.19 ~ 05.25 (2024)</WeekDetail>
      </WeekTitleBox>
      <NextBtn>〉</NextBtn>
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
