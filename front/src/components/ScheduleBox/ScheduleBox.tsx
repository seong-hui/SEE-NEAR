import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGetEvents, useEventsUpdate } from "@/api/query/reactQuery";
import { formatDate } from "@/utils/formatDateUtils";
import { extractTime } from "@/utils/extractTime";
import { EventDto } from "@/dto/dto";
import { axiosChatbotAudio, axiosChatbotEvent } from "@/api/axios/axiosCustom";

interface Props {
  setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsViewActive: React.Dispatch<React.SetStateAction<boolean>>;
  setReturnText : React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleBox: React.FC<Props> = ({ 
    setIsChatActive, 
    setIsViewActive, 
    setReturnText,
  }) => {
  const today = new Date();
  const [audioUrl, setAudioUrl] = useState<string>("");
  const { data: todos = [], error, isError } = useGetEvents(formatDate(today));
  if (isError) {
    console.error(error);
  }
  const { mutate: updateEvent } = useEventsUpdate();
  const chatbot = async (todo: EventDto) => {
    const textData = await axiosChatbotEvent(todo.title + " " + extractTime(todo.datetime))
    const audioData = await axiosChatbotAudio()
    setReturnText(textData.text);
    setAudioUrl(audioData);
  }

  useEffect(() => {
    if (audioUrl) {
      setIsViewActive(true);
      const audioBlob = new Blob([audioUrl], { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(url);
      audioElement.setAttribute('crossorigin', 'anonymous');
      audioElement.addEventListener('canplaythrough', () => {
        audioElement.play().then(() => {
          // Playback started successfully
        }).catch((error) => {
          console.error(error);
        });
      });
      audioElement.addEventListener('error', (error) => {
        console.error(error);
      });
      audioElement.addEventListener('ended', () => {
        setTimeout(() => {
          setIsChatActive(true);
        }, 1000);
      });
    }
  }, [audioUrl])

  const handleCheckboxChange = (todo: EventDto) => {
    updateEvent({ ...todo, is_checked: !todo.is_checked });
    if (!todo.is_checked){ 
      chatbot(todo);
    }
  };

  const sortedTodos = todos.sort((a, b) => {
    return a.datetime.localeCompare(b.datetime);
  });
  return (
    <ContentBoxStyled>
      <ContentTitle>오늘의 일정</ContentTitle>
      <ScheduleList>
        {sortedTodos.map((todos) => (
          <ScheduleItem key={todos.id}>
            <ScheduleCheckbox
              id={`checkbox-${todos.id}`}
              type="checkbox"
              checked={todos?.is_checked}
              onChange={() => handleCheckboxChange(todos)}
            />
            <CheckboxLabel
              htmlFor={`checkbox-${todos.id}`}
              checked={todos.is_checked}
            ></CheckboxLabel>
            <ScheduleTitle checked={todos.is_checked}>
              <div>{todos.title}</div>
              <div>{extractTime(todos.datetime)}</div>
            </ScheduleTitle>
          </ScheduleItem>
        ))}
      </ScheduleList>
    </ContentBoxStyled>
  );
};

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
    height: 450px;
  `}
  ${(props) =>
    !props.active &&
    `
    width: 50%;
    height: 450px;
  `}
`;

const ScheduleTitle = styled.div<{ checked?: boolean }>`
  font-size: 40px;
  width: 100%;
  ${(props) =>
    props.checked &&
    `text-decoration-line: line-through; text-decoration-color: red;
    `};

  display: flex;
  justify-content: space-between;
`;

const ContentTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ScheduleList = styled.ul`
  width: 80%;
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
  max-width: 20px;
  min-width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: 3px solid black;
  color: white;
  padding: 10px;
  margin-right: 15px;
  border-radius: 10px;

  &::after {
    content: "${(props) => (props.checked ? "✔" : "")}";
    color: red;
    margin-left: -8px;
  }
`;

export default ScheduleBox;
