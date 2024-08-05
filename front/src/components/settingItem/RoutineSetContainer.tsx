import RoutineSet from "./RoutineSet";
import { useGetRoutine } from "@/api/query/reactQuery";

const RoutineSetContainer = () => {
  const { data: routines = [], error, isError } = useGetRoutine();
  if (isError) {
    console.error(error);
  }

  return <RoutineSet routines={routines} />;
};

export default RoutineSetContainer;
