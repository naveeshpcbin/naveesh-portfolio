import React, { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Project } from '@/types/project';
import { projectsService } from '@/services/projects.service';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsService.getPublishedProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const categories = ['ALL', 'Hardware & Simulation', 'AI & Search', 'Agricultural AI', 'GovTech & Identity', 'Web Systems', 'Systems & Open Source'];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-background-subtle/50 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number="02"
          title="Selected Engineering Projects"
          subtitle="Hardware simulation, digital twins, AI search engines, and data integrity systems built with practical engineering rigor."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-cream text-background font-medium shadow-md shadow-white/5'
                  : 'bg-[#181816] text-cream-dim hover:text-cream border border-border hover:border-cream/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-cream-dim">
            Loading engineering showcase...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-border bg-[#141413] p-8">
            <p className="font-mono text-xs text-cream-dim uppercase tracking-wider mb-2">
              NO PROJECTS IN THIS CATEGORY
            </p>
            <p className="text-xs text-cream-muted">
              Select another category filter or view all projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Architectural Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
