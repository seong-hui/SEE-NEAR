import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

import {
  EventDto,
  ConversationDto,
  EmotionDto,
  WeeklyData,
  SeniorInfoDto,
  SeniorPostInfo,
  RoutineDto,
} from "@/dto/dto";
import {
  axiosEventsCheck,
  axiosConvList,
  axiosGetEmotion,
  axiosEventsCreate,
  axiosDeleteEvent,
  axiosGetWeekly,
  axiosGetSeniorInfo,
  axiosUpdateSenior,
  axiosGeRoutine,
  axiosRoutineCreate,
} from "@/api/axios/axiosCustom";

import { AxiosError, isAxiosError } from "axios";

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

export const useGetEvent = (date: string) => {
  const { data, error, isError } = useMutation<EventDto[], Error>({
    onSuccess: (data) => {
      console.log("성공", data);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return { data, error, isError };
};

export const useGetWeeklyData = (date: string) => {
  const { data, error, isError } = useQuery<WeeklyData, Error>({
    queryKey: ["weekly", date],
    queryFn: () => axiosGetWeekly(date),
  });

  return { data, error, isError };
};

interface EventData {
  title: string;
  location: string;
  datetime: string;
}

export const useEventsCreate = (onSuccessCallback: () => void) => {
  const mutation = useMutation<EventData, AxiosError, EventData>({
    mutationFn: (eventData) =>
      axiosEventsCreate(
        eventData.title,
        eventData.location,
        eventData.datetime
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      onSuccessCallback();
    },
    onError: (e) => {
      if (isAxiosError(e)) console.log(e);
      else console.log(e);
    },
  });

  return mutation;
};

export const useEventsDelete = (onSuccessCallback: () => void) => {
  const mutation = useMutation<EventDto, AxiosError, EventDto>({
    mutationFn: (eventData) =>
      axiosDeleteEvent(
        eventData.id,
        eventData.title,
        eventData.location,
        eventData.datetime
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      onSuccessCallback();
    },
    onError: (e: AxiosError) => {
      if (isAxiosError(e)) console.log(e);
      else console.log(e);
    },
  });

  return mutation;
};

export const useGetSenior = () => {
  const { data, error, isError } = useQuery<SeniorInfoDto, Error>({
    queryKey: ["senior"],
    queryFn: axiosGetSeniorInfo,
  });

  return { data, error, isError };
};

export const usePutSenior = (onSuccessCallback: () => void) => {
  const mutation = useMutation<SeniorPostInfo, AxiosError, SeniorPostInfo>({
    mutationFn: (data) =>
      axiosUpdateSenior(
        data.senior_gender,
        data.senior_birth,
        data.senior_diseases,
        data.senior_interests
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["senior"],
      });
      onSuccessCallback();
    },
    onError: (e) => {
      if (isAxiosError(e)) console.log(e);
      else console.log(e);
    },
  });

  return mutation;
};

export const useGetRoutine = () => {
  const { data, error, isError } = useQuery<RoutineDto[], Error>({
    queryKey: ["routines"],
    queryFn: axiosGeRoutine,
  });

  return { data, error, isError };
};

export const useRoutineCreate = (onSuccessCallback: () => void) => {
  const mutation = useMutation<RoutineDto, AxiosError, RoutineDto>({
    mutationFn: (data) =>
      axiosRoutineCreate(data.name, data.time, data.is_active),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["routines"],
      });
      onSuccessCallback();
    },
    onError: (e) => {
      if (isAxiosError(e)) console.log(e);
      else console.log(e);
    },
  });

  return mutation;
};
