export type User = {
  email: string;
  name?: string;
  language: 'en' | 'he';
  userType: 'therapist' | 'patient';
  therapistName?: string;
  patients?: string[];
};

export type UserDetails = {
  user_type: 'therapist' | 'patient';
  email: string;
  password: string;
  selected_therapist?: string;
}