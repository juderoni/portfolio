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
      repo: 'https://github.com/judesproul/betcha-ios',
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
    links: {
      demo: 'https://zybooks-clone-demo.com',
      repo: 'https://github.com/judesproul/zybooks-clone',
    },
  },
  {
    id: 'sunshine-web',
    title: 'Sunshine Web Application',
    description:
      'A weather and outdoor activity planning web application that provides personalized recommendations based on weather conditions, user preferences, and location data. Features responsive design and real-time weather updates.',
    technologies: [
      'React',
      'TypeScript',
      'Weather API',
      'Geolocation API',
      'CSS Modules',
      'Vite',
    ],
    period: '2022-2023',
    links: {
      demo: 'https://sunshine-app.com',
      repo: 'https://github.com/judesproul/sunshine-web',
    },
  },
];
