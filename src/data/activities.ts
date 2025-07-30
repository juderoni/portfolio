import type { Activity } from '../types';

export const activities: Activity[] = [
  {
    id: 'surf-club-vp',
    title: 'Vice-President',
    organization: 'NC State Surf Club',
    period: '2021-2023',
    description:
      'Led organizational initiatives and coordinated club activities for the NC State Surf Club, managing events, member engagement, and partnerships with local surf shops.',
    achievements: [
      'Increased club membership by 40% through targeted recruitment campaigns',
      'Organized annual surf trips to the Outer Banks for 50+ members',
      'Established partnerships with local surf shops for equipment discounts',
      'Coordinated weekly beach cleanups and environmental awareness events',
      'Managed club budget and fundraising activities',
    ],
  },
  {
    id: 'competitive-programming',
    title: 'Active Participant',
    organization: 'Competitive Programming Club',
    period: '2020-2024',
    description:
      'Regular participant in competitive programming meetings and contests, focusing on algorithm design, problem-solving, and coding efficiency under time constraints.',
    achievements: [
      'Participated in weekly programming contests and practice sessions',
      'Solved 200+ algorithmic problems across various difficulty levels',
      'Mentored newer members in dynamic programming and graph algorithms',
      'Represented NC State in regional programming competitions',
      "Contributed to club's problem-solving workshops and tutorials",
    ],
  },
];
