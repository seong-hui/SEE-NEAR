import Keyword from "@/components/Keyword/Keyword";
import { useState, useEffect } from "react";
import { axiosConvList } from "@/api/axios/axiosCustom";
import { dummyKeywords } from "@/assets/data/dummyKeywords";

interface ConvResponse {
  id: number;
  content: string;
  start: string;
  end: string;
  keyword: string;
  emotion: number;
}
interface KeywordContainerProps {
  selectedDate: string;
}

const KeywordContainer = ({ selectedDate }: KeywordContainerProps) => {
  useEffect(() => {
    fetchConv();
  }, []);

  // const [keywords, setKeywords] = useState<ConvResponse[]>([]);
  const [keywords, setKeywords] = useState(dummyKeywords);

  const fetchConv = async () => {
    try {
      const response = await axiosConvList(selectedDate);
      setKeywords(response);
    } catch (error) {
      console.error(error);
    }
  };

  return <Keyword keywords={keywords} />;
};
export default KeywordContainer;
