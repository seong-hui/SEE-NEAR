import styled from "styled-components";
import { useGetEvents } from "@/api/query/reactQuery";
import { formatDate } from "@/utils/formatDateUtils";
import { useState } from "react";
import { extractTime } from "@/utils/extractTime";

const ScheduleBox = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const today = new Date();

  const { data: todos = [], error, isError } = useGetEvents(formatDate(today));
  if (isError) {
    console.error(error);
  }
  return (
    <ContentBoxStyled>
      <ContentTitle>오늘의 일정</ContentTitle>
      <ScheduleList>
        {todos.map((todos) => (
          <ScheduleItem key={todos.id}>
            <ScheduleCheckbox
              id={`checkbox-${todos.id}`}
              type="checkbox"
              checked={!!checkedItems[todos.id]}
              onChange={() => handleCheckboxChange(todos.id)}
            />
            <CheckboxLabel
              htmlFor={`checkbox-${todos.id}`}
              checked={!!checkedItems[todos.id]}
            ></CheckboxLabel>
            <ScheduleTitle checked={!!checkedItems[todos.id]}>
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
