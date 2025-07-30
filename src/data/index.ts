// Central export file for all portfolio data
export { personalInfo } from './personalInfo';
export { education } from './education';
export { experience } from './experience';
export { skills } from './skills';
export { projects } from './projects';
export { activities } from './activities';
export { travelLocations } from './travel';

// Re-export types for convenience
export type {
  PersonalInfo,
  Education,
  Experience,
  SkillCategory,
  Project,
  Activity,
  TravelLocation,
  TravelVisit,
} from '../types';
