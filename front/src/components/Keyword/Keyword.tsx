import { styled } from "styled-components";
import Emotion1Img from "@/assets/images/emoji1.svg";
import Emotion2Img from "@/assets/images/emoji2.svg";
import Emotion3Img from "@/assets/images/emoji3.svg";
import Emotion4Img from "@/assets/images/emoji4.svg";
import Emotion5Img from "@/assets/images/emoji5.svg";
import VerticalSetImg from "@/assets/images/more_vertical.svg";
import { formatTime } from "@/utils/formatTime";
import { useState } from "react";
import KeywordModal from "../modal/KeywordModal";

interface ConvResponse {
  id: number;
  content: string;
  start: string;
  end: string;
  keyword: string;
  emotion: number;
}

interface KeywordProps {
  keywords: ConvResponse[];
}

const Keyword = ({ keywords }: KeywordProps) => {
  const getEmoji = (mood: number) => {
    if (mood === 1) return Emotion1Img;
    else if (mood === 2) return Emotion2Img;
    else if (mood === 3) return Emotion3Img;
    else if (mood === 4) return Emotion4Img;
    else if (mood === 5) return Emotion5Img;
  };

  const [selectedKeyword, setSelectedKeyword] = useState<ConvResponse | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const handleKeywordClick = (keyword: ConvResponse) => {
    setSelectedKeyword(keyword);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {keywords.map((keyword) => (
        <KeywordStyled
          key={keyword.id}
          onClick={() => handleKeywordClick(keyword)}
        >
          <EmojiWrapped>
            <EmojiStyled src={getEmoji(keyword.emotion)} alt="MoodEmoji" />
          </EmojiWrapped>
          <KeywordTextStyled>
            <WordTextStyled>{keyword.keyword}</WordTextStyled>
            <TimeTextStyled>
              {formatTime(keyword.start)} - {formatTime(keyword.end)}
            </TimeTextStyled>
          </KeywordTextStyled>
          <SetImgStyled src={VerticalSetImg} alt="Settings" />
        </KeywordStyled>
      ))}
      {showModal && selectedKeyword && (
        <KeywordModal
          show={showModal}
          onClose={handleCloseModal}
          keyword={selectedKeyword}
        />
      )}
    </>
  );
};

const KeywordStyled = styled.div`
  height: 80px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 10px;
`;

const EmojiWrapped = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 15px;
  background-color: rgba(150, 150, 150, 0.1);
  display: flex;
  justify-content: center;
  margin-right: 15px;
`;

const EmojiStyled = styled.img`
  width: 36px;
`;

const KeywordTextStyled = styled.div`
  line-height: 1.4rem;
`;

const WordTextStyled = styled.div`
  font-weight: bold;
`;

const TimeTextStyled = styled.div`
  font-size: 12px;
  color: #bdbdbd;
`;

const SetImgStyled = styled.img`
  margin-left: auto;
`;
export default Keyword;
