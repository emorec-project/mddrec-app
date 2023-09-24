export type User = {
    email: string;
    name?: string;
    language: 'en' | 'he';
    userType: 'therapist' | 'patient';
    therapistName?: string;
    patients?: string[];
  };