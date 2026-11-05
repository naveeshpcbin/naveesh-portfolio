import { SocialLink } from '@/types/profile';

export const siteConfig = {
  name: 'Naveesh',
  title: 'Naveesh — Electronics, AI & Engineering Projects',
  role: 'ECE Undergraduate & Systems Developer',
  institution: 'Thiagarajar College of Engineering',
  location: 'Madurai, Tamil Nadu',
  tagline: 'Building at the intersection of Electronics, AI, and Software.',
  heroMarqueeText: 'NAVEESH — ELECTRONICS / AI / SYSTEMS',
  
  // Primary contact
  email: 'naveeshpcp.in@gmail.com',

  // Genuine social and repository links
  // Unconfigured links have isConfigured: false and url: '' per strict specification
  socialLinks: [
    {
      id: 'github',
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/naveeshpcbin',
      isConfigured: true,
      featuredInHeader: true,
      featuredInFooter: true,
      iconName: 'Github',
    },
    {
      id: 'email',
      platform: 'email',
      label: 'Email',
      url: 'mailto:naveeshpcp.in@gmail.com',
      isConfigured: true,
      featuredInHeader: true,
      featuredInFooter: true,
      iconName: 'Mail',
    },
    {
      id: 'linkedin',
      platform: 'linkedin',
      label: 'LinkedIn',
      url: '', // Unconfigured until supplied by Naveesh
      isConfigured: false,
      featuredInHeader: false,
      featuredInFooter: false,
      iconName: 'Linkedin',
    },
    {
      id: 'youtube',
      platform: 'youtube',
      label: 'SemiconNavee (YouTube)',
      url: '', // Unconfigured until supplied by Naveesh
      isConfigured: false,
      featuredInHeader: false,
      featuredInFooter: false,
      iconName: 'Youtube',
    },
    {
      id: 'instagram',
      platform: 'instagram',
      label: 'Instagram',
      url: '', // Unconfigured until supplied by Naveesh
      isConfigured: false,
      featuredInHeader: false,
      featuredInFooter: false,
      iconName: 'Instagram',
    },
    {
      id: 'whatsapp',
      platform: 'whatsapp',
      label: 'WhatsApp',
      url: '', // Unconfigured until supplied by Naveesh
      isConfigured: false,
      featuredInHeader: false,
      featuredInFooter: false,
      iconName: 'MessageSquare',
    },
  ] as SocialLink[],

  // Assets
  assets: {
    portraitModel: '/models/naveesh.glb',
    primaryPhoto: '/images/naveesh-portrait.jpg',
    rawPhoto: '/images/IMG_20260209_135437.jpg',
    cyberPhoto: '/images/naveesh-cyber.jpg',
    workPhoto: '/images/naveesh-work.jpg',
    formalPhoto: '/images/naveesh-formal.jpg',
  },

  // Navigation
  navigation: [
    { label: 'Story', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Explore', href: '#interests' },
    { label: 'Content', href: '#content' },
    { label: 'Contact', href: '#contact' },
  ],
};
