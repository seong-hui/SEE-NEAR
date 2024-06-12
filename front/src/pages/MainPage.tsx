import styled from "styled-components";
import LogoImg1 from "@/assets/images/seenearIcon5.svg";
import LogoImg2 from "@/assets/images/seenearIcon.svg";
import LogoImg3 from "@/assets/images/seenearIcon6.svg";
import { useState } from "react";
import Chatbot from "@/test";
import TimeBox from "@/components/TimeBox/TimeBox";
import ScheduleBox from "@/components/ScheduleBox/ScheduleBox";
import { useGetRoutine } from "@/api/query/reactQuery";
import AletModal from "@/components/modal/AletModal";
interface PromptData {
  prompt: string | null;
  bot: any;
}

const MainPage = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [isViewActive, setIsViewActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const onClickChatBtn = () => {
    setIsChatActive(!isChatActive);
    if (!isChatActive){
      setIsViewActive(true);
    } else{
      setIsViewActive(false);
    }
  };

  //챗봇
  const [list, setList] = useState<PromptData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <MainPageStyled>
      <TimeBox />
      <ConstantBoxWapped>
        <ContentBoxStyled onClick={onClickChatBtn} active={isViewActive}>
          {isViewActive ? (
            isRecording ? (
              <LogoImgStyled src={LogoImg3} /> // 사용자가 말할때
            ) : (
              <LogoImgStyled src={LogoImg1} /> // 챗봇이 말할때
            )) : (
            <LogoImgStyled src={LogoImg2} /> // 기본화면
          )}
          {(!isViewActive || isRecording) && <ContentTitle>
            {isViewActive ? "대화 종료" : "대화 시작"}
          </ContentTitle>}
          <Chatbot
            setList={setList}
            list={list}
            isChatActive={isChatActive}
            setIsChatActive={setIsChatActive}
            isViewActive={isViewActive}
            setIsViewActive={setIsViewActive}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        </ContentBoxStyled>
        {!isViewActive && <ScheduleBox setIsChatActive={setIsChatActive} setIsViewActive={setIsViewActive} />}
      </ConstantBoxWapped>
      {/* <AletModal /> */}
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
  animation: width 0.4s ease;
  position : relative;
  ${(props) =>
    props.active &&
    `
    width: 90%;
    height: 450px;
  `}
  ${(props) =>
    !props.active &&
    `
    width: 50%;
    height: 450px;
  `}
`;

const LogoImgStyled = styled.img`
  width: 80%;
  height: 80%;
  top:20px;
`;

const ContentTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
  border: 3px solid black;
  border-radius: 10px;
  padding: 10px;
`;

export default MainPage;
