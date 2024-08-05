import { useState } from "react";
import styled from "styled-components";
import { RoutineDto } from "@/dto/dto";
import LogoImg from "@/assets/images/seenearIcon.svg";
import CloseBtn from "../button/CloseBtn";

interface RoutineModalProps {
  onClose: () => void;
  onSave: (data: RoutineDto) => void;
}

const RoutineModal = ({ onClose, onSave }: RoutineModalProps) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ name, time });
  };
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose} />
        <StyledForm onSubmit={handleSubmit}>
          <ModalLogoImg src={LogoImg} />
          <ModalTitle>대화 루틴 추가</ModalTitle>
          <StyledLabel>
            루틴명:
            <StyledInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </StyledLabel>
          <StyledLabel>
            시각:
            <StyledInput
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </StyledLabel>
          <ButtonWrapper>
            <StyledButton type="submit">추가</StyledButton>
          </ButtonWrapper>
        </StyledForm>
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
export default RoutineModal;
