import { Profile, ContentItem } from '@/types/profile';
import { profileRepository } from '@/repositories/profile.repository';

export const profileService = {
  async getProfile(): Promise<Profile> {
    return profileRepository.getProfile();
  },

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    return profileRepository.updateProfile(updates);
  },

  async getContentItems(): Promise<ContentItem[]> {
    return profileRepository.getContentItems();
  },

  async getPublishedContent(): Promise<ContentItem[]> {
    const items = await profileRepository.getContentItems();
    return items.filter((i) => i.isPublished);
  },

  async updateContentItem(id: string, updates: Partial<ContentItem>): Promise<ContentItem> {
    return profileRepository.updateContentItem(id, updates);
  },

  async createContentItem(data: Omit<ContentItem, 'id'>): Promise<ContentItem> {
    return profileRepository.createContentItem(data);
  },

  async deleteContentItem(id: string): Promise<boolean> {
    return profileRepository.deleteContentItem(id);
  },

  async resetProfile(): Promise<Profile> {
    return profileRepository.resetToDefault();
  }
};
