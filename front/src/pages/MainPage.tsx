import styled from "styled-components";
import LogoImg from "@/assets/images/seenearIcon.svg";
import { useState, useEffect } from "react";
import { currentTimer } from "@/utils/timerUtils";
import PromptSubmit from "@/components/PromptSubmit";

const initialSchedules = [
  { id: 1, title: "아침 약속", time: "09:00" },
  { id: 2, title: "병원 진료", time: "11:00" },
  { id: 3, title: "점심 약속", time: "13:00" },
];

interface PromptData {
  prompt: string | null;
  bot: any;
}

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

  const [schedules, setSchedules] = useState(initialSchedules);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  //챗봇
  const [list, setList] = useState<PromptData[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  return (
    <MainPageStyled>
      <CurrentTimeStyled>{timer}</CurrentTimeStyled>
      <ConstantBoxWapped>
        <ContentBoxStyled onClick={onClickChatBtn} active={isChatActive}>
          <LogoImgStyled src={LogoImg} />
          <ContentTitle>
            {isChatActive ? "대화 종료" : "대화 시작"}
            <PromptSubmit
              isloading={isloading}
              setIsLoading={setIsLoading}
              setList={setList}
              list={list}
            />
          </ContentTitle>
        </ContentBoxStyled>
        {!isChatActive && (
          <ContentBoxStyled>
            <ContentTitle>오늘의 일정</ContentTitle>
            <ScheduleList>
              {schedules.map((schedule) => (
                <ScheduleItem key={schedule.id}>
                  <ScheduleCheckbox
                    id={`checkbox-${schedule.id}`}
                    type="checkbox"
                    checked={!!checkedItems[schedule.id]}
                    onChange={() => handleCheckboxChange(schedule.id)}
                  />
                  <CheckboxLabel
                    htmlFor={`checkbox-${schedule.id}`}
                    checked={!!checkedItems[schedule.id]}
                  ></CheckboxLabel>
                  <ScheduleTitle checked={!!checkedItems[schedule.id]}>
                    {schedule.title} {schedule.time}
                  </ScheduleTitle>
                </ScheduleItem>
              ))}
            </ScheduleList>
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

const ScheduleTitle = styled.div<{ checked?: boolean }>`
  font-size: 40px;
  ${(props) =>
    props.checked &&
    `
    text-decoration-line: line-through;
    text-decoration-color: red;
    `}
`;

const ContentTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ScheduleList = styled.ul`
  padding: 0;
`;

const ScheduleItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 40px;
`;

const ScheduleCheckbox = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label<{ checked?: boolean }>`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: 3px solid black;
  color: white;
  padding: 10px;
  margin-right: 15px;
  border-radius: 10px;
  transition: background-color 0.3s;

  &::after {
    content: "${(props) => (props.checked ? "✔" : "")}";
    color: red;
    margin-left: -8px;
  }
`;

export default MainPage;
