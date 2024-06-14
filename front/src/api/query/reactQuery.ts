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
  MemberDto,
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
  axiosGetMember,
  axiosRoutineUpdate,
  axiosRoutineDelete,
  axiosEventsUpdate,
  axiosGetKeywordImg,
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

export const useGetEmotions = (date: string) => {
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

export const useEventsUpdate = () => {
  const mutation = useMutation<EventDto, AxiosError, EventDto>({
    mutationFn: (eventData) =>
      axiosEventsUpdate(
        eventData.id,
        eventData?.title,
        eventData?.location,
        eventData?.datetime,
        eventData?.is_checked
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
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
    mutationFn: (data) => axiosRoutineCreate(data.name, data.time),
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

export const useRoutineUpdate = (onSuccessCallback: () => void) => {
  const mutation = useMutation<RoutineDto, AxiosError, RoutineDto>({
    mutationFn: (data) => axiosRoutineUpdate(data.id, data.name, data.time),
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

export const useRoutineDelete = (onSuccessCallback: () => void) => {
  const mutation = useMutation<number, AxiosError, number>({
    mutationFn: (id) => axiosRoutineDelete(id),
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

export const useGetMember = () => {
  const { data, error, isError } = useQuery<MemberDto[], Error>({
    queryKey: ["members"],
    queryFn: axiosGetMember,
  });

  return { data, error, isError };
};

export const useGetKeywordImg = (date: string) => {
  const { data, error, isError } = useQuery<any, Error>({
    queryKey: ["keywordImg"],
    queryFn: () => axiosGetKeywordImg(date),
  });

  return { data, error, isError };
};
