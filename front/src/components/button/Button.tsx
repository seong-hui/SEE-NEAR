import { styled } from "styled-components";

interface ButtonInterface {
  onClick: () => void;
  text: string;
  color: string;
  isClicked?: boolean;
}

const Button = ({ onClick, text, color, isClicked }: ButtonInterface) => {
  return (
    <ButtonStyled onClick={onClick} color={color} $isClicked={isClicked}>
      {text}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{ color: string; $isClicked?: boolean }>`
  width: 7rem;
  height: 3rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  background-color: ${(props) =>
    props.$isClicked ? "var(--point-color)" : props.color};
  color: white;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
  border: none;
`;

export default Button;
