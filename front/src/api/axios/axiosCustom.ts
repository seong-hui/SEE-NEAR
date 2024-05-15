import instance from "@/api/axios/axiosInstance";

interface EventsResponse {
  title: string;
  location: string;
  datetime: string;
  id: number;
}

export const axioxEventsCreate = async (
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

export const axioxEventsCheck = async (
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
