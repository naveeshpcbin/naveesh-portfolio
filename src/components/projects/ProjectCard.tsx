import React from 'react';
import { ArrowUpRight, Github, CheckCircle2 } from 'lucide-react';
import { Project } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-border bg-[#141413] hover:border-cream/30 hover:bg-[#181816] transition-all duration-300 cursor-pointer shadow-lg shadow-black/20"
    >
      <div>
        {/* Top bar: Category + Status */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-mono text-[11px] tracking-wider uppercase text-cream-dim">
            {project.category}
          </span>
          <StatusBadge status={project.status} size="sm" />
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-editorial font-light text-cream group-hover:text-cream-muted transition-colors mb-2.5">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-cream-muted font-light leading-relaxed mb-4 line-clamp-3">
          {project.overview}
        </p>

        {/* Verification highlight banner if present */}
        {project.verification && project.verification.passedTests !== undefined && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0E1F18] border border-[#2D4A3E] text-[#6EE7B7] text-[11px] font-mono mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{project.verification.passedTests} / {project.verification.totalTests} Tests Passed</span>
          </div>
        )}
      </div>

      <div>
        {/* Technologies List */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-[#1C1C1A] text-[10px] font-mono text-cream-dim"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-cream-dim">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-cream-dim hover:text-cream transition-colors"
                title="View GitHub Repository"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <Github className="w-4 h-4" />
              </a>
            ) : null}
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cream-muted group-hover:text-cream transition-colors">
            <span>EXPLORE</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
};
