import styled from "styled-components";
import { extractTime } from "@/utils/extractTime";
import { EventDto } from "@/dto/dto";
import { formatTimestampToString } from "@/utils/formatDateUtils";
import CloseBtn from "../button/CloseBtn";
import LogoImg from "@/assets/images/seenearIcon.svg";
import Button from "../button/Button";
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
        <CloseBtn onClick={onClose} />
        <StyledForm>
          <ModalLogoImg src={LogoImg} />
          <ModalTitle>
            {formatTimestampToString(todo.datetime)}의 일정
          </ModalTitle>
          <StyledLabel>
            제목
            <StyledInput type="text" value={todo.title} readOnly />
          </StyledLabel>
          <StyledLabel>
            위치
            <StyledInput type="text" value={todo.location} readOnly />
          </StyledLabel>
          <StyledLabel>
            시간
            <StyledInput
              type="text"
              value={extractTime(todo.datetime)}
              readOnly
            />
          </StyledLabel>
        </StyledForm>
        <ButtonWrapper>
          <Button
            onClick={() => handleDeleteEvent(todo)}
            text="삭제"
            color="var(--main-color)"
          />
        </ButtonWrapper>
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 20rem;
  padding: 1.2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const StyledLabel = styled.label`
  color: #333;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  pointer-events: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  gap: 20px;
`;

const ModalLogoImg = styled.img`
  width: 120px;
  margin-top: -85px;
`;

const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: -15px;
`;

export default DetailModal;
