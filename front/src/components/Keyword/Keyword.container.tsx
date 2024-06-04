import Keyword from "@/components/Keyword/Keyword";
import { useState } from "react";
import { ConversationDto } from "@/dto/dto";
import { useGetConv } from "@/api/query/reactQuery";

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
    <Keyword
      keywords={keywords}
      showModal={showModal}
      handleKeywordClick={handleKeywordClick}
      handleCloseModal={handleCloseModal}
      selectedKeyword={selectedKeyword}
    />
  );
};
export default KeywordContainer;
