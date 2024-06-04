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

export interface UsetInfoDto {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birth: string;
  is_senior: boolean;
}

export interface EmotionDto {
  id: number;
  emotion: number;
  date: string;
}
