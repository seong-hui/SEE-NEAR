import { styled } from "styled-components";
import LogoImg from "@/assets/images/seenearIcon.svg";
import { ReactComponent as AnalysisImg } from "@/assets/images/analysis.svg";
import { ReactComponent as CategoryImg } from "@/assets/images/category.svg";
import { ReactComponent as SettingImg } from "@/assets/images/setting.svg";

const LeftNav = () => {
  return (
    <LeftNavStyled>
      <TopNavStyled>
        <img src={LogoImg}></img>
        <TopLavTitleStyled>SEE NEAR</TopLavTitleStyled>
      </TopNavStyled>
      <NavSectionStyled>
        <NavBtnsStyled>
          <NavBtnStyled>
            <CategoryImg fill="var(--main-color)" />
            감정 기록
          </NavBtnStyled>
          <NavBtnStyled>
            <AnalysisImg fill="var(--main-color)" />
            주간 분석
          </NavBtnStyled>
          <NavBtnStyled>
            <SettingImg fill="var(--main-color)" />
            설정
          </NavBtnStyled>
        </NavBtnsStyled>
      </NavSectionStyled>
    </LeftNavStyled>
  );
};

const LeftNavStyled = styled.nav`
  height: 100%;
  width: 250px;
  border-right: 1px solid var(--light-grey-color);
  padding: 20px;
`;

const TopNavStyled = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  img {
    width: 75px;
    height: 75px;
  }
`;

const TopLavTitleStyled = styled.div`
  font-size: 30px;
`;

const NavSectionStyled = styled.section``;

const NavBtnsStyled = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`;
const NavBtnStyled = styled.li`
  width: 85%;
  height: 50px;
  border-radius: 30px;
  color: #757575;
  display: flex;
  align-items: center;
  padding-left: 30px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    color: white;
    background-color: var(--main-color);
    svg {
      fill: white;
    }
  }
  svg {
    margin-right: 10px;
  }
`;
export default LeftNav;
