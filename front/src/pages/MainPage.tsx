import styled from "styled-components";
import LogoImg from "@/assets/images/seenearIcon.svg";
import { useState, useEffect } from "react";
import { currentTimer } from "@/utils/timerUtils";

const MainPage = () => {
  const [timer, setTimer] = useState("0000년 00월 00일 00시 00분 00초");
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = currentTimer();
      setTimer(newTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const onClickChatBtn = () => {
    setIsChatActive(!isChatActive);
  };

  return (
    <MainPageStyled>
      <CurrentTimeStyled>{timer}</CurrentTimeStyled>
      <ConstantBoxWapped>
        <ContentBoxStyled onClick={onClickChatBtn} active={isChatActive}>
          <LogoImgStyled src={LogoImg} />
          <ContentTitle>대화하기</ContentTitle>
        </ContentBoxStyled>
        {!isChatActive && (
          <ContentBoxStyled>
            <ScheduleTitle>오늘의 일정</ScheduleTitle>
          </ContentBoxStyled>
        )}
      </ConstantBoxWapped>
    </MainPageStyled>
  );
};

const MainPageStyled = styled.div`
  width: 100%;
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
  width: 90%;
`;

const ContentBoxStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  background-color: var(--sub-color);
  border-radius: 20px;
  margin: 30px;
  padding: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: width 0.4s ease;
  ${(props) =>
    props.active &&
    `
    width: 90%;
    height: 600px;
  `}

  ${(props) =>
    !props.active &&
    `
    width: 50%;
    height: 600px;
  `}
`;

const LogoImgStyled = styled.img`
  width: 80%;
  height: 80%;
`;

const ScheduleTitle = styled.div`
  font-size: 60px;
`;

const ContentTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

export default MainPage;
