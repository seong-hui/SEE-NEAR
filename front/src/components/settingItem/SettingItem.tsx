import styled from "styled-components";
import ProfileSvg from "@/assets/images/seenearIcon.svg";
import UserInfoModal from "../modal/UserInfoModal";
import { useState } from "react";
import EditButtonImg from "@/assets/images/edit.svg";

interface UserInfo {
  age: number;
  birthday: string;
  gender: string;
  medicalCondition: string;
  interests: string;
}

const SettingItem = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    age: 72,
    birthday: "1991-03-04",
    gender: "남성",
    medicalCondition: "고혈압",
    interests: "여행, 독서",
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveUserInfo = (updatedInfo: UserInfo) => {
    setUserInfo(updatedInfo);
    handleCloseModal();
  };

  return (
    <SettingItemLayout>
      <BoxTitle>시니어 정보</BoxTitle>
      <SettingBox>
        <EditButton onClick={handleOpenModal} />
        <ProfileImg src={ProfileSvg} />
        <UserName>홍길동</UserName>
        <UserInfoForm onClick={handleOpenModal}>
          <UserInfoItem>
            <Label>나이 :</Label> 72
          </UserInfoItem>
          <UserInfoItem>
            <Label>생일 :</Label> 1991-03-04
          </UserInfoItem>
          <UserInfoItem>
            <Label>성별 :</Label> 남성
          </UserInfoItem>
          <UserInfoItem>
            <Label>질병 :</Label> 고혈압
          </UserInfoItem>
          <UserInfoItem>
            <Label>관심사 :</Label> 여행, 독서
          </UserInfoItem>
        </UserInfoForm>
        {isModalOpen && (
          <UserInfoModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            userInfo={userInfo}
            onSave={handleSaveUserInfo}
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
