export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  institution: string;
  degree: string;
  location: string;
  shortBio: string;
  fullBio: string[];
  interests: string[];
  heroMarqueeText: string;
  portraitModelUrl: string;
  portraitImageUrl: string;
  email: string;
}

export interface SocialLink {
  id: string;
  platform: 'github' | 'linkedin' | 'youtube' | 'instagram' | 'email' | 'whatsapp' | 'twitter' | 'other';
  label: string;
  url: string;
  isConfigured: boolean;
  featuredInHeader: boolean;
  featuredInFooter: boolean;
  iconName: string;
}

export interface ContentItem {
  id: string;
  title: string;
  channelName: string;
  channelUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  description: string;
  publishedDate?: string;
  topics: string[];
  isPublished: boolean;
}
