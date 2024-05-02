import { styled } from "styled-components";
import Emotion1Img from "@/assets/images/emoji1.svg";
import Emotion2Img from "@/assets/images/emoji2.svg";
import Emotion3Img from "@/assets/images/emoji3.svg";
import Emotion4Img from "@/assets/images/emoji4.svg";
import Emotion5Img from "@/assets/images/emoji5.svg";
import VerticalSetImg from "@/assets/images/more_vertical.svg";
import { useState, useEffect } from "react";
import axios from "axios";

interface Keyword {
  id: number;
  word: string;
  time: string;
  mood: number;
}

const Keyword = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchKeywords = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://api..com/keywords");
        setKeywords(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeywords();
    setKeywords(sampleKeywords);
  }, []);

  const getEmoji = (mood: number) => {
    if (mood == 1) return Emotion1Img;
    else if (mood == 2) return Emotion2Img;
    else if (mood == 3) return Emotion3Img;
    else if (mood == 4) return Emotion4Img;
    else if (mood == 5) return Emotion5Img;
  };

  const sampleKeywords = [
    {
      id: 1,
      word: "산책",
      time: "10:00 AM - 11:00 AM",
      mood: 2,
    },
    {
      id: 2,
      word: "점심",
      time: "01:00 PM - 02:00 PM",
      mood: 3,
    },
  ];

  return (
    <>
      {keywords.map((keyword) => (
        <KeywordStyled key={keyword.id}>
          <EmojiWrapped>
            <EmojiStyled src={getEmoji(keyword.mood)} alt="MoodEmoji" />
          </EmojiWrapped>
          <KeywordTextStyled>
            <WordTextStyled>{keyword.word}</WordTextStyled>
            <TimeTextStyled>{keyword.time}</TimeTextStyled>
          </KeywordTextStyled>
          <SetImgStyled src={VerticalSetImg} alt="Settings" />
        </KeywordStyled>
      ))}
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
