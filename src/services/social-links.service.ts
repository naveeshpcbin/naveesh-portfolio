import { SocialLink } from '@/types/profile';
import { socialLinksRepository } from '@/repositories/social-links.repository';

export const socialLinksService = {
  async getAllLinks(): Promise<SocialLink[]> {
    return socialLinksRepository.getAll();
  },

  async getConfiguredLinks(): Promise<SocialLink[]> {
    return socialLinksRepository.getConfigured();
  },

  async updateLink(id: string, updates: Partial<SocialLink>): Promise<SocialLink> {
    return socialLinksRepository.update(id, updates);
  },

  async resetLinks(): Promise<SocialLink[]> {
    return socialLinksRepository.resetToDefault();
  }
};
