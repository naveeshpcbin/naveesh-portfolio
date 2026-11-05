import { Achievement } from '@/types/achievement';
import { demoAchievements } from '@/data/demo-achievements';

const STORAGE_KEY = 'naveesh_portfolio_achievements_v1';

export interface IAchievementsRepository {
  getAll(): Promise<Achievement[]>;
  getPublished(): Promise<Achievement[]>;
  getById(id: string): Promise<Achievement | null>;
  create(achievement: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Achievement>;
  update(id: string, updates: Partial<Achievement>): Promise<Achievement>;
  delete(id: string): Promise<boolean>;
  resetToDefault(): Promise<Achievement[]>;
}

class LocalStorageAchievementsRepository implements IAchievementsRepository {
  private getStored(): Achievement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoAchievements));
        return demoAchievements;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('LocalStorage unavailable, using in-memory demo achievements', e);
      return demoAchievements;
    }
  }

  private setStored(achievements: Achievement[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
    } catch (e) {
      console.warn('Failed to save achievements to localStorage', e);
    }
  }

  async getAll(): Promise<Achievement[]> {
    return this.getStored();
  }

  async getPublished(): Promise<Achievement[]> {
    const all = await this.getAll();
    return all.filter((a) => a.publicationStatus === 'Published');
  }

  async getById(id: string): Promise<Achievement | null> {
    const all = await this.getAll();
    return all.find((a) => a.id === id) || null;
  }

  async create(achievementData: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Achievement> {
    const all = await this.getAll();
    const now = new Date().toISOString();
    const newAchievement: Achievement = {
      ...achievementData,
      id: `achieve-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    all.push(newAchievement);
    this.setStored(all);
    return newAchievement;
  }

  async update(id: string, updates: Partial<Achievement>): Promise<Achievement> {
    const all = await this.getAll();
    const index = all.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Achievement with ID ${id} not found`);
    }
    const updated: Achievement = {
      ...all[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    all[index] = updated;
    this.setStored(all);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((a) => a.id !== id);
    this.setStored(filtered);
    return true;
  }

  async resetToDefault(): Promise<Achievement[]> {
    this.setStored(demoAchievements);
    return demoAchievements;
  }
}

// Swappable singleton instance for Phase 2 Supabase migration
export const achievementsRepository: IAchievementsRepository = new LocalStorageAchievementsRepository();
