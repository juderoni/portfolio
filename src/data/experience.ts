import type { Experience } from '../types';

export const experience: Experience[] = [
  {
    company: 'Tech Solutions Inc.',
    position: 'Software Engineer Intern',
    location: 'Raleigh, NC',
    startDate: '2023-06',
    endDate: '2023-08',
    description:
      'Developed full-stack web applications using React and Node.js',
    achievements: [
      'Built responsive user interfaces serving 10,000+ daily users',
      'Optimized database queries resulting in 40% performance improvement',
      'Collaborated with cross-functional teams using Agile methodologies',
    ],
  },
  {
    company: 'NC State University',
    position: 'Graduate Research Assistant',
    location: 'Raleigh, NC',
    startDate: '2022-08',
    endDate: '2024-05',
    description:
      'Conducted research in distributed systems and machine learning applications',
    achievements: [
      'Published research paper on distributed algorithm optimization',
      'Mentored undergraduate students in research projects',
      'Developed Python tools for data analysis and visualization',
    ],
  },
  {
    company: 'NC State University',
    position: 'Undergraduate Teaching Assistant',
    location: 'Raleigh, NC',
    startDate: '2021-01',
    endDate: '2022-05',
    description: 'Assisted in teaching Data Structures and Algorithms course',
    achievements: [
      'Conducted weekly lab sessions for 30+ students',
      'Graded assignments and provided detailed feedback',
      'Held office hours to help students with programming concepts',
    ],
  },
];
