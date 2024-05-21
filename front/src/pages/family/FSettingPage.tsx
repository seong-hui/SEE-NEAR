import LeftNavContainer from "@/components/LeftNav/LeftNav.container";
import styled from "styled-components";
import RightSectionContainer from "@/components/RightSection/RightSectionContainer";
import SettingItemContainer from "@/components/settingItem/SettingItemContainer";

const FSettingPage = () => {
  return (
    <FSettingPageLayout>
      <LeftNavContainer />
      <SettingSection>
        <SectionTitle>설정</SectionTitle>
        <SettingContent>
          <SettingItemContainer />
          <SettingItemContainer />
        </SettingContent>
      </SettingSection>
      <RightSectionContainer />
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

const SectionTitle = styled.h1`
  font-size: 32px;
  display: flex;
  width: 100%;
  margin: 0;
`;

const SettingSection = styled.section`
  width: 100%;
  padding: 40px;
`;

const SettingContent = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 100px;
`;

export default FSettingPage;
