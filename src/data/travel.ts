import type { TravelLocation } from '../types';

export const travelLocations: TravelLocation[] = [
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    },
    description: 'The City of Light, known for its art, fashion, gastronomy, and culture.',
    totalTimeSpent: '2 weeks',
    visits: [
      {
        id: 'paris-2023',
        visitDate: 'June 2023',
        duration: '1 week',
        description: 'First visit to Paris exploring the classic tourist attractions and experiencing French culture.',
        photos: ['/images/travel/paris-2023-1.jpg', '/images/travel/paris-2023-2.jpg'],
        highlights: [
          'Visited the Eiffel Tower at sunset',
          'Explored the Louvre Museum',
          'Walked along the Seine River',
          'Tried authentic French pastries'
        ]
      },
      {
        id: 'paris-2024',
        visitDate: 'March 2024',
        duration: '1 week',
        description: 'Return visit focusing on neighborhoods and local experiences.',
        photos: ['/images/travel/paris-2024-1.jpg', '/images/travel/paris-2024-2.jpg'],
        highlights: [
          'Explored Montmartre district',
          'Visited local markets',
          'Attended a cooking class',
          'Discovered hidden cafés'
        ]
      }
    ]
  },
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    coordinates: {
      lat: 35.6762,
      lng: 139.6503
    },
    description: 'A vibrant metropolis blending traditional culture with cutting-edge technology.',
    totalTimeSpent: '10 days',
    visits: [
      {
        id: 'tokyo-2023',
        visitDate: 'September 2023',
        duration: '10 days',
        description: 'Amazing journey through modern and traditional Japan.',
        photos: ['/images/travel/tokyo-2023-1.jpg', '/images/travel/tokyo-2023-2.jpg'],
        highlights: [
          'Experienced the bustling Shibuya crossing',
          'Visited ancient temples in Asakusa',
          'Enjoyed sushi at Tsukiji Market',
          'Explored the tech district of Akihabara',
          'Witnessed cherry blossoms in Ueno Park'
        ]
      }
    ]
  },
  {
    id: 'new-york-usa',
    name: 'New York City',
    country: 'United States',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    description: 'The city that never sleeps, a global hub for finance, arts, fashion, and culture.',
    totalTimeSpent: '3 weeks',
    visits: [
      {
        id: 'nyc-2022',
        visitDate: 'December 2022',
        duration: '1 week',
        description: 'Winter holiday visit experiencing the festive atmosphere.',
        photos: ['/images/travel/nyc-2022-1.jpg', '/images/travel/nyc-2022-2.jpg'],
        highlights: [
          'Ice skating at Rockefeller Center',
          'Broadway show experience',
          'Central Park in winter',
          'Times Square New Year preparations'
        ]
      },
      {
        id: 'nyc-2023',
        visitDate: 'August 2023',
        duration: '2 weeks',
        description: 'Summer internship and exploration of different boroughs.',
        photos: ['/images/travel/nyc-2023-1.jpg', '/images/travel/nyc-2023-2.jpg'],
        highlights: [
          'Worked in Manhattan tech scene',
          'Explored Brooklyn neighborhoods',
          'Visited museums and galleries',
          'Experienced diverse food culture',
          'Attended rooftop events'
        ]
      }
    ]
  },
  {
    id: 'london-uk',
    name: 'London',
    country: 'United Kingdom',
    coordinates: {
      lat: 51.5074,
      lng: -0.1278
    },
    description: 'Historic capital city rich in culture, history, and royal heritage.',
    totalTimeSpent: '5 days',
    visits: [
      {
        id: 'london-2024',
        visitDate: 'May 2024',
        duration: '5 days',
        description: 'Quick but memorable trip exploring British culture and history.',
        photos: ['/images/travel/london-2024-1.jpg', '/images/travel/london-2024-2.jpg'],
        highlights: [
          'Toured the Tower of London',
          'Watched changing of the guard at Buckingham Palace',
          'Explored the British Museum',
          'Enjoyed afternoon tea',
          'Walked across Tower Bridge'
        ]
      }
    ]
  },
  {
    id: 'sydney-australia',
    name: 'Sydney',
    country: 'Australia',
    coordinates: {
      lat: -33.8688,
      lng: 151.2093
    },
    description: 'Iconic harbor city known for its Opera House, beaches, and laid-back lifestyle.',
    totalTimeSpent: '1 week',
    visits: [
      {
        id: 'sydney-2023',
        visitDate: 'November 2023',
        duration: '1 week',
        description: 'Summer adventure exploring beaches and city attractions.',
        photos: ['/images/travel/sydney-2023-1.jpg', '/images/travel/sydney-2023-2.jpg'],
        highlights: [
          'Climbed the Sydney Harbour Bridge',
          'Surfed at Bondi Beach',
          'Opera House performance',
          'Explored The Rocks district',
          'Ferry rides around the harbor'
        ]
      }
    ]
  }
];