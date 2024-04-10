import styled from "styled-components";
import LogoImg from "@/assets/images/seenearIcon.svg";
import { useState, useEffect } from "react";
import { currentTimer } from "@/utils/timerUtils";

const MainPage = () => {
  const [timer, setTimer] = useState("0000년 00월 00일 00시 00분 00초");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = currentTimer();
      setTimer(newTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MainPageStyled>
      <CurrentTimeStyled>{timer}</CurrentTimeStyled>
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
