import LoginBox from "@/components/login/LoginBox";
import { styled } from "styled-components";

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <LoginBox />
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
