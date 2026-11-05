export type ProjectStatus = 'COMPLETED' | 'IN PROGRESS' | 'PROTOTYPE' | 'EXPLORATION';

export interface ProjectVerification {
  type: string;
  reportSummary: string;
  passedTests?: number;
  totalTests?: number;
  date?: string;
  details?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Hardware & Simulation' | 'AI & Search' | 'Agricultural AI' | 'GovTech & Identity' | 'Web Systems' | 'Systems & Open Source';
  status: ProjectStatus;
  overview: string;
  problem: string;
  technicalApproach: string;
  technologies: string[];
  keyFeatures: string[];
  plannedFeatures?: string[];
  verification?: ProjectVerification;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  featuredOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
