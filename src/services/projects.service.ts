import { Project } from '@/types/project';
import { projectsRepository } from '@/repositories/projects.repository';

export const projectsService = {
  async getPublishedProjects(): Promise<Project[]> {
    return projectsRepository.getPublished();
  },

  async getAllProjects(): Promise<Project[]> {
    return projectsRepository.getAll();
  },

  async getProjectById(id: string): Promise<Project | null> {
    return projectsRepository.getById(id);
  },

  async createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return projectsRepository.create(data);
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    return projectsRepository.update(id, updates);
  },

  async deleteProject(id: string): Promise<boolean> {
    return projectsRepository.delete(id);
  },

  async resetProjects(): Promise<Project[]> {
    return projectsRepository.resetToDefault();
  }
};
