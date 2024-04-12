import { styled } from "styled-components";
import AddBtn from "@/assets/images/addbtn.svg";
import CircleImg from "@/assets/images/circle.svg";
import VerticalSetImg from "@/assets/images/more_vertical.svg";

const Todo = () => {
  return (
    <TodoStyled>
      <TodoBoxStyled>
        <CircleImgStyled src={CircleImg}></CircleImgStyled>
        <TodoTitleStyled>브런치 약속</TodoTitleStyled>
        <TimeTextStyled>11:00</TimeTextStyled>
        <SetImgStyled src={VerticalSetImg}></SetImgStyled>
      </TodoBoxStyled>
      <TodoBoxStyled>
        <CircleImgStyled src={CircleImg}></CircleImgStyled>
        <TodoTitleStyled>점심 식사 약속</TodoTitleStyled>
        <TimeTextStyled>14:00</TimeTextStyled>
        <SetImgStyled src={VerticalSetImg}></SetImgStyled>
      </TodoBoxStyled>
      <TodoBoxStyled>
        <CircleImgStyled src={CircleImg}></CircleImgStyled>
        <TodoTitleStyled>저녁 식사 약속</TodoTitleStyled>
        <TimeTextStyled>19:00</TimeTextStyled>
        <SetImgStyled src={VerticalSetImg}></SetImgStyled>
      </TodoBoxStyled>
      <AddBtnStyled>
        일정 추가<AddBtnImgStyled src={AddBtn}></AddBtnImgStyled>
      </AddBtnStyled>
    </TodoStyled>
  );
};

const TodoStyled = styled.div`
  height: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 20px;
`;

const TodoBoxStyled = styled.div`
  height: 60px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #f2f4f7;
  box-shadow: rgba(96, 108, 128, 0.05) 0px 1px 3px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 15px;
`;

const TodoTitleStyled = styled.div`
  margin: 0 10px;
`;

const CircleImgStyled = styled.img``;

const TimeTextStyled = styled.div`
  font-size: 14px;
  color: #bdbdbd;
`;

const SetImgStyled = styled.img`
  margin-left: auto;
  height: 15px;
`;

const AddBtnStyled = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #f2f4f7;
  box-shadow: rgba(96, 108, 128, 0.05) 0px 1px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const AddBtnImgStyled = styled.img`
  width: 50px;
  height: 50px;
`;
export default Todo;
