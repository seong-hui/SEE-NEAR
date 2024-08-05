export function extractTime(date: string) {
  const newDate = new Date(date);
  const hours = newDate.getHours().toString().padStart(2, "0"); // 시간을 두 자리 숫자로 포맷
  const minutes = newDate.getMinutes().toString().padStart(2, "0"); // 분을 두 자리 숫자로 포맷
  return `${hours}:${minutes}`;
}
