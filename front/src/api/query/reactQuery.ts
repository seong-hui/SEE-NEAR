import { useQuery } from "@tanstack/react-query";

import { axiosEventsCheck } from "../axios/axiosCustom";
import { EventDto, ConversationDto } from "@/dto/dto";
import { axiosConvList } from "../axios/axiosCustom";

export const useGetEvents = (date: string) => {
  const { data, error, isError } = useQuery<EventDto[], Error>({
    queryKey: ["events", date],
    queryFn: () => axiosEventsCheck(date),
  });

  return { data, error, isError };
};

export const useGetConv = (date: string) => {
  const { data, error, isError } = useQuery<ConversationDto[], Error>({
    queryKey: ["convs", date],
    queryFn: () => axiosConvList(date),
  });

  return { data, error, isError };
};
