import type { Experience } from '../types';

export const experience: Experience[] = [
  {
    company: 'Coastal Studies Institute',
    position: 'Research Technician',
    location: 'Wanchese, NC',
    startDate: '2025-05',
    endDate: 'Present',
    description:
      'Support analytical research of the Gulf Stream using CODAR high‑frequency radar; build automation for ocean current processing workflows',
    achievements: [
      'Automated SeaSonde/CODAR current‑processing pipelines in Python to streamline ingestion, QC, and product generation',
      'Developed scripts and utilities for computing radial metrics and producing analysis-ready datasets and visuals',
      'Collaborated with scientists to validate outputs and improve reliability of near‑real‑time current products',
    ],
  },
  {
    company: 'Renaissance Computing Institute (RENCI)',
    position: 'Development Operations Intern',
    location: 'Chapel Hill, NC (Hybrid)',
    startDate: '2023-05',
    endDate: '2025-04',
    description:
      'Built tooling and infrastructure to improve software delivery and cloud deployments',
    achievements: [
      'Created a Python package to build Docker images and push them to Google Artifact Registry for a streamlined deployment pipeline',
      'Assisted migration of services to Google Cloud (Artifact Registry, Secret Manager, Compute Engine)',
      'Implemented CI/CD improvements with containerized builds and repeatable release workflows',
    ],
  },
  {
    company: 'Coastal Studies Institute',
    position: 'Research Intern',
    location: 'Wanchese, NC',
    startDate: '2022-05',
    endDate: '2022-08',
    description:
      'Supported programming and data management for the NCROEP marine resource observations program',
    achievements: [
      'Authored MATLAB and Python scripts for data ingestion, cleaning, and QC',
      'Maintained datasets and produced plots/reports to aid daily field and analysis workflows',
      'Documented processing steps to improve reproducibility for the research team',
    ],
  },
  {
    company: 'Kill Devil Hills Ocean Rescue',
    position: 'Lifeguard',
    location: 'Kill Devil Hills, NC',
    startDate: '2020-05',
    endDate: '2021-08',
    description:
      'Ensured public safety on a high‑traffic oceanfront during peak summer seasons',
    achievements: [
      'Monitored ocean conditions and responded to emergencies with rescue and first‑aid',
      'Demonstrated leadership coordinating with team members during high‑volume days',
      'Worked full‑time in 2020 and part‑time in 2021 summer season',
    ],
  },
  {
    company: 'Booty Treats Ice‑cream & Shaved Ice',
    position: 'Cashier, Ice Cream Server',
    location: 'Nags Head, NC',
    startDate: '2018-05',
    endDate: '2021-08',
    description:
      'Served customers in a fast‑paced environment while handling point‑of‑sale and daily operations',
    achievements: [
      'Provided friendly, efficient service during peak tourist seasons',
      'Handled cash/POS transactions and maintained cleanliness and food‑safety standards',
      'Worked part‑time in 2021; did not work during the 2020 summer season',
    ],
  },
];
