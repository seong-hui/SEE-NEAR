import styled from "styled-components";
import LogoImg from "@/assets/images/seenearIcon.svg";
import { useState } from "react";

const MainPage = () => {
  const [timer, setTimer] = useState("00시 00분 00초");

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setTimer(`${hours}시 ${minutes}분 ${seconds}초`);
  };

  const startTimer = () => {
    setInterval(currentTimer, 1000);
  };

  const today = new Date();

  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  startTimer();

  return (
    <MainPageStyled>
      <CurrentTimeStyled>
        {formattedDate} {timer}
      </CurrentTimeStyled>
      <ConstantBoxWapped>
        <ContentBoxStyled>
          <LogoImgStyled src={LogoImg} />
          <ContentTitle>대화하기</ContentTitle>
        </ContentBoxStyled>
        <ContentBoxStyled>
          <ScheduleTitle>오늘의 일정</ScheduleTitle>
        </ContentBoxStyled>
      </ConstantBoxWapped>
    </MainPageStyled>
  );
};

const MainPageStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--point-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CurrentTimeStyled = styled.div`
  font-size: 80px;
  font-weight: bold;
`;

const ConstantBoxWapped = styled.div`
  display: flex;
`;

const ContentBoxStyled = styled.div`
  width: 650px;
  height: 650px;
  background-color: var(--sub-color);
  border-radius: 20px;
  margin: 30px;
  padding: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImgStyled = styled.img`
  width: 600px;
  height: 600px;
`;

const ScheduleTitle = styled.div`
  font-size: 60px;
`;

const ContentTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

export default MainPage;
