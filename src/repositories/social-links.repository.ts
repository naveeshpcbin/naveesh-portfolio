import { SocialLink } from '@/types/profile';
import { siteConfig } from '@/config/site';

const SOCIAL_KEY = 'naveesh_portfolio_social_links_v1';

export interface ISocialLinksRepository {
  getAll(): Promise<SocialLink[]>;
  getConfigured(): Promise<SocialLink[]>;
  update(id: string, updates: Partial<SocialLink>): Promise<SocialLink>;
  resetToDefault(): Promise<SocialLink[]>;
}

class LocalStorageSocialLinksRepository implements ISocialLinksRepository {
  private getStored(): SocialLink[] {
    try {
      const data = localStorage.getItem(SOCIAL_KEY);
      if (!data) {
        localStorage.setItem(SOCIAL_KEY, JSON.stringify(siteConfig.socialLinks));
        return siteConfig.socialLinks;
      }
      return JSON.parse(data);
    } catch {
      return siteConfig.socialLinks;
    }
  }

  private setStored(links: SocialLink[]): void {
    try {
      localStorage.setItem(SOCIAL_KEY, JSON.stringify(links));
    } catch (e) {
      console.warn('Failed to save social links to localStorage', e);
    }
  }

  async getAll(): Promise<SocialLink[]> {
    return this.getStored();
  }

  async getConfigured(): Promise<SocialLink[]> {
    const all = await this.getAll();
    return all.filter((l) => l.isConfigured && l.url && l.url.trim().length > 0);
  }

  async update(id: string, updates: Partial<SocialLink>): Promise<SocialLink> {
    const all = await this.getAll();
    const idx = all.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error('Social link not found');
    const updated = { ...all[idx], ...updates };
    // Automatically set isConfigured if a non-empty URL is provided
    if (updates.url !== undefined) {
      updated.isConfigured = updates.url.trim().length > 0;
    }
    all[idx] = updated;
    this.setStored(all);
    return updated;
  }

  async resetToDefault(): Promise<SocialLink[]> {
    this.setStored(siteConfig.socialLinks);
    return siteConfig.socialLinks;
  }
}

export const socialLinksRepository: ISocialLinksRepository = new LocalStorageSocialLinksRepository();
