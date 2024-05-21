import { styled } from "styled-components";
import SignupBox from "@/components/signup/SignupBox";

const SignUpPage = () => {
  return (
    <SignupPageWrapper>
      <SignupBox />
    </SignupPageWrapper>
  );
};

const SignupPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignUpPage;
