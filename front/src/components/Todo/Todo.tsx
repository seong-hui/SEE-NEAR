import { styled } from "styled-components";
import AddBtn from "@/assets/images/addbtn.svg";

const Todo = () => {
  return (
    <TodoStyled>
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
  padding: 20px 30px;
`;

const AddBtnStyled = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #f2f4f7;
  box-shadow: rgba(96, 108, 128, 0.05) 0px 1px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddBtnImgStyled = styled.img`
  width: 45px;
  height: 45px;
`;
export default Todo;
