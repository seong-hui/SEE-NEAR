import { styled } from "styled-components";
import Emotion1Img from "@/assets/images/emoji1.svg";
import Emotion2Img from "@/assets/images/emoji2.svg";
import Emotion3Img from "@/assets/images/emoji3.svg";
import Emotion4Img from "@/assets/images/emoji4.svg";
import Emotion5Img from "@/assets/images/emoji5.svg";
import VerticalSetImg from "@/assets/images/more_vertical.svg";

const Keyword = () => {
  return (
    <KeywordStyled>
      <EmojiWapped>
        <EmojiStyled src={Emotion1Img}></EmojiStyled>
      </EmojiWapped>
      <KeywordTextStyeld>
        <WordTextStyeld>꽃놀이</WordTextStyeld>
        <TimeTextStyled>13:00 PM - 13:12 PM</TimeTextStyled>
      </KeywordTextStyeld>
      <SetimgStyled src={VerticalSetImg}></SetimgStyled>
    </KeywordStyled>
  );
};

const KeywordStyled = styled.div`
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 15px;
`;

const EmojiWapped = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 15px;
  background-color: rgba(1, 175, 218, 0.2);
  display: flex;
  justify-content: center;
  margin-right: 15px;
`;

const EmojiStyled = styled.img`
  width: 36px;
`;

const KeywordTextStyeld = styled.div`
  line-height: 1.4rem;
`;

const WordTextStyeld = styled.div`
  font-weight: bold;
`;

const TimeTextStyled = styled.div`
  font-size: 12px;
  color: #bdbdbd;
`;

const SetimgStyled = styled.img`
  margin-left: auto;
`;
export default Keyword;
