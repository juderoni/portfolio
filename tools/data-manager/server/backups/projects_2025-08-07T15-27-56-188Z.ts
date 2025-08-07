import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'betcha-ios',
    title: 'Betcha iOS App',
    description:
      'A social betting application for iOS that allows users to create and participate in friendly wagers with friends. Features real-time notifications, secure payment processing, and social interaction capabilities.',
    technologies: [
      'Swift',
      'UIKit',
      'Core Data',
      'Firebase',
      'Push Notifications',
      'In-App Purchases',
    ],
    period: '2023-2024',
    links: {
      repo: 'https://github.com/bettrapp/bettr-ios-frontend',
    },
  },
  {
    id: 'zybooks-clone',
    title: 'Zybooks Clone',
    description:
      'A comprehensive educational platform clone that replicates the core functionality of Zybooks. Includes interactive coding exercises, progress tracking, and administrative features for instructors.',
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'TypeScript',
      'CSS3',
    ],
    period: '2023',
    
  },
  {
    id: 'sunshine-web',
    title: 'Sunshine Web Application',
    description: 'Mental health wellness application that was going to made for use by NC State. Made in Senior Design and partnered with the Wellness Center at NC State to make an MVP.',
    technologies: [
      'React',
      'TypeScript',
      'Weather API',
      'Geolocation API',
      'CSS Modules',
      'Vite',
    ],
    period: '2022-2023',
    
  },
];
