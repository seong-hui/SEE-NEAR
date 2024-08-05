import { styled } from "styled-components";

interface ButtonInterface {
  onClick: () => void;
  text: string;
  color: string;
}

const Button = ({ onClick, text, color }: ButtonInterface) => {
  return (
    <ButtonStyled onClick={onClick} color={color}>
      {text}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{ color: string }>`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  color: white;
  font-weight: 500;
  letter-spacing: 0.2rem;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    transition: all 0.2s;
  }
`;

export default Button;
