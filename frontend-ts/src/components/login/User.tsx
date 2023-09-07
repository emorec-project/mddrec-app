export type User = {
    name: string;
    language: 'en' | 'he';
    userType: 'therapist' | 'patient';
    therapistName?: string;
    patients?: string[];
  };