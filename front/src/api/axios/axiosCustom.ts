import instance from "@/api/axios/axiosInstance";

interface EventsResponse {
  title: string;
  location: string;
  datetime: string;
  id: number;
}

export const axiosEventsCreate = async (
  title: string,
  location: string,
  datetime: string
): Promise<EventsResponse> => {
  const response = await instance.post<EventsResponse>("/events/create", {
    title,
    location,
    datetime,
  });
  return response.data;
};

interface EventsCheckResponse {
  id: number;
  title: string;
  location: string;
  datetime: string;
}

export const axiosEventsCheck = async (
  date: string
): Promise<EventsCheckResponse[]> => {
  try {
    const response = await instance.get<EventsCheckResponse[]>(
      `/events/${date}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosFetchEvent = async (id: number): Promise<EventsResponse> => {
  try {
    const response = await instance.get<EventsResponse>(`/events/${id}`);
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
): Promise<EventsResponse> => {
  try {
    const body = { title, location, datetime };
    const response = await instance.put<EventsResponse>(`/events/${id}`, body);
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

interface ConvResponse {
  id: number;
  content: string;
  start: string;
  end: string;
  keyword: string;
  emotion: number;
}

export const axiosConvList = async (date: string): Promise<ConvResponse[]> => {
  try {
    const response = await instance.get<ConvResponse[]>(
      `/conv/reports/${date}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosFetchConv = async (id: number): Promise<ConvResponse> => {
  try {
    const response = await instance.get<ConvResponse>(`/conv/posts/${id}`);
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
