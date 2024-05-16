import { useState } from "react";
import styled from "styled-components";
import { axiosEventsCreate } from "@/api/axios/axiosCustom";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const AddModal = ({ show, onClose }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState("");

  const handleEventSubmit = async () => {
    try {
      await axiosEventsCreate(title, location, datetime);
      onClose();
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEventSubmit();
          }}
        >
          <label htmlFor="title">제목:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="location">위치:</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <label htmlFor="datetime">날짜 및 시간:</label>
          <input
            id="datetime"
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
          <button type="submit">저장</button>
        </form>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  width: 20rem;
  padding: 1.2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  label {
    margin-bottom: 0.4rem;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  input {
    margin-bottom: 1.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    border: none;
    border: 1px solid black;
    padding: 0.5rem;
  }
  button {
    border-radius: 0.5rem;
    border: none;
    border: 1px solid black;
    height: 1.6rem;
    width: 3rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

export default AddModal;
