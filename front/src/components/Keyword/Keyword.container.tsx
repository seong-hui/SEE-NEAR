import Keyword from "@/components/Keyword/Keyword";
import { useState, useEffect } from "react";
import { axiosConvList } from "@/api/axios/axiosCustom";
import { dummyKeywords } from "@/assets/data/dummyKeywords";
import { ConversationDto } from "@/dto/dto";

interface KeywordContainerProps {
  selectedDate: string;
}

const KeywordContainer = ({ selectedDate }: KeywordContainerProps) => {
  const [keywords, setKeywords] = useState<ConversationDto[]>([]);
  // const [keywords, setKeywords] = useState(dummyKeywords);
  useEffect(() => {
    const fetchConv = async () => {
      try {
        const response = await axiosConvList(selectedDate);
        setKeywords(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchConv();
  }, [selectedDate]);

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
