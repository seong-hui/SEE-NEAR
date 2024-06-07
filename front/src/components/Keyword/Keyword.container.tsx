import Keyword from "@/components/Keyword/Keyword";
import { useState } from "react";
import { ConversationDto } from "@/dto/dto";
import { useGetConv } from "@/api/query/reactQuery";
import styled from "styled-components";

interface KeywordContainerProps {
  selectedDate: string;
}

const KeywordContainer = ({ selectedDate }: KeywordContainerProps) => {
  const { data: keywords = [], error, isError } = useGetConv(selectedDate);
  if (isError) {
    console.error(error);
  }

  const [selectedKeyword, setSelectedKeyword] =
    useState<ConversationDto | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleKeywordClick = (keyword: ConversationDto) => {
    setSelectedKeyword(keyword);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <KeywordBox>
      <Keyword
        keywords={keywords}
        showModal={showModal}
        handleKeywordClick={handleKeywordClick}
        handleCloseModal={handleCloseModal}
        selectedKeyword={selectedKeyword}
      />
    </KeywordBox>
  );
};

const KeywordBox = styled.div`
  max-height: 280px;
  overflow-y: auto;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export default KeywordContainer;
