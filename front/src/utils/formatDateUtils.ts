export const formatDate = (date: Date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const formatDate2 = (date: Date) => {
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const dayOfWeek = days[date.getDay()]; // 요일 (0 = 일요일, 1 = 월요일, ...)
  const month = months[date.getMonth()]; // 월 (0 = 1월, 1 = 2월, ...)
  const day = date.getDate(); // 일

  return `${month} ${day}일 ${dayOfWeek}`;
};

export function formatDateToYYYYMM(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  return `${year}-${formattedMonth}`;
}

export function formatTimestampToString(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
}
