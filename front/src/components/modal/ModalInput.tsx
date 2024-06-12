import styled from "styled-components";

interface ModalInputProps<T> {
  lableText: string;
  labelType: string;
  onSetValue: React.Dispatch<React.SetStateAction<T>>;
}

const ModalInput = <T,>({
  lableText,
  labelType,
  onSetValue,
}: ModalInputProps<T>) => {
  return (
    <StyledLabel>
      {lableText}
      <StyledInput
        type={labelType}
        onChange={(e) => onSetValue(e.target.value as unknown as T)}
      />
    </StyledLabel>
  );
};

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

export default ModalInput;
