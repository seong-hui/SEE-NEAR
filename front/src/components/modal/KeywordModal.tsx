import styled from "styled-components";
import { formatTime } from "@/utils/formatTime";

interface DetailModalProps {
  show: boolean;
  onClose: () => void;
  keyword: ConvResponse;
}

interface ConvResponse {
  id: number;
  content: string;
  start: string;
  end: string;
  keyword: string;
  emotion: number;
}

const KeywordModal = ({ show, onClose, keyword }: DetailModalProps) => {
  if (!show) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{keyword.keyword} </h2>
        <div>
          {formatTime(keyword.start)} - {formatTime(keyword.end)}
        </div>
        <p>대화 내용: {keyword.content}</p>

        <CloseButton onClick={onClose}>Close</CloseButton>
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
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  align-self: center;
  background: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

export default KeywordModal;
