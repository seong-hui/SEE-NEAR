import { styled } from "styled-components";

interface CloseBtnProps {
  onClick: () => void;
}

const CloseBtn = ({ onClick }: CloseBtnProps) => {
  return <ButtonStyled onClick={onClick}>✕</ButtonStyled>;
};

const ButtonStyled = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  color: black;
  font-weight: bold;
  letter-spacing: 0.2rem;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    color: var(--main-color);
    transition: all 0.2s;
  }
  position: absolute;
  right: 20px;
  top: 10px;
`;

export default CloseBtn;
