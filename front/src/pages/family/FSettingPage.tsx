import LeftNavContainer from "@/components/LeftNav/LeftNav.container";
import styled from "styled-components";

const FSettingPage = () => {
  return (
    <FSettingPageLayout>
      <LeftNavContainer />
    </FSettingPageLayout>
  );
};

const FSettingPageLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
`;

export default FSettingPage;
