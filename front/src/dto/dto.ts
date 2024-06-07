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
export interface CountData {
  id: number;
  emotion_0_count: number;
  emotion_1_count: number;
  emotion_2_count: number;
  emotion_3_count: number;
}

export interface AverageData {
  id: number;
  emotion_0_mean: number;
  emotion_1_mean: number;
  emotion_2_mean: number;
  emotion_3_mean: number;
}

export interface VarianceData {
  id: number;
  variance: number;
}

export interface WeeklyData {
  counts: CountData[];
  averages: AverageData[];
  variances: VarianceData[];
}

export interface TransformedData {
  name: string;
  data: number[];
}

export interface SeniorInfoDto {
  id: string;
  senior_birth: string;
  senior_gender: number;
  senior_diseases: string;
  senior_interests: string;
  senior_id: number;
}

export interface SeniorPostInfo {
  senior_gender: number;
  senior_birth: string;
  senior_diseases: string;
  senior_interests: string;
}

export interface RoutineDto {
  id?: number;
  name: string;
  time: string;
  is_active?: boolean;
}

export interface MemberDto {
  id: number;
  username: string;
  last_name: string;
  first_name: string;
  role: string;
}
