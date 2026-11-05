import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Layers, Cpu } from 'lucide-react';
import { Project } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Project details for ${project.title}`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#121211] border border-border rounded-2xl shadow-2xl overflow-y-auto flex flex-col z-10">
        {/* Header Bar */}
        <div className="sticky top-0 bg-[#121211]/95 backdrop-blur-md p-6 border-b border-border flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="font-mono text-xs text-cream-dim uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-cream-muted hover:text-cream rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-cream"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Tagline */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-light text-cream mb-2">
              {project.title}
            </h3>
            <p className="text-cream-muted text-sm sm:text-base font-light">
              {project.tagline}
            </p>
          </div>

          {/* Links Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B1B19] border border-border hover:border-cream/40 text-xs font-mono text-cream transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-cream-dim" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#161615] border border-border/60 text-xs font-mono text-cream-dim">
                <Github className="w-3.5 h-3.5 text-cream-dim" />
                <span>Repository: Internal / Unconfigured</span>
              </div>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream text-background hover:bg-cream-muted text-xs font-mono font-medium transition-all"
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>

          {/* Verification Results Callout */}
          {project.verification && (
            <div className="p-5 rounded-xl border border-[#2D4A3E] bg-[#0E1F18]/80 text-[#D1FAE5] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#6EE7B7] font-semibold tracking-wider uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>{project.verification.type}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A7F3D0] leading-relaxed">
                {project.verification.reportSummary}
              </p>
              {project.verification.passedTests !== undefined && (
                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#6EE7B7]">
                  <span className="bg-[#123126] px-2.5 py-1 rounded border border-[#235843]">
                    {project.verification.passedTests} / {project.verification.totalTests} TESTS PASSED
                  </span>
                  {project.verification.date && (
                    <span className="text-[#A7F3D0]/80">Recorded: {project.verification.date}</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Problem & Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-border bg-[#161615] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-gold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Problem Addressed</span>
              </div>
              <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-[#161615] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#93C5FD] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Technical Approach</span>
              </div>
              <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
                {project.technicalApproach}
              </p>
            </div>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cream-dim">
                IMPLEMENTED CAPABILITIES
              </h4>
              <ul className="space-y-2">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-cream-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-cream-dim mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Planned Features (Honest Boundary) */}
          {project.plannedFeatures && project.plannedFeatures.length > 0 && (
            <div className="space-y-3 p-4 rounded-xl border border-border/80 bg-[#161615]/60">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cream-dim flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-cream-dim" />
                <span>PLANNED / NEXT MILESTONES (PHASE 2)</span>
              </h4>
              <ul className="space-y-1.5">
                {project.plannedFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-cream-dim font-mono">
                    <span className="text-cream-dim/60">&gt;</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cream-dim">
              TECHNOLOGIES
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md border border-border bg-[#1A1A18] text-xs font-mono text-cream-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
