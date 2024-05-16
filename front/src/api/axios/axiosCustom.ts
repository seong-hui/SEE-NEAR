import instance from "@/api/axios/axiosInstance";
import { EventDto, ConversationDto } from "@/dto/dto";

export const axiosEventsCreate = async (
  title: string,
  location: string,
  datetime: string
): Promise<EventDto> => {
  const response = await instance.post<EventDto>("/events/create", {
    title,
    location,
    datetime,
  });
  return response.data;
};

export const axiosEventsCheck = async (date: string): Promise<EventDto[]> => {
  try {
    const response = await instance.get<EventDto[]>(`/events/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosFetchEvent = async (id: number): Promise<EventDto> => {
  try {
    const response = await instance.get<EventDto>(`/events/${id}`);
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

export const axiosDeleteEvent = async (id: number): Promise<void> => {
  try {
    await instance.delete(`/events/${id}`);
  } catch (error) {
    throw error;
  }
};

export const axiosConvList = async (
  date: string
): Promise<ConversationDto[]> => {
  try {
    const response = await instance.get<ConversationDto[]>(
      `/conv/reports/${date}`
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
