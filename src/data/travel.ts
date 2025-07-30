// src/data/travelLocations.ts
import type { TravelLocation } from '../types';

export const travelLocations: TravelLocation[] = [
  {
    id: 'aguadilla-puerto-rico',
    name: 'Aguadilla',
    country: 'Puerto Rico',
    coordinates: { lat: 18.4955, lng: -67.1541 },
    description:
      'Beautiful coastal town in northwest Puerto Rico known for its stunning beaches and surfing.',
    totalTimeSpent: '1 week',
    visits: [
      {
        id: 'aguadilla-2021',
        visitDate: 'December 2021',
        duration: '1 week',
        description:
          'Great surf trip with my father and brother.',
        photos: [
          '/images/travel/aguadilla_2021_12/aguadilla_2021_12_i1.jpeg',
          '/images/travel/aguadilla_2021_12/aguadilla_2021_12_n2.jpeg',
          '/images/travel/aguadilla_2021_12/aguadilla_2021_12_n3.jpeg'
        ],
        highlights: [
          'Relaxed on pristine beaches',
          'Sick surf',
          'Enjoyed tropical weather in December',
          'Discovered beautiful coastal views'
        ]
      }
    ]
  },

  {
    id: 'rincon-puerto-rico',
    name: 'Rincón',
    country: 'Puerto Rico',
    coordinates: { lat: 18.3369, lng: -67.2492 },
    description:
      'Amazing highschool graduation trip. Had a blast surfing with friends',
    totalTimeSpent: '1 week',
    visits: [
      {
        id: 'rincon-2021',
        visitDate: 'April 2021',
        duration: '1 week',
        description:
          "Surf trip to one of Puerto Rico's most famous beach destinations.",
        photos: [
          '/images/travel/rincon_2021_4/IMG_5399.JPEG',
          '/images/travel/rincon_2021_4/rincon_2021_4_n1.jpeg',
          '/images/travel/rincon_2021_4/rincon_2021_4_n2.jpeg',
          '/images/travel/rincon_2021_4/rincon_2021_4_n3.jpeg'
        ],
        highlights: [
          'Watched incredible sunsets from the beach',
          'Experienced world-class surfing spots',
          'Explored the laid-back beach town vibe',
          'Enjoyed fresh seafood and local cuisine'
        ]
      }
    ]
  },

  {
    id: 'jensen-beach-florida',
    name: 'Jensen Beach',
    country: 'United States',
    coordinates: { lat: 27.2542, lng: -80.2297 },
    description:
      "Charming coastal community on Florida's Treasure Coast known for its pristine beaches and sea turtle nesting.",
    totalTimeSpent: '3 days',
    visits: [
      {
        id: 'jensen-beach-2025',
        visitDate: 'March 2025',
        duration: '3 days',
        description:
          'Spring break camping trip. Stayed at a farm and drove to the beach daily.',
        photos: [
          '/images/travel/jensen_beach_2025_3/100_0459.JPG',
          '/images/travel/jensen_beach_2025_3/100_0465.JPG',
          '/images/travel/jensen_beach_2025_3/IMG_5655.jpeg',
          '/images/travel/jensen_beach_2025_3/jensen_beach_2025_3_n1.jpeg',
          '/images/travel/jensen_beach_2025_3/jensen_beach_2025_3_n2.jpeg',
          '/images/travel/jensen_beach_2025_3/jensen_beach_2025_3_n3.jpeg',
          '/images/travel/jensen_beach_2025_3/jensen_beach_2025_3_n4.jpeg',
          '/images/travel/jensen_beach_2025_3/jensen_beach_2025_3_n5.jpeg',
          '/images/travel/jensen_beach_2025_3/jensen_beach_2025_3_n6.jpeg'
        ],
        highlights: [
          'Camped at a farm',
          'Enjoyed perfect weather',
          'Explored the local coastal community',
          'Met with friends at their camper nearby'
        ]
      }
    ]
  },

  {
    id: 'frisco-north-carolina',
    name: 'Frisco (Hatteras Island)',
    country: 'United States',
    coordinates: { lat: 35.24, lng: -75.62 },
    description:
      'Really fun surf location. Just an hour drive from where I live.',
    totalTimeSpent: '3 days',
    visits: [
      {
        id: 'frisco-2023',
        visitDate: 'October 2023',
        duration: '3 days',
        description: 'Fall trip with beach time, fishing, and lighthouse sunsets.',
        photos: [
          '/images/travel/frisco_2023_10/IMG_4269.jpeg',
          '/images/travel/frisco_2023_10/IMG_4283.jpeg',
          '/images/travel/frisco_2023_10/IMG_4298.JPG',
          '/images/travel/frisco_2023_10/IMG_4299.JPG',
          '/images/travel/frisco_2023_10/IMG_4300.JPG',
          '/images/travel/frisco_2023_10/IMG_4310.JPG',
          '/images/travel/frisco_2023_10/IMG_4317.JPG'
        ],
        highlights: [
          'Empty October beaches',
          'Cape Hatteras Lighthouse area',
          'Great surf',
          'Golden-hour dunes'
        ]
      }
    ]
  },

  {
    id: 'the-hague-netherlands',
    name: 'The Hague',
    country: 'Netherlands',
    coordinates: { lat: 52.0705, lng: 4.3007 },
    description:
      'Coastal Dutch city known for its international institutions and historic center.',
    totalTimeSpent: '1 week',
    visits: [
      {
        id: 'the-hague-2024',
        visitDate: 'September 2024',
        duration: '1 week',
        description:
          'City + beach mix: museums, canals, and other touristy activities.',
        photos: [
          '/images/travel/netherlands_hague_2024_9/38767176-67F1-465F-B3C9-981B46BAF15D.JPG',
          '/images/travel/netherlands_hague_2024_9/68D51A31-5539-4581-A15D-FE32CA66BD6A.JPG',
          '/images/travel/netherlands_hague_2024_9/F7E2661E-AC26-4C3A-9BE9-52BF8306540B.JPG',
          '/images/travel/netherlands_hague_2024_9/IMG_5140.jpeg',
          '/images/travel/netherlands_hague_2024_9/IMG_5150.jpeg',
          '/images/travel/netherlands_hague_2024_9/IMG_5166.jpeg',
          '/images/travel/netherlands_hague_2024_9/IMG_5170.jpeg',
          '/images/travel/netherlands_hague_2024_9/IMG_5185.jpeg',
          '/images/travel/netherlands_hague_2024_9/IMG_5199.jpeg',
          '/images/travel/netherlands_hague_2024_9/IMG_5200.jpeg',
          '/images/travel/netherlands_hague_2024_9/IMG_5224.jpeg'
        ],
        highlights: [
          'Watched my brother graduate with his Master\'s degree',
          'Bike-friendly streets',
          'Canal-side evenings'
        ]
      }
    ]
  },

  {
    id: 'snowshoe-west-virginia',
    name: 'Snowshoe',
    country: 'United States',
    coordinates: { lat: 38.412, lng: -79.996 },
    description:
      'Mountain resort in West Virginia known for winter sports and high-elevation views.',
    totalTimeSpent: '2 trips',
    visits: [
      {
        id: 'snowshoe-2024',
        visitDate: 'January 2024',
        duration: 'Weekend',
        description: 'Early season snowboard sessions and village time.',
        photos: [
          '/images/travel/snowshoe_2024_1/IMG_4483.jpeg',
          '/images/travel/snowshoe_2024_1/IMG_4488.jpeg',
          '/images/travel/snowshoe_2024_1/IMG_4490.jpeg',
          '/images/travel/snowshoe_2024_1/IMG_4501.jpeg',
          '/images/travel/snowshoe_2024_1/IMG_4513.jpeg'
        ],
        highlights: ['Bluebird laps', 'Village après', 'Glades & groomers']
      },
      {
        id: 'snowshoe-2025',
        visitDate: 'January 2025',
        duration: 'Weekend',
        description: 'Return trip for mid-winter conditions.',
        photos: [
          '/images/travel/snowshoe_2025_1/IMG_5558.jpeg',
          '/images/travel/snowshoe_2025_1/IMG_5565.jpeg'
        ],
        highlights: ['Fresh corduroy mornings', 'Chill resort vibes']
      }
    ]
  },

  // NEW LOCATIONS FROM PROVIDED IMAGE FOLDERS

  {
    id: 'rotterdam-netherlands',
    name: 'Rotterdam',
    country: 'Netherlands',
    coordinates: { lat: 51.9244, lng: 4.4777 },
    description:
      'Pictures include more than just Rotterdam. Same trip I went to Amsterdam, The Hague, Delft, and Utrecht.',
    totalTimeSpent: '2 weeks',
    visits: [
      {
        id: 'rotterdam-2023',
        visitDate: 'April 2023',
        duration: '2 weeks',
        description:
          'Explored contemporary architecture, markets, and waterfront areas.',
        photos: [
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3647.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3771.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3888.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3896.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3900.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3901.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3908.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3918.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3940.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_3993.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_4007.jpeg',
          '/images/travel/netherlands_rotterdam_2023_4/IMG_4040.jpeg'
        ],
        highlights: [
          'Biking everywhere',
          'Fried fish',
          'Night life',
          'Coffee shops'
        ]
      }
    ]
  },

  {
    id: 'rosarito-mexico',
    name: 'Rosarito',
    country: 'Mexico',
    coordinates: { lat: 32.3600, lng: -117.0560 },
    description:
      'Baja coastal town known for beaches, tacos, and a relaxed surf vibe south of Tijuana.',
    totalTimeSpent: '4 days',
    visits: [
      {
        id: 'rosarito-2019',
        visitDate: 'December 2019',
        duration: '4 days',
        description:
          'Really fun surf trip when I was younger',
        photos: [
          '/images/travel/rosarito_mexico_2019_12/2D9FAFC1-5CEE-47CB-A4D1-6EAA65ECAA15.JPG',
          '/images/travel/rosarito_mexico_2019_12/IMG_0874.JPG',
          '/images/travel/rosarito_mexico_2019_12/IMG_0876.JPG',
          '/images/travel/rosarito_mexico_2019_12/IMG_0877.JPG',
          '/images/travel/rosarito_mexico_2019_12/IMG_0879.JPG'
        ],
        highlights: [
          'Pacific sunsets',
          'SURF'
        ]
      }
    ]
  },

  {
    id: 'big-sky-montana',
    name: 'Big Sky',
    country: 'United States',
    coordinates: { lat: 45.2840, lng: -111.4010 },
    description:
      'Montana mountain town with renowned skiing, big terrain, and alpine scenery.',
    totalTimeSpent: '5 days',
    visits: [
      {
        id: 'big-sky-2021',
        visitDate: 'January 2021',
        duration: '5 days',
        description: 'Amazing winter trip with alpine views and resort laps with friends. Not many photos but had a blast.',
        photos: ['/images/travel/montana_bigsky_2021_1/IMG_1555.jpeg'],
        highlights: ['Powder', 'Secluded lodging']
      }
    ]
  },

  {
    id: 'vail-colorado',
    name: 'Vail',
    country: 'United States',
    coordinates: { lat: 39.4817, lng: -106.0384 },
    description:
      'Epic ski area with lots to do.',
    totalTimeSpent: '1 week',
    visits: [
      {
        id: 'vail-2021',
        visitDate: 'March 2021',
        duration: '1 week',
        description:
          'Spring mountain trip for laps, views, and time in town. Stayed with friends who decided to be ski-bums that winter.',
        photos: [
          '/images/travel/colorado_2021_3/5DF24B07-F825-4AE4-9709-FC3D862F4896.JPG',
          '/images/travel/colorado_2021_3/IMG_6565.jpeg',
          '/images/travel/colorado_2021_3/IMG_6673.jpeg'
        ],
        highlights: ['Park laps with friends', 'Town strolls', 'Sunny spring conditions']
      }
    ]
  }
];
