import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { styled } from "styled-components";
import { formatDate } from "@/utils/formatDateUtils";
import { EmotionDto } from "@/dto/dto";
import { getEmotionImage } from "@/hooks/getEmotionImgaes";
interface CalendarFuncProps {
  onClickDay: (date: Date) => void;
  selectedDate: Date;
  onMonthChange: (startDate: Date) => void;
  emotionData: EmotionDto[];
}

const CalendarFunc = ({
  onClickDay,
  selectedDate,
  onMonthChange,
  emotionData,
}: CalendarFuncProps) => {
  const getActiveMonth = (activeStartDate: Date | null) => {
    if (activeStartDate !== null) {
      onMonthChange(activeStartDate);
    }
  };

  return (
    <StyleCalendar
      onClickDay={onClickDay}
      value={selectedDate}
      onActiveStartDateChange={({ activeStartDate }) =>
        getActiveMonth(activeStartDate)
      }
      formatDay={(locale, date) => date.getDate().toString()} //날짜에서 "일"빼고 숫자만 보여주기
      minDetail="year" // 10년단위 년도 숨기기
      next2Label={null} // +1년 & +10년 이동 버튼 숨기기
      prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
      showNeighboringMonth={false} //앞뒤 달의 이어지는 날짜 보여주기 여부
      tileContent={({ date, view }) => {
        if (view === "month") {
          const dateString = formatDate(date);
          const emotionEntry = emotionData.find(
            (entry) => entry.date === dateString
          );
          const emotionComponent = emotionEntry ? (
            getEmotionImage(emotionEntry.emotion)
          ) : (
            <BasicDotStyled />
          );

          return <>{emotionComponent}</>;
        }
        return null;
      }}
    />
  );
};

export const StyleCalendar = styled(Calendar)`
  width: 700px;
  padding: 20px;
  border: none;
  background-color: var(--background-color);
  line-height: 2.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .react-calendar__month-view__weekdays {
    font-size: 1rem;
  }

  .react-calendar__tile,
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: none;
    color: black;
  }
  .react-calendar__navigation button {
    font-size: 1.8rem;
  }

  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:focus {
    background: none;
  }
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    border: 1.2px solid #eaeaea;
    border-radius: 15px;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
  }
`;

const EmotionImg = styled.img`
  width: 3rem;
  height: 3rem;
  margin-top: -5px;
`;

const BasicDotStyled = styled.div`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  background-color: #eaeaea;
  margin-top: -5px;
`;
export default CalendarFunc;
