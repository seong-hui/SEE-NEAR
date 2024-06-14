import { instance, signupInstance } from "@/api/axios/axiosInstance";
import {
  PostDto,
  ChatbotDto,
  EventDto,
  ConversationDto,
  UsetInfoDto,
  EmotionDto,
  WeeklyData,
  SeniorInfoDto,
  SeniorPostInfo,
  RoutineDto,
  MemberDto,
} from "@/dto/dto";

export const axiosPostCreate = async (): Promise<PostDto> => {
  try {
    const response = await instance.get<PostDto>("/conv/posts/create");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const axiosPostUpdate = async (id: number) => {
  try {
    const response = await instance.put(`/conv/posts/update/${id}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const axiosChatbotDefault = async (
  text: string,
  audio: Blob
): Promise<ChatbotDto> => {
  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("audio", audio);
    const response = await instance.post<ChatbotDto>(
      "/chat/default",
      formData
    );
    return response.data
  } catch (error) {
    throw error;
  }
}

export const axiosChatbotEvent = async (
  text: string,
): Promise<ChatbotDto> => {
  try {
    const formData = new FormData();
    formData.append("text", text)
    const response = await instance.post<ChatbotDto>(
      "/chat/event",
      formData
    );
    return response.data
  } catch (error) {
    throw error;
  }
}

export const axiosChatbotAudio = async (): Promise<any> => {
  try{
    const response = await instance.get<any>(
      "/chat/audio", 
      { responseType: "blob" }
    )
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const axiosEventsCreate = async (
  title: string,
  location: string,
  datetime: string
): Promise<EventDto> => {
  try {
    const response = await instance.post<EventDto>("/events/create", {
      title,
      location,
      datetime,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosEventsCheck = async (date: string): Promise<EventDto[]> => {
  try {
    const response = await instance.get<EventDto[]>(`/events/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const axiosEventsUpdate = async (
  id: number,
  title?: string,
  location?: string,
  datetime?: string,
  is_checked?: boolean
): Promise<EventDto> => {
  try {
    const response = await instance.put<EventDto>(`/events/${id}`, {
      title,
      location,
      datetime,
      is_checked,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosFetchEvent = async (id: number): Promise<EventDto> => {
  try {
    const response = await instance.get<EventDto>(`/events/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosUpdateEvent = async (
  id: number,
  title: string,
  location: string,
  datetime: string
): Promise<EventDto> => {
  try {
    const body = { title, location, datetime };
    const response = await instance.put<EventDto>(`/events/${id}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosDeleteEvent = async (
  id: number,
  title: string,
  location: string,
  datetime: string
): Promise<any> => {
  try {
    const body = { title, location, datetime };
    await instance.delete(`/events/${id}`, { data: body });
  } catch (error) {
    throw error;
  }
};

export const axiosConvList = async (
  date: string
): Promise<ConversationDto[]> => {
  try {
    const response = await instance.get<ConversationDto[]>(
      `/conv/posts/${date}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const axiosFetchConv = async (id: number): Promise<ConversationDto> => {
  try {
    const response = await instance.get<ConversationDto>(`/conv/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const axiosDeleteConv = async (id: number): Promise<void> => {
  try {
    await instance.delete(`/conv/posts/${id}`);
  } catch (error) {
    throw error;
  }
};

interface ApiResponse {
  token: string;
  is_senior: boolean;
}
export const axiosLogin = async (
  username: string,
  password: string
): Promise<ApiResponse> => {
  const response = await signupInstance.post<ApiResponse>("/auth/user/login/", {
    username,
    password,
  });
  return response.data;
};

interface ApiJoinResponse {
  token: string;
  user: UsetInfoDto;
}

export const axiosJoin = async (
  username: string,
  password: string,
  email: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  birth: string,
  is_senior: boolean,
  family_id?: string,
  role?: string
): Promise<ApiJoinResponse> => {
  const response = await signupInstance.post<ApiJoinResponse>(
    "/auth/user/signup",
    {
      username,
      password,
      email,
      first_name,
      phone_number,
      birth,
      is_senior,
      last_name,
      family_id,
      role,
    }
  );
  return response.data;
};

export const axiosGetEmotion = async (date: string): Promise<EmotionDto[]> => {
  try {
    const response = await instance.get<EmotionDto[]>(`/conv/day/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosGetWeekly = async (date: string): Promise<WeeklyData> => {
  try {
    const response = await instance.get<WeeklyData>(`/conv/week/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosGetSeniorInfo = async (): Promise<SeniorInfoDto> => {
  try {
    const response = await instance.get<SeniorInfoDto>(`/auth/family`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosUpdateSenior = async (
  senior_gender: number,
  senior_birth: string,
  senior_diseases: string,
  senior_interests: string
): Promise<any> => {
  try {
    const body = {
      senior_gender,
      senior_birth,
      senior_diseases,
      senior_interests,
    };
    await instance.put<SeniorPostInfo>(`/auth/family/update`, body);
  } catch (error) {
    throw error;
  }
};

export const axiosGeRoutine = async (): Promise<RoutineDto[]> => {
  try {
    const response = await instance.get<RoutineDto[]>(`/auth/routine`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosRoutineCreate = async (name: string, time: string) => {
  const response = await instance.post("/auth/routine/create", {
    name,
    time,
  });
  return response.data;
};

export const axiosRoutineUpdate = async (
  id: number | undefined,
  name: string,
  time: string
) => {
  const response = await instance.put(`/auth/routine/${id}`, {
    name,
    time,
  });
  return response.data;
};

export const axiosRoutineDelete = async (id: number) => {
  const response = await instance.delete(`/auth/routine/${id}`, {});
  return response.data;
};

export const axiosGetMember = async (): Promise<MemberDto[]> => {
  try {
    const response = await instance.get<MemberDto[]>(`/auth/family/member`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosGetKeywordImg = async (date: string): Promise<any> => {
  try {
    const response = await instance.get(`/conv/week/keyword/${date}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(response.data);
    return url;
  } catch (error) {
    throw error;
  }
};
