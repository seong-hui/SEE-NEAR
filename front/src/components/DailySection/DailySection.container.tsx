import DailySection from "@/components/DailySection/DailySection";

interface DailySectionContainerProps {
  selectedDate: Date;
}

const DailySectionContainer = ({
  selectedDate,
}: DailySectionContainerProps) => {
  return <DailySection currentDate={selectedDate} />;
};
export default DailySectionContainer;
