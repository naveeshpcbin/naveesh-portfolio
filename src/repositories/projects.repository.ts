import { Project } from '@/types/project';
import { demoProjects } from '@/data/demo-projects';

const STORAGE_KEY = 'naveesh_portfolio_projects_v1';

export interface IProjectsRepository {
  getAll(): Promise<Project[]>;
  getPublished(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
  create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  update(id: string, updates: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<boolean>;
  resetToDefault(): Promise<Project[]>;
}

class LocalStorageProjectsRepository implements IProjectsRepository {
  private getStored(): Project[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoProjects));
        return demoProjects;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('LocalStorage unavailable, using in-memory demo projects', e);
      return demoProjects;
    }
  }

  private setStored(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }

  async getAll(): Promise<Project[]> {
    const list = this.getStored();
    return list.sort((a, b) => a.featuredOrder - b.featuredOrder);
  }

  async getPublished(): Promise<Project[]> {
    const all = await this.getAll();
    return all.filter((p) => p.isPublished);
  }

  async getById(id: string): Promise<Project | null> {
    const all = await this.getAll();
    return all.find((p) => p.id === id || p.slug === id) || null;
  }

  async create(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const all = await this.getAll();
    const now = new Date().toISOString();
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      slug: projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: now,
      updatedAt: now,
      featuredOrder: all.length + 1,
    };
    all.push(newProject);
    this.setStored(all);
    return newProject;
  }

  async update(id: string, updates: Partial<Project>): Promise<Project> {
    const all = await this.getAll();
    const index = all.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }
    const updated: Project = {
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
    const filtered = all.filter((p) => p.id !== id);
    this.setStored(filtered);
    return true;
  }

  async resetToDefault(): Promise<Project[]> {
    this.setStored(demoProjects);
    return demoProjects;
  }
}

// Export singleton instance. In Phase 2, this can be swapped with SupabaseProjectsRepository
export const projectsRepository: IProjectsRepository = new LocalStorageProjectsRepository();
