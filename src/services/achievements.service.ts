import { Achievement, AchievementCategory } from '@/types/achievement';
import { achievementsRepository } from '@/repositories/achievements.repository';

export const achievementsService = {
  async getPublishedAchievements(category?: AchievementCategory): Promise<Achievement[]> {
    const list = await achievementsRepository.getPublished();
    if (!category) return list;
    return list.filter((a) => a.category === category);
  },

  async getAllAchievements(): Promise<Achievement[]> {
    return achievementsRepository.getAll();
  },

  async getAchievementById(id: string): Promise<Achievement | null> {
    return achievementsRepository.getById(id);
  },

  async createAchievement(data: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Achievement> {
    return achievementsRepository.create(data);
  },

  async updateAchievement(id: string, updates: Partial<Achievement>): Promise<Achievement> {
    return achievementsRepository.update(id, updates);
  },

  async deleteAchievement(id: string): Promise<boolean> {
    return achievementsRepository.delete(id);
  },

  async resetAchievements(): Promise<Achievement[]> {
    return achievementsRepository.resetToDefault();
  }
};
