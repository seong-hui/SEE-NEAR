import { useQuery } from "@tanstack/react-query";

import { EventDto, ConversationDto, EmotionDto } from "@/dto/dto";
import {
  axiosEventsCheck,
  axiosConvList,
  axiosGetEmotion,
} from "@/api/axios/axiosCustom";

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

export const useGeEmotions = (date: string) => {
  const { data, error, isError } = useQuery<EmotionDto[], Error>({
    queryKey: ["emotions", date],
    queryFn: () => axiosGetEmotion(date),
  });

  return { data, error, isError };
};
