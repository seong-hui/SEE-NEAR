import SettingItem from "./SettingItem";
import { useGetSenior } from "@/api/query/reactQuery";

const SettingItemContainer = () => {
  const { data: seniorInfo, error, isError } = useGetSenior();
  if (isError) {
    console.error(error);
  }

  return <SettingItem seniorInfo={seniorInfo} />;
};

export default SettingItemContainer;
