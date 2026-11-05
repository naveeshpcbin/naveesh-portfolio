import { Profile, ContentItem } from '@/types/profile';

export const demoProfile: Profile = {
  name: 'Naveesh',
  headline: 'Electronics & Communication Engineering Student',
  tagline: 'Building at the intersection of Electronics, AI, and Software.',
  institution: 'Thiagarajar College of Engineering',
  degree: 'B.E. in Electronics & Communication Engineering',
  location: 'Madurai, Tamil Nadu, India',
  shortBio: "I'm an Electronics and Communication Engineering student at Thiagarajar College of Engineering, Madurai, interested in how electronics, computation, and intelligent software systems come together to solve practical problems.",
  fullBio: [
    "I'm an Electronics and Communication Engineering student at Thiagarajar College of Engineering, Madurai, interested in how electronics, computation, and intelligent software systems come together to solve practical problems.",
    "My learning extends beyond coursework into engineering projects, software applications, embedded systems, and simulation.",
    "I use these projects to explore technical concepts, test ideas, document implementation decisions, and improve my engineering skills.",
    "My long-term interests include semiconductor technology, intelligent systems, and building technology-driven ventures."
  ],
  interests: [
    'Electronics & Circuit Design',
    'Embedded Systems & Firmware',
    'AI & Machine Learning',
    'Full-Stack Software Development',
    'AI-Powered Search & Retrieval Systems',
    'Hardware Simulation & Telemetry',
    'Digital Twins',
    'Semiconductor Technology',
    'Technology Entrepreneurship'
  ],
  heroMarqueeText: 'NAVEESH — ELECTRONICS / AI / SYSTEMS',
  portraitModelUrl: '/models/naveesh.glb',
  portraitImageUrl: '/images/naveesh-hero.jpg',
  email: 'naveeshpcp.in@gmail.com',
};

export const demoContentItems: ContentItem[] = [
  {
    id: 'content-semicon-intro',
    title: 'SemiconNavee — Exploring Semiconductor Physics & Circuit Architecture',
    channelName: 'SemiconNavee',
    channelUrl: '', // Unconfigured until link supplied
    videoUrl: '',
    thumbnailUrl: '/images/naveesh-cyber.jpg',
    description: 'A technical content initiative covering semiconductor physics, digital electronics, hardware simulation, and modern computing architectures.',
    publishedDate: '2026-08-15',
    topics: ['Semiconductors', 'Electronics', 'Digital Systems'],
    isPublished: true,
  },
  {
    id: 'content-dt-wildlife',
    title: 'Building Spatial Digital Twins with Three.js & ESP32-S3',
    channelName: 'SemiconNavee',
    channelUrl: '',
    videoUrl: '',
    thumbnailUrl: '/images/naveesh-work.jpg',
    description: 'Technical walkthrough on coupling virtual 3D corridor scenes with real-time hardware telemetry streams for wildlife mitigation.',
    publishedDate: '2026-10-10',
    topics: ['Digital Twins', 'Three.js', 'ESP32-S3'],
    isPublished: true,
  }
];
