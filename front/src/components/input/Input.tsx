import { styled } from "styled-components";
import { forwardRef } from "react";

interface InputFormInterface {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.FocusEvent<HTMLInputElement>) => void;
  errorText?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  detailText?: string;
  isFocus?: boolean;
}

const InputForm = forwardRef<HTMLInputElement, InputFormInterface>(
  (
    {
      label,
      type,
      id,
      name,
      value,
      onChange,
      onBlur,
      errorText,
      detailText,
      isFocus,
    },
    ref
  ) => {
    return (
      <InputFormStyled>
        <LabelStyled htmlFor={id}>{label}</LabelStyled>
        <InputWrapper>
          <InputStyled
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            $isFocus={isFocus}
          />
          {errorText && <ErrorTextStyled>{errorText}</ErrorTextStyled>}
          {detailText && <DetailTextStyled>{detailText}</DetailTextStyled>}
        </InputWrapper>
      </InputFormStyled>
    );
  }
);

const InputFormStyled = styled.form`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`;

const LabelStyled = styled.label`
  font-size: 1.2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 4rem;
`;

const InputStyled = styled.input<{ $isFocus?: boolean }>`
  height: 2rem;
  border: 1px solid
    ${({ theme, $isFocus }) => ($isFocus ? "red" : "var(--sub-color)")};
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  outline: none;
  padding: 0 1rem;
`;

const ErrorTextStyled = styled.span`
  color: red;
  font-size: 0.8rem;
`;

const DetailTextStyled = styled.div`
  color: blue;
  font-size: 0.8rem;
`;

export default InputForm;
