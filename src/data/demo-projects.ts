import { Project } from '@/types/project';

export const demoProjects: Project[] = [
  {
    id: 'proj-prw-wild',
    slug: 'prw-wild',
    title: 'PRW-Wild — Wildlife Monitoring & Digital Twin',
    tagline: 'Hardware-linked early warning simulation with elephant digital twin & 3D sensor telemetry.',
    category: 'Hardware & Simulation',
    status: 'PROTOTYPE',
    overview: 'A wildlife-monitoring and early-warning system concept integrating hardware-related embedded workflows, telemetry simulation, and an immersive 3D digital-twin environment to mitigate human-wildlife conflict.',
    problem: 'Early detection of wildlife corridors near railway tracks and residential boundaries requires synchronized sensor telemetry and spatial simulation without risking physical infrastructure during initial prototyping.',
    technicalApproach: 'Built around an ESP32-S3 hardware telemetry architecture paired with an interactive 3D WebGL / Blender simulation scene. Telemetry pipelines model acoustic and seismic sensors, tracking elephant movements in a virtual forest corridor with real-time alert thresholds.',
    technologies: [
      'ESP32-S3',
      'Python',
      'FastAPI',
      'Three.js',
      'Blender',
      'Pytest',
      'Digital Twin Telemetry'
    ],
    keyFeatures: [
      'Interactive 3D wildlife corridor digital-twin scene with elephant mesh & terrain',
      'ESP32-S3 sensor telemetry simulation with configurable alert thresholds',
      'Early warning trigger pipeline dispatching spatial coordinate alerts',
      'Comprehensive automated verification suite: 54 / 54 tests passed'
    ],
    plannedFeatures: [
      'Edge deployment on physical ESP32-S3 camera modules',
      'LoRa mesh network field gateway integration'
    ],
    verification: {
      type: 'Automated Project Verification Suite',
      reportSummary: 'Reported verification result: 54 out of 54 tests passed across backend telemetry, alert state machine, and simulation endpoints.',
      passedTests: 54,
      totalTests: 54,
      date: '2026-10-15',
      details: [
        '54 / 54 unit & integration tests passing',
        'Backend FastAPI telemetry stream verified',
        'Spatial simulation coordinates verified'
      ]
    },
    imageUrl: '/images/naveesh-cyber.jpg',
    githubUrl: '', // Local repository on disk: D:\PRW-Wild-Codex-Immersive
    demoUrl: '',
    documentationUrl: '',
    featuredOrder: 1,
    isPublished: true,
    createdAt: '2026-10-15T19:37:00Z',
    updatedAt: '2026-10-16T01:31:00Z'
  },
  {
    id: 'proj-openperplex',
    slug: 'openperplex-ai',
    title: 'OpenPerplex AI — Search Engine & Schema Architecture',
    tagline: 'Database schemas, retrieval pipelines, and local LLM synthesis models for AI search.',
    category: 'AI & Search',
    status: 'IN PROGRESS',
    overview: 'An AI-powered search and retrieval engine project exploring open-source model inference, citation-backed web scraping, and modular backend orchestration.',
    problem: 'Commercial AI search engines lock users into proprietary cloud APIs with high token costs, opaque ranking algorithms, and zero privacy guarantees for research queries.',
    technicalApproach: 'Exploring local LLM inference via Ollama orchestrated through FastAPI and LangGraph, paired with SearxNG for privacy-respecting multi-engine retrieval and Supabase pgvector for contextual document embeddings.',
    technologies: [
      'Python',
      'PostgreSQL',
      'pgvector',
      'FastAPI',
      'LangGraph',
      'SearxNG',
      'Ollama',
      'TypeScript'
    ],
    keyFeatures: [
      'Open-source database schema architecture for AI query caching and document vector embeddings',
      'Multi-engine search retrieval dispatching queries to SearxNG instances',
      'Contextual reranking and citation-aware prompt generation',
      'Local model fallback execution via Ollama and LiteLLM wrappers'
    ],
    plannedFeatures: [
      'Full pgvector indexing integration for long-term document memory',
      'Distributed multi-agent query decomposition via LangGraph'
    ],
    verification: {
      type: 'Verified GitHub Repository',
      reportSummary: 'Public database schemas and retrieval models actively maintained on GitHub under openperplex-db.',
      details: [
        'Verified repository: naveeshpcbin/openperplex-db',
        'Database schemas and migration scripts verified'
      ]
    },
    imageUrl: '/images/naveesh-work.jpg',
    githubUrl: 'https://github.com/naveeshpcbin/openperplex-db',
    demoUrl: '',
    documentationUrl: '',
    featuredOrder: 2,
    isPublished: true,
    createdAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-09-12T14:20:00Z'
  },
  {
    id: 'proj-tceturf',
    slug: 'tceturf-sports-platform',
    title: 'TCETURF — Sports Turf Management & Booking Platform',
    tagline: 'Real-time booking and facility scheduling platform engineered for TCE sports turf.',
    category: 'Web Systems',
    status: 'PROTOTYPE',
    overview: 'A specialized turf booking and facility management platform built for Thiagarajar College of Engineering (TCE) sports turf, managing slot reservations, user authentication, and admin schedules.',
    problem: 'College sports facilities struggle with paper-based registers, double-booking conflicts, and lack of real-time slot visibility for students and faculty.',
    technicalApproach: 'Built with TypeScript and responsive web UI components, featuring schedule slot allocation algorithms, conflict prevention checks, and student authentication.',
    technologies: [
      'TypeScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'REST APIs'
    ],
    keyFeatures: [
      'Real-time interactive slot reservation matrix with conflict prevention',
      'Student profile and department authentication verification',
      'Mobile-responsive booking workflow optimized for on-campus access'
    ],
    plannedFeatures: [
      'Automated SMS / WhatsApp notification gateway integration',
      'Tournament bracket manager and night floodlight scheduling'
    ],
    verification: {
      type: 'Verified GitHub Repository',
      reportSummary: 'Public repository published and maintained on GitHub under TCETURF.',
      details: [
        'Verified repository: naveeshpcbin/TCETURF',
        'Active frontend booking prototype'
      ]
    },
    imageUrl: '/images/naveesh-formal.jpg',
    githubUrl: 'https://github.com/naveeshpcbin/TCETURF',
    demoUrl: '',
    documentationUrl: '',
    featuredOrder: 3,
    isPublished: true,
    createdAt: '2026-07-10T12:00:00Z',
    updatedAt: '2026-08-01T15:00:00Z'
  },
  {
    id: 'proj-satquery',
    slug: 'satquery-spatial-engine',
    title: 'SatQuery — Spatial & Satellite Data Query Engine',
    tagline: 'Python-based spatial coordinate transformation and remote-sensing satellite query engine.',
    category: 'Hardware & Simulation',
    status: 'PROTOTYPE',
    overview: 'A Python spatial utility and query engine for indexing geographic coordinates, querying satellite pass data, and filtering remote-sensing orbital tracks.',
    problem: 'Querying satellite flyover times and regional coverage matrices often involves convoluted GIS software rather than direct programmatic developer interfaces.',
    technicalApproach: 'Lightweight Python algorithms processing coordinate transformations, bounding box spatial intersections, and orbital track queries.',
    technologies: [
      'Python',
      'Geospatial Coordinates',
      'Remote Sensing',
      'JSON Data Pipelines'
    ],
    keyFeatures: [
      'Coordinate boundary intersection calculator',
      'Satellite trajectory metadata parsing and temporal window querying'
    ],
    plannedFeatures: [
      'OpenStreetMap tile integration and live satellite pass visualization'
    ],
    verification: {
      type: 'Verified GitHub Repository',
      reportSummary: 'Public Python repository maintained on GitHub under SatQuery.',
      details: [
        'Verified repository: naveeshpcbin/SatQuery',
        'Python spatial query scripts verified'
      ]
    },
    imageUrl: '/images/naveesh-cyber.jpg',
    githubUrl: 'https://github.com/naveeshpcbin/SatQuery',
    demoUrl: '',
    documentationUrl: '',
    featuredOrder: 4,
    isPublished: true,
    createdAt: '2026-06-15T08:00:00Z',
    updatedAt: '2026-07-20T11:00:00Z'
  },
  {
    id: 'proj-apaar-id',
    slug: 'apaar-id-student-platform',
    title: 'APAAR ID Student Data Management & Verification',
    tagline: 'Verification platform addressing duplicate records, intake caps, and student identifier integrity.',
    category: 'GovTech & Identity',
    status: 'PROTOTYPE',
    overview: 'A proposed student-data management and verification platform engineered around the APAAR (Automated Permanent Academic Account Registry) ID initiative to ensure data integrity across higher education institutions.',
    problem: 'Academic institutions face critical issues with duplicate student profiles, unvalidated identifiers, and enrollment numbers exceeding sanctioned intake approvals.',
    technicalApproach: 'Full-stack platform implementing identity verification rules, intake capacity validation algorithms, and cryptographic verification of academic identifiers.',
    technologies: [
      'TypeScript',
      'Node.js',
      'React',
      'PostgreSQL',
      'REST APIs',
      'Validation Middleware'
    ],
    keyFeatures: [
      'Intake cap auditing against institutional approved quota limits',
      'Duplicate record detection across national academic identifiers',
      'Secure administrative portal for student registrar verification'
    ],
    plannedFeatures: [
      'Government DigiLocker / APAAR public API verification connector'
    ],
    verification: {
      type: 'Verified GitHub Repository',
      reportSummary: 'Repository actively maintained on GitHub with schema validation and test fixtures.',
      details: [
        'Verified GitHub repository: naveeshpcbin/APAAR-ID-BASED-SYSTEM'
      ]
    },
    imageUrl: '/images/naveesh-work.jpg',
    githubUrl: 'https://github.com/naveeshpcbin/APAAR-ID-BASED-SYSTEM',
    demoUrl: '',
    documentationUrl: '',
    featuredOrder: 5,
    isPublished: true,
    createdAt: '2026-10-23T19:42:00Z',
    updatedAt: '2026-10-23T19:42:00Z'
  },
  {
    id: 'proj-mood-travel',
    slug: 'mood-based-travel',
    title: 'Mood-Based Travel Recommendation Engine',
    tagline: 'Contextual travel exploration system matching emotional state with dynamic destinations.',
    category: 'Web Systems',
    status: 'PROTOTYPE',
    overview: 'A full-stack web application concept exploring personalized destination and itinerary recommendations synthesized from user mood states, behavioral preferences, and localized travel intelligence.',
    problem: 'Conventional travel portals overwhelm users with commercial aggregators rather than matching experiential resonance, travel pace, and emotional mindset.',
    technicalApproach: 'Built using React, TypeScript, and Vite on the client with structured API handlers matching mood profiles (serene, adventurous, reflective, energetic) against contextual destination parameters.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'REST APIs'
    ],
    keyFeatures: [
      'Interactive mood-selector interface with real-time feedback',
      'Dynamic travel card generation with itinerary previews and mood tags',
      'Responsive mobile-first experience'
    ],
    plannedFeatures: [
      'AI-powered natural language itinerary synthesizer'
    ],
    verification: {
      type: 'Verified GitHub Repository',
      reportSummary: 'Repository actively maintained on GitHub with frontend prototype and mock destination engines.',
      details: [
        'Verified GitHub repository: naveeshpcbin/moodtravel'
      ]
    },
    imageUrl: '/images/naveesh-formal.jpg',
    githubUrl: 'https://github.com/naveeshpcbin/moodtravel',
    demoUrl: '',
    documentationUrl: '',
    featuredOrder: 6,
    isPublished: true,
    createdAt: '2026-02-23T22:02:00Z',
    updatedAt: '2026-04-30T22:12:00Z'
  },
  {
    id: 'proj-bovine-mastitis',
    slug: 'bovine-mastitis-prediction',
    title: 'Bovine Mastitis Prediction — Dairy Health Forecaster',
    tagline: 'AI predictive monitoring concept for early detection of bovine mastitis in Indian dairy farms.',
    category: 'Agricultural AI',
    status: 'EXPLORATION',
    overview: 'An AI-based predictive-monitoring concept designed around an SIH 2026 problem statement addressing the early forecasting and subclinical detection of bovine mastitis in Indian dairy farming.',
    problem: 'Subclinical mastitis causes severe economic losses and animal suffering before clinical symptoms become visible, requiring accessible, non-invasive early indicators for rural dairy operations.',
    technicalApproach: 'Investigating thermal, electrical conductivity, and physiological time-series data inputs combined with lightweight machine-learning classification models capable of running on low-cost edge or mobile hardware.',
    technologies: [
      'Machine Learning',
      'Python',
      'Time-Series Analysis',
      'IoT Sensor Architecture',
      'Mobile Edge Inference'
    ],
    keyFeatures: [
      'Literature-backed feature extraction from milk conductivity & temperature trends',
      'Predictive risk score modeling for preventative herd health interventions'
    ],
    plannedFeatures: [
      'Empirical dataset validation against dairy field records',
      'Offline-first mobile application interface for livestock handlers'
    ],
    verification: {
      type: 'Concept & Problem Formulation',
      reportSummary: 'Problem space analyzed, sensor interface requirements defined, and initial exploratory pipeline established.',
      details: [
        'SIH 2026 problem guidelines evaluated',
        'Data ingestion schema mapped'
      ]
    },
    imageUrl: '/images/naveesh-portrait.jpg',
    githubUrl: '',
    demoUrl: '',
    documentationUrl: '',
    featuredOrder: 7,
    isPublished: true,
    createdAt: '2026-09-05T09:00:00Z',
    updatedAt: '2026-10-01T16:00:00Z'
  },
  {
    id: 'proj-zitter',
    slug: 'zitter',
    title: 'Zitter',
    tagline: 'Systems & software repository entry.',
    category: 'Systems & Open Source',
    status: 'EXPLORATION',
    overview: 'An open-source software project entry recorded in development workspaces. Awaiting external repository link configuration.',
    problem: 'Repository configuration pending profile update.',
    technicalApproach: 'Repository entry registered; specific architectural details will be synchronized once repository metadata is linked.',
    technologies: [
      'Systems',
      'Open Source'
    ],
    keyFeatures: [
      'Repository entry cataloged in personal index'
    ],
    plannedFeatures: [
      'Public repository link synchronization'
    ],
    imageUrl: '/images/naveesh-portrait.jpg',
    githubUrl: '', // Unconfigured per strict instructions: do not invent URL
    demoUrl: '',
    documentationUrl: '',
    featuredOrder: 8,
    isPublished: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  }
];
