import { useQuery } from "@tanstack/react-query";

import { axiosEventsCheck } from "../axios/axiosCustom";
import { EventDto } from "@/dto/dto";
// import { getEventsData } from "@/api/axios/Home/homeAxios";
// import { EventData } from "@/api/axios/Home/homeInterface";

export const useGetEvents = (date: string) => {
  const { data, error, isError } = useQuery<EventDto[], Error>({
    queryKey: ["events", date],
    queryFn: () => axiosEventsCheck(date),
  });

  return { data, error, isError };
};
