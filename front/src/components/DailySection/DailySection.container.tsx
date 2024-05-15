import DailySection from "@/components/DailySection/DailySection";
import { useRecoilValue } from "recoil";
import { selectedDateState } from "@/recoil/atom";

const DailySectionContainer = () => {
  const currentDate = useRecoilValue(selectedDateState);
  return <DailySection currentDate={currentDate} />;
};
export default DailySectionContainer;
