import styled from "styled-components";
import { extractTime } from "@/utils/extractTime";
import { EventDto } from "@/dto/dto";
import { formatTimestampToString } from "@/utils/formatDateUtils";
interface EventsCheckResponse {
  id: number;
  title: string;
  location: string;
  datetime: string;
}

interface DetailModalProps {
  show: boolean;
  onClose: () => void;
  todo: EventsCheckResponse | null;
  handleDeleteEvent: (data: EventDto) => void;
}

const DetailModal = ({
  show,
  onClose,
  todo,
  handleDeleteEvent,
}: DetailModalProps) => {
  if (!show || !todo) {
    return null;
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{formatTimestampToString(todo.datetime)}의 일정</h2>
        <ModalTextWrapper>
          <ModalText>
            <strong>일정 제목 :</strong> {todo.title}
          </ModalText>
          <ModalText>
            <strong>장소 :</strong> {todo.location}
          </ModalText>
          <ModalText>
            <strong>시간 : </strong> {extractTime(todo.datetime)}
          </ModalText>
        </ModalTextWrapper>
        <ButtonWrapper>
          <StyledButton onClick={() => handleDeleteEvent(todo)}>
            삭제
          </StyledButton>
          <StyledButton onClick={onClose}>닫기</StyledButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledButton = styled.button`
  width: 100px;
  padding: 10px 20px;
  margin-top: 10px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:first-of-type {
    margin-right: 10px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalText = styled.div`
  font-size: 18px;
`;
const ModalTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 10px 0 20px 10px;
`;
export default DetailModal;
