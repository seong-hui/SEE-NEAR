import RightSection from "@/components/RightSection/RightSection";
import { useGetMember } from "@/api/query/reactQuery";

const RightSectionContainer = () => {
  const { data: members = [], error, isError } = useGetMember();
  if (isError) {
    console.error(error);
  }
  return <RightSection members={members} />;
};

export default RightSectionContainer;
