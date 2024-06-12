import { useState } from "react";
import styled from "styled-components";
import { useEventsCreate } from "@/api/query/reactQuery";
import LogoImg from "@/assets/images/seenearIcon.svg";
import CloseBtn from "../button/CloseBtn";
import Button from "../button/Button";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  selectedDate: string;
}

const AddModal = ({ show, onClose, selectedDate }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [time, setDatetime] = useState("");

  const { mutate: createEvent } = useEventsCreate(onClose);

  const handleCreateEvent = () => {
    const datetime = selectedDate + " " + time;
    createEvent({ title, location, datetime });
  };

  if (!show) {
    return null;
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose} />
        <StyledForm>
          <ModalLogoImg src={LogoImg} />
          <ModalTitle>일정 추가하기</ModalTitle>
          <StyledLabel>
            제목
            <StyledInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </StyledLabel>
          <StyledLabel>
            위치
            <StyledInput
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </StyledLabel>
          <StyledLabel>
            시간
            <StyledInput
              type="time"
              value={time}
              onChange={(e) => setDatetime(e.target.value)}
            />
          </StyledLabel>
        </StyledForm>
        <ButtonWrapper>
          <Button
            onClick={handleCreateEvent}
            text="저장"
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

export default AddModal;
