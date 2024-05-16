export interface EventDto {
  id: number;
  title: string;
  location: string;
  datetime: string;
}

export interface ConversationDto {
  id: number;
  content: string;
  start: string;
  end: string;
  keyword: string;
  emotion: number;
}
