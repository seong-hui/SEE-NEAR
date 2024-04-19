import { styled } from "styled-components";
import LogoImg from "@/assets/images/seenearIcon.svg";
import { ReactComponent as AnalysisImg } from "@/assets/images/analysis.svg";
import { ReactComponent as CategoryImg } from "@/assets/images/category.svg";
import { ReactComponent as SettingImg } from "@/assets/images/setting.svg";

interface ILeftNav {
  pathname: string;
}

const LeftNav = ({ pathname }: ILeftNav) => {
  return (
    <LeftNavStyled>
      <TopNavStyled>
        <img src={LogoImg}></img>
        <TopLavTitleStyled>SEE NEAR</TopLavTitleStyled>
      </TopNavStyled>
      <NavSectionStyled>
        <NavBtnsStyled>
          <NavBtnStyled
            className={pathname.includes("family") ? "activeBtn" : ""}
          >
            <CategoryImg fill="var(--main-color)" />
            감정 기록
          </NavBtnStyled>
          <NavBtnStyled
            className={pathname.includes("family1") ? "activeBtn" : ""}
          >
            <AnalysisImg fill="var(--main-color)" />
            주간 분석
          </NavBtnStyled>
          <NavBtnStyled
            className={pathname.includes("family2") ? "activeBtn" : ""}
          >
            <SettingImg fill="var(--main-color)" />
            설정
          </NavBtnStyled>
        </NavBtnsStyled>
      </NavSectionStyled>
    </LeftNavStyled>
  );
};

const LeftNavStyled = styled.nav`
  width: 230px;
  height: 100%;
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

const NavSectionStyled = styled.section`
  height: 80%;
`;

const NavBtnsStyled = styled.ul`
  width: 100%;
  height: 100%;
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
  margin-bottom: 10px;
  &:last-child {
    margin-top: auto;
  }
  &:hover {
    color: white;
    background-color: var(--main-color);
    svg {
      fill: white;
    }
  }
  &.activeBtn {
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
