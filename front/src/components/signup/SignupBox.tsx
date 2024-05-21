import { styled } from "styled-components";
import Button from "@/components/button/Button";
import InputForm from "@/components/input/Input";
import useInputVaild from "@/hooks/useInputVaild";
import { axiosJoin } from "@/api/axios/axiosCustom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { validatePassword } from "@/utils/validatePassword";
import { validatePhoneNumber } from "@/utils/formatPhoneNumber";

const SignupBox = () => {
  const navigate = useNavigate();

  const userIdRef = useRef<HTMLInputElement>(null);
  const userPwRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const userPnRef = useRef<HTMLInputElement>(null);

  const [userIdError, setUserIdError] = useState(false);
  const [userPwError, setUserPwError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [userPnError, setUserPnError] = useState(false);

  const onClickLoginBtn = async () => {
    setUserIdError(false);
    setUserPwError(false);
    setUserNameError(false);
    setUserPnError(false);

    if (!username.trim()) {
      setUserIdError(true);
      userIdRef.current?.focus();
      alert("ID를 입력해주세요.");
      return;
    } else if (!password.trim()) {
      setUserPwError(true);
      userPwRef.current?.focus();
      alert("비밀번호를 입력해주세요.");
      return;
    } else if (!first_name.trim()) {
      setUserNameError(true);
      userNameRef.current?.focus();
      alert("이름을 입력해주세요.");
      return;
    } else if (!phone_number.trim()) {
      setUserPnError(true);
      userPnRef.current?.focus();
      alert("전화번호를 입력해주세요.");
      return;
    }

    const passwordError = validatePassword(String(password));
    if (passwordError) {
      alert(passwordError);
      return;
    }

    const phoneNumberError = validatePhoneNumber(String(phone_number));
    if (phoneNumberError) {
      alert(phoneNumberError);
      return;
    }

    if (isSenior) {
      if (!familyId.trim()) {
        setFamilyIdError(true);
        alert("가족 아이디를 입력해주세요.");
        return;
      } else if (!familyRelation.trim()) {
        setFamilyRelationError(true);
        alert("가족 관계를 입력해주세요.");
        return;
      }
    }

    try {
      console.log(
        username,
        password,
        email,
        first_name,
        last_name,
        phone_number,
        birth,
        isSenior,
        familyId,
        familyRelation
      );
      const response = await axiosJoin(
        username,
        password,
        email,
        first_name,
        last_name,
        phone_number,
        birth,
        isSenior,
        familyId,
        familyRelation
      );

      localStorage.setItem("token", response.token);
      alert("회원가입이 완료되었습니다.");
      navigate(`/main`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        alert(error.response.data.message);
    }
  };

  const {
    value: username,
    handleChange: handleIdChange,
    handleBlur: handleIdBlur,
  } = useInputVaild("userId");

  const {
    value: password,
    detail: userPwDetail,
    handleChange: handlePwChange,
    handleBlur: handlePwBlur,
  } = useInputVaild("userPw");

  const {
    value: email,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
  } = useInputVaild("userName");

  const {
    value: first_name,
    handleChange: handleFNameChange,
    handleBlur: handleFNameBlur,
  } = useInputVaild("userName");

  const {
    value: last_name,
    handleChange: handleLNameChange,
    handleBlur: handleLNameBlur,
  } = useInputVaild("userName");

  const {
    value: birth,
    handleChange: handleBirthChange,
    handleBlur: handleBirthBlur,
  } = useInputVaild("userName");

  const {
    value: phone_number,
    detail: userPnDetail,
    handleChange: handlePnChange,
    handleBlur: handlePnBlur,
  } = useInputVaild("userPn");

  const [isSenior, setIsSenior] = useState(false);
  const handleSeniorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSenior(event.target.checked);
  };
  const [familyId, setFamilyId] = useState("");
  const [familyRelation, setFamilyRelation] = useState("");
  const [familyIdError, setFamilyIdError] = useState(false);
  const [familyRelationError, setFamilyRelationError] = useState(false);

  const handleFamilyIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyId(event.target.value);
    setFamilyIdError(false);
  };

  const handleFamilyRelationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFamilyRelation(event.target.value);
    setFamilyRelationError(false);
  };

  return (
    <LoginBoxStyled>
      <LoginTitle>회원가입</LoginTitle>
      <LoginFormWrapper>
        <InputForm
          label="아이디"
          type="text"
          id="userId"
          name="userId"
          value={username}
          onChange={handleIdChange}
          onBlur={handleIdBlur}
          ref={userIdRef}
          isFocus={userIdError}
        />
        <InputForm
          label="비밀번호"
          type="password"
          id="userPw"
          name="userPw"
          value={password}
          onChange={handlePwChange}
          onBlur={handlePwBlur}
          detailText={userPwDetail}
          ref={userPwRef}
          isFocus={userPwError}
        />
        <InputForm
          label="이메일"
          type="text"
          id="userNickname"
          name="userNickname"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          ref={userNameRef}
          isFocus={userNameError}
        />
        <InputRow>
          <InputForm
            label="성"
            type="text"
            id="userNickname"
            name="userNickname"
            value={last_name}
            onChange={handleLNameChange}
            onBlur={handleLNameBlur}
            ref={userNameRef}
            isFocus={userNameError}
          />
          <InputForm
            label="이름"
            type="text"
            id="userNickname"
            name="userNickname"
            value={first_name}
            onChange={handleFNameChange}
            onBlur={handleFNameBlur}
            ref={userNameRef}
            isFocus={userNameError}
          />
        </InputRow>
        <InputForm
          label="전화번호"
          type="tel"
          id="userPn"
          name="userPn"
          value={phone_number}
          onChange={handlePnChange}
          onBlur={handlePnBlur}
          detailText={userPnDetail}
          ref={userPnRef}
          isFocus={userPnError}
        />
        <InputForm
          label="생년월일"
          type="date"
          id="userPn"
          name="userPn"
          value={birth}
          onChange={handleBirthChange}
          onBlur={handleBirthBlur}
          ref={userPnRef}
          isFocus={userPnError}
        />
        <label>
          시니어 가족 회원
          <input
            type="checkbox"
            id="isSenior"
            checked={isSenior}
            onChange={handleSeniorChange}
          />
        </label>
        {isSenior && (
          <>
            <InputForm
              label="가족 아이디"
              type="text"
              id="familyId"
              name="familyId"
              value={familyId}
              onChange={handleFamilyIdChange}
              isFocus={familyIdError}
            />
            <InputForm
              label="가족 관계"
              type="text"
              id="familyRelation"
              name="familyRelation"
              value={familyRelation}
              onChange={handleFamilyRelationChange}
              isFocus={familyRelationError}
            />
          </>
        )}
      </LoginFormWrapper>
      <LoginBtnWrapper>
        <Button
          onClick={onClickLoginBtn}
          text="회원가입"
          color="var(--main-color)"
        />
        <Button
          onClick={() => navigate(-1)}
          text="뒤로가기"
          color="var(--main-color)"
        />
      </LoginBtnWrapper>
    </LoginBoxStyled>
  );
};

const LoginBoxStyled = styled.div`
  width: 40rem;
  height: auto;
  background-color: var(--point-color);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 2rem;
`;

const LoginTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
`;

const LoginFormWrapper = styled.div`
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LoginBtnWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
  input {
    margin-right: 1rem;
  }
`;

export default SignupBox;
