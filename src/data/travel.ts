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
          'Amazing beach vacation exploring the beautiful coastline and local culture.',
        photos: [
          '/images/travel/aguadilla_2021_12/aguadilla_2021_12_i1.jpeg',
          '/images/travel/aguadilla_2021_12/aguadilla_2021_12_n2.jpeg',
          '/images/travel/aguadilla_2021_12/aguadilla_2021_12_n3.jpeg'
        ],
        highlights: [
          'Relaxed on pristine beaches',
          'Explored local Puerto Rican culture',
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
      'Famous surfing destination on the western coast of Puerto Rico, known as the "Town of Beautiful Sunsets".',
    totalTimeSpent: '4 days',
    visits: [
      {
        id: 'rincon-2021',
        visitDate: 'April 2021',
        duration: '4 days',
        description:
          "Surf trip to one of Puerto Rico's most famous beach destinations.",
        photos: [
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
          'Recent beach getaway enjoying the Florida sunshine and coastal atmosphere.',
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
          'Walked along beautiful sandy beaches',
          'Enjoyed perfect spring weather',
          'Explored the local coastal community',
          'Relaxed by the Atlantic Ocean'
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
      'Quiet village on Hatteras Island in North Carolina’s Outer Banks, known for uncrowded beaches and great surf.',
    totalTimeSpent: '5 days',
    visits: [
      {
        id: 'frisco-2023',
        visitDate: 'October 2023',
        duration: '5 days',
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
          'Surf/fish-friendly shores',
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
      'Coastal Dutch city known for its international institutions, seaside at Scheveningen, and historic center.',
    totalTimeSpent: '1 week',
    visits: [
      {
        id: 'the-hague-2024',
        visitDate: 'September 2024',
        duration: '1 week',
        description:
          'City + beach mix: museums, canals, and Scheveningen promenade.',
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
          'Scheveningen beach walk',
          'Binnenhof & city center',
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
  }
];
