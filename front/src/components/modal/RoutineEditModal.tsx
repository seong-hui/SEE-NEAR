import { useState } from "react";
import styled from "styled-components";
import { RoutineDto } from "@/dto/dto";

interface RoutineEditModalProps {
  onClose: () => void;
  onSave: (data: RoutineDto) => void;
  selectedRoutine: RoutineDto;
  onDelete: () => void;
}

const RoutineEditModal = ({
  onClose,
  onSave,
  selectedRoutine,
  onDelete,
}: RoutineEditModalProps) => {
  const [name, setName] = useState(selectedRoutine.name);
  const [time, setTime] = useState(selectedRoutine.time);
  const id = selectedRoutine.id;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ id, name, time });
  };
  return (
    <ModalOverlay>
      <ModalContent>
        <StyledForm onSubmit={handleSubmit}>
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
            <StyledButton type="submit" onClick={() => onSave}>
              수정
            </StyledButton>
            <StyledButton type="button" onClick={onDelete}>
              삭제
            </StyledButton>
            <StyledButton type="button" onClick={onClose}>
              닫기
            </StyledButton>
          </ButtonWrapper>
        </StyledForm>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
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
  background: white;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
export default RoutineEditModal;
