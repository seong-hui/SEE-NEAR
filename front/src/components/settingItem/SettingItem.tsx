import styled from "styled-components";
import ProfileSvg from "@/assets/images/seenearIcon.svg";
import UserInfoModal from "../modal/UserInfoModal";
import { useState } from "react";
import EditButtonImg from "@/assets/images/edit.svg";
import { SeniorInfoDto, SeniorPostInfo } from "@/dto/dto";
import { usePutSenior } from "@/api/query/reactQuery";

interface SettingItemProps {
  seniorInfo: SeniorInfoDto | undefined;
}

const SettingItem = ({ seniorInfo }: SettingItemProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { mutate: updateInfo } = usePutSenior(handleCloseModal);

  const handleUpDateInfo = (data: SeniorPostInfo) => {
    updateInfo(data);
  };

  const gender =
    seniorInfo?.senior_gender === 0
      ? "기타"
      : seniorInfo?.senior_gender === 1
      ? "여성"
      : "남성";

  const today = new Date(),
    year = today.getFullYear();

  const yearOfBirth = seniorInfo?.senior_birth.slice(0, 4);

  const age = year - Number(yearOfBirth) + 1;

  return (
    <SettingItemLayout>
      <BoxTitle>시니어 정보</BoxTitle>
      <SettingBox>
        <EditButton onClick={handleOpenModal} />
        <ProfileImg src={ProfileSvg} />
        <UserName>{`${seniorInfo?.last_nane}${seniorInfo?.first_name}`}</UserName>
        <UserInfoForm onClick={handleOpenModal}>
          <UserInfoItem>
            <Label>나이 :</Label> {age}
          </UserInfoItem>
          <UserInfoItem>
            <Label>생일 :</Label> {seniorInfo?.senior_birth}
          </UserInfoItem>
          <UserInfoItem>
            <Label>성별 : </Label>
            {gender}
          </UserInfoItem>
          <UserInfoItem>
            <Label>질병 : </Label>
            {seniorInfo?.senior_diseases}
          </UserInfoItem>
          <UserInfoItem>
            <Label>관심사 : </Label> {seniorInfo?.senior_interests}
          </UserInfoItem>
        </UserInfoForm>
        {isModalOpen && seniorInfo && (
          <UserInfoModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            userInfo={seniorInfo}
            onSave={handleUpDateInfo}
          />
        )}
      </SettingBox>
    </SettingItemLayout>
  );
};

const SettingItemLayout = styled.div``;

const SettingBox = styled.div`
  width: 320px;
  height: 400px;
  border-radius: 15px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  position: relative;
`;

const BoxTitle = styled.h2`
  font-size: 20px;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f1f6fc;
  border: 1px solid #eaeaea;
`;

const UserName = styled.p`
  font-size: 25px;
  font-weight: bold;
`;

const UserInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 80%;
  padding-top: 22px;
  border-top: 0.8px solid #979ca5;
`;

const UserInfoItem = styled.div`
  font-size: 16px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const EditButton = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;
  cursor: pointer;
  background: url(${EditButtonImg}) no-repeat center;
  border: none;
  width: 20px;
  height: 20px;
`;

export default SettingItem;
