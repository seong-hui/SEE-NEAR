import Emotion1Img from "@/assets/images/emoji1.svg";
import Emotion3Img from "@/assets/images/emoji3.svg";
import Emotion4Img from "@/assets/images/emoji4.svg";
import Emotion5Img from "@/assets/images/emoji5.svg";

export const getEmotionImage = (emotion: number) => {
  switch (emotion) {
    case 0:
      return Emotion4Img;
    case 1:
      return Emotion5Img;
    case 2:
      return Emotion1Img;
    case 3:
      return Emotion3Img;
    default:
      return;
  }
};
