import { styled } from "styled-components";
import AddBtn from "@/assets/images/addbtn.svg";
import CircleImg from "@/assets/images/circle.svg";
import VerticalSetImg from "@/assets/images/more_vertical.svg";
import AddModal from "@/components/modal/Modal";
import DetailModal from "../modal/DetailModal";
import { extractTime } from "@/utils/extractTime";
import { EventDto } from "@/dto/dto";

interface TodoProps {
  todos: EventDto[];
  handleAddClick: () => void;
  handleCloseModal: () => void;
  showAddModal: boolean;
  selectedTodo: EventDto | null;
  handleCloseDetailModal: () => void;
  handleTodoClick: (todo: EventDto) => void;
  showDetailModal: boolean;
  selectedDate: string;
  handleDeleteEvent: (data: EventDto) => void;
}
const Todo = ({
  todos,
  handleAddClick,
  handleCloseModal,
  showAddModal,
  selectedTodo,
  handleCloseDetailModal,
  handleTodoClick,
  showDetailModal,
  selectedDate,
  handleDeleteEvent,
}: TodoProps) => {
  return (
    <>
      <TodoStyled>
        {todos.map((todo) => (
          <TodoBoxStyled key={todo.id} onClick={() => handleTodoClick(todo)}>
            <CircleImgStyled src={CircleImg}></CircleImgStyled>
            <TodoTitleStyled>{todo.title}</TodoTitleStyled>
            <TimeTextStyled>{extractTime(todo.datetime)}</TimeTextStyled>
            <SetImgStyled src={VerticalSetImg}></SetImgStyled>
          </TodoBoxStyled>
        ))}
        <AddBtnStyled onClick={handleAddClick}>
          일정 추가<AddBtnImgStyled src={AddBtn}></AddBtnImgStyled>
        </AddBtnStyled>
      </TodoStyled>
      {showAddModal && (
        <AddModal
          show={showAddModal}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
        ></AddModal>
      )}
      <DetailModal
        show={showDetailModal}
        onClose={handleCloseDetailModal}
        todo={selectedTodo}
        handleDeleteEvent={handleDeleteEvent}
      />
    </>
  );
};

const TodoStyled = styled.div`
  height: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 20px;
  max-height: 240px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: var(--main-color);
  }
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
