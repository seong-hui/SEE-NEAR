import styled from "styled-components";
import { formatTime } from "@/utils/formatTime";

import CloseBtn from "../button/CloseBtn";
import LogoImg from "@/assets/images/seenearIcon.svg";

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
        <CloseBtn onClick={onClose} />
        <StyledForm>
          <ModalLogoImg src={LogoImg} />
          <ModalTitle>키워드 : {keyword.keyword}</ModalTitle>
          <StyledLabel>
            대화 시간 :
            <StyledInput>
              {formatTime(keyword.start)} - {formatTime(keyword.end)}
            </StyledInput>
          </StyledLabel>
          <StyledLabel>
            대화 내용 요약 :<StyledInput>{keyword.content} </StyledInput>
          </StyledLabel>
        </StyledForm>
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 20rem;
  padding: 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const StyledLabel = styled.label`
  color: #333;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 5px;
`;

const StyledInput = styled.div`
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex-wrap: wrap;
  font-weight: lighter;
  margin-bottom: 10px;
`;

const ModalLogoImg = styled.img`
  width: 120px;
  margin-top: -85px;
`;

const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: -15px;
`;

export default KeywordModal;
