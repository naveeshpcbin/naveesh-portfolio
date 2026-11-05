import { Profile, ContentItem } from '@/types/profile';
import { demoProfile, demoContentItems } from '@/data/demo-profile';

const PROFILE_KEY = 'naveesh_portfolio_profile_v2';
const CONTENT_KEY = 'naveesh_portfolio_content_v2';

export interface IProfileRepository {
  getProfile(): Promise<Profile>;
  updateProfile(updates: Partial<Profile>): Promise<Profile>;
  getContentItems(): Promise<ContentItem[]>;
  updateContentItem(id: string, updates: Partial<ContentItem>): Promise<ContentItem>;
  createContentItem(item: Omit<ContentItem, 'id'>): Promise<ContentItem>;
  deleteContentItem(id: string): Promise<boolean>;
  resetToDefault(): Promise<Profile>;
}

class LocalStorageProfileRepository implements IProfileRepository {
  private getStoredProfile(): Profile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (!data) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(demoProfile));
        return demoProfile;
      }
      const parsed = JSON.parse(data);
      // Migrate old portrait if needed
      if (parsed.portraitImageUrl === '/images/naveesh-portrait.jpg' || !parsed.portraitImageUrl) {
        parsed.portraitImageUrl = '/images/naveesh-hero.jpg';
        this.setStoredProfile(parsed);
      }
      return parsed;
    } catch {
      return demoProfile;
    }
  }

  private setStoredProfile(profile: Profile): void {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }

  private getStoredContent(): ContentItem[] {
    try {
      const data = localStorage.getItem(CONTENT_KEY);
      if (!data) {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(demoContentItems));
        return demoContentItems;
      }
      return JSON.parse(data);
    } catch {
      return demoContentItems;
    }
  }

  private setStoredContent(items: ContentItem[]): void {
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save content items to localStorage', e);
    }
  }

  async getProfile(): Promise<Profile> {
    return this.getStoredProfile();
  }

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    const current = this.getStoredProfile();
    const updated = { ...current, ...updates };
    this.setStoredProfile(updated);
    return updated;
  }

  async getContentItems(): Promise<ContentItem[]> {
    return this.getStoredContent();
  }

  async updateContentItem(id: string, updates: Partial<ContentItem>): Promise<ContentItem> {
    const items = this.getStoredContent();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Content item not found');
    items[idx] = { ...items[idx], ...updates };
    this.setStoredContent(items);
    return items[idx];
  }

  async createContentItem(item: Omit<ContentItem, 'id'>): Promise<ContentItem> {
    const items = this.getStoredContent();
    const newItem: ContentItem = {
      ...item,
      id: `content-${Date.now()}`,
    };
    items.push(newItem);
    this.setStoredContent(items);
    return newItem;
  }

  async deleteContentItem(id: string): Promise<boolean> {
    const items = this.getStoredContent();
    const filtered = items.filter((i) => i.id !== id);
    this.setStoredContent(filtered);
    return true;
  }

  async resetToDefault(): Promise<Profile> {
    this.setStoredProfile(demoProfile);
    this.setStoredContent(demoContentItems);
    return demoProfile;
  }
}

export const profileRepository: IProfileRepository = new LocalStorageProfileRepository();
