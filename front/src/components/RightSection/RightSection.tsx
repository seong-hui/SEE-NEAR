import styled from "styled-components";
import { MemberDto } from "@/dto/dto";
import ProfileSvg from "@/assets/images/seenearIcon.svg";

interface RightSectionProps {
  members: MemberDto[];
}

const RightSection = ({ members }: RightSectionProps) => {
  return (
    <RightSectionLayout>
      <BoxTitleStyled>가족 정보</BoxTitleStyled>
      <TodoStyled>
        {members.map((member) => (
          <MemberStyled key={member.id}>
            <ProfileImg src={ProfileSvg} />
            <MemberInfoText>
              <MemberNameStyled>
                {member.last_name} {member.first_name}
              </MemberNameStyled>
              <RoleStyled>{member.role}</RoleStyled>
            </MemberInfoText>
          </MemberStyled>
        ))}
      </TodoStyled>
    </RightSectionLayout>
  );
};

const RightSectionLayout = styled.div`
  min-width: 250px;
  height: 100%;
  background-color: #cddbed;
  padding: 50px 40px;
  border-left: 1px solid var(--light-grey-color);
  border-top-left-radius: 30px;
`;

const BoxTitleStyled = styled.div`
  font-weight: bold;
  margin: 30px 0 15px;
`;

const TodoStyled = styled.div`
  height: auto;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 20px;
  max-height: 240px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: var(--main-color);
  }
`;

const MemberStyled = styled.div`
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const MemberNameStyled = styled.div`
  margin: 0 10px;
`;

const RoleStyled = styled.div`
  font-size: 14px;
  color: gray;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #cddbed;
`;

const MemberInfoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
export default RightSection;
