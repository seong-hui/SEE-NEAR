export function formatTime(isoTimeString: string) {
  const timePart = isoTimeString.split(".")[0];
  let [hours, minutes] = timePart.split(":");

  const ampm = parseInt(hours, 10) >= 12 ? "PM" : "AM";

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.padStart(2, "0");

  return `${hours}:${minutes} ${ampm}`;
}
