import Emotion1Img from "@/assets/images/emoji1.svg";
import Emotion2Img from "@/assets/images/emoji2.svg";
import Emotion3Img from "@/assets/images/emoji3.svg";
import Emotion4Img from "@/assets/images/emoji4.svg";
import Emotion5Img from "@/assets/images/emoji5.svg";

export function getEmotionImage(emotion: number) {
  switch (emotion) {
    case 0:
      return Emotion1Img;
    case 1:
      return Emotion1Img;
    case 2:
      return Emotion1Img;
    case 3:
      return Emotion1Img;
    default:
      return;
  }
}

export const getEmoji = (mood: number) => {
  if (mood === 0) return Emotion1Img;
  else if (mood === 1) return Emotion2Img;
  else if (mood === 2) return Emotion3Img;
  else if (mood === 3) return Emotion4Img;
  else if (mood === 4) return Emotion5Img;
};
