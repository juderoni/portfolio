// Type definitions for the data manager tool
// These mirror the main project's types

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  title: string;
  summary: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa: number;
  achievements: string[];
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  period: string;
  links?: {
    demo?: string;
    repo?: string;
  };
}

export interface Activity {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
}

// Travel-related types
export interface TravelVisit {
  id: string;
  visitDate: string;
  duration: string;
  description: string;
  photos: string[];
  highlights: string[];
}

export interface TravelLocation {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  visits: TravelVisit[];
  totalTimeSpent: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Data category info for navigation
export interface DataCategory {
  id: string;
  name: string;
  path: string;
  description: string;
  count?: number;
}