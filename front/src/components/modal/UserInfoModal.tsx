import { useState } from "react";
import styled from "styled-components";

interface UserInfo {
  age: number;
  birthday: string;
  gender: string;
  medicalCondition: string;
  interests: string;
}

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: UserInfo;
  onSave: (userInfo: UserInfo) => void;
}

const UserInfoModal = ({
  isOpen,
  onClose,
  userInfo,
  onSave,
}: UserInfoModalProps) => {
  const [formData, setFormData] = useState(userInfo);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <FormLabel>나이:</FormLabel>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <FormLabel>생일:</FormLabel>
          <Input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />

          <FormLabel>성별:</FormLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </Select>

          <FormLabel>질병:</FormLabel>
          <Input
            type="text"
            name="medicalCondition"
            value={formData.medicalCondition}
            onChange={handleChange}
          />

          <FormLabel>관심사:</FormLabel>
          <Input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
          />

          <Button type="submit">저장</Button>
          <Button onClick={onClose}>닫기</Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
`;

export default UserInfoModal;
