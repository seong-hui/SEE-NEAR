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
interface CountData {
  id: number;
  emotion_0_count: number;
  emotion_1_count: number;
  emotion_2_count: number;
  emotion_3_count: number;
}

interface AverageData {
  id: number;
  emotion_0_mean: number;
  emotion_1_mean: number;
  emotion_2_mean: number;
  emotion_3_mean: number;
}

interface VarianceData {
  id: number;
  variance: number;
}

export interface WeeklyData {
  counts: CountData[];
  averages: AverageData[];
  variances: VarianceData[];
}
