import { useState, useCallback } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

interface useInputVaildInterface {
  value: string;
  error: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  detail: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

type ValidType = "userId" | "userPw" | "userName" | "userPn";

function useInputVaild(type: ValidType): useInputVaildInterface {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = useCallback(
    (inputValue: string): string => {
      if (!inputValue.trim()) {
        switch (type) {
          case "userId":
            return "ID를 입력해주세요";
          case "userPw":
            return "비밀번호를 입력해주세요";
          case "userName":
            return "닉네임을 입력해주세요";
          case "userPn":
            return "전화번호를 입력해주세요";
          default:
            return "";
        }
      }
      return "";
    },
    [type]
  );

  const DetailText = (type: ValidType) => {
    switch (type) {
      case "userPw":
        return "비밀번호 형식은 8자 이상, 숫자, 특수문자, 영어 알파벳이 포함되어야 합니다";
      case "userPn":
        return "전화번호 형식은 010-****-****입니다";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (type === "userPn") {
      inputValue = formatPhoneNumber(inputValue);
    }
    setValue(inputValue);
    setError(validate(inputValue));
  };

  const [detail] = useState(DetailText(type));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setError(validate(e.target.value));
  };

  return { value, error, detail, handleChange, handleBlur, setError };
}

export default useInputVaild;
