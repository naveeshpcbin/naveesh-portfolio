export type AchievementCategory = 
  | 'Certificates'
  | 'Academic achievements'
  | 'Competition-related documents'
  | 'Project verification reports'
  | 'Technical documentation'
  | 'Other approved accomplishments';

export type PublicationStatus = 'Draft' | 'Published' | 'Private';

export interface Achievement {
  id: string;
  title: string;
  issuingOrganization: string;
  category: AchievementCategory;
  date: string;
  description: string;
  publicationStatus: PublicationStatus;
  verificationUrl?: string;
  documentUrl?: string;
  documentType?: 'pdf' | 'image' | 'report' | 'link';
  documentName?: string;
  documentSize?: string;
  createdAt: string;
  updatedAt: string;
}
