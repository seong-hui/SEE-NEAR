import styled from "styled-components";
import LeftNavContainer from "@/components/LeftNav/LeftNav.container";

const FMainPage = () => {
  return (
    <FMainPageStyled>
      <LeftNavContainer />
    </FMainPageStyled>
  );
};

const FMainPageStyled = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(background-color);
`;
export default FMainPage;
