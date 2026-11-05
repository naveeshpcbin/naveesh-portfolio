import React, { useState } from 'react';
import { Project, ProjectStatus } from '@/types/project';
import { projectsService } from '@/services/projects.service';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Plus, Edit3, Trash2, ArrowUp, ArrowDown, Check, X, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface AdminProjectsProps {
  projects: Project[];
  onRefresh: () => void;
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({ projects, onRefresh }) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: 'Hardware & Simulation' as Project['category'],
    status: 'PROTOTYPE' as ProjectStatus,
    overview: '',
    problem: '',
    technicalApproach: '',
    technologies: '',
    githubUrl: '',
    demoUrl: '',
    isPublished: true,
  });

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      tagline: '',
      category: 'Hardware & Simulation',
      status: 'PROTOTYPE',
      overview: '',
      problem: '',
      technicalApproach: '',
      technologies: 'TypeScript, React, Python',
      githubUrl: '',
      demoUrl: '',
      isPublished: true,
    });
    setIsCreating(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      tagline: project.tagline,
      category: project.category,
      status: project.status,
      overview: project.overview,
      problem: project.problem,
      technicalApproach: project.technicalApproach,
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      isPublished: project.isPublished,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (isCreating) {
      await projectsService.createProject({
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tagline: formData.tagline,
        category: formData.category,
        status: formData.status,
        overview: formData.overview,
        problem: formData.problem,
        technicalApproach: formData.technicalApproach,
        technologies: techArray,
        keyFeatures: ['Feature initialized in prototype demo'],
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl,
        featuredOrder: projects.length + 1,
        isPublished: formData.isPublished,
      });
      showFeedback('Project created successfully in local demo.');
      setIsCreating(false);
    } else if (editingProject) {
      await projectsService.updateProject(editingProject.id, {
        title: formData.title,
        tagline: formData.tagline,
        category: formData.category,
        status: formData.status,
        overview: formData.overview,
        problem: formData.problem,
        technicalApproach: formData.technicalApproach,
        technologies: techArray,
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl,
        isPublished: formData.isPublished,
      });
      showFeedback(`Project "${formData.title}" updated.`);
      setEditingProject(null);
    }
    onRefresh();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete project "${title}" from local prototype?`)) {
      await projectsService.deleteProject(id);
      showFeedback(`Deleted "${title}".`);
      onRefresh();
    }
  };

  const handleTogglePublish = async (project: Project) => {
    await projectsService.updateProject(project.id, {
      isPublished: !project.isPublished,
    });
    showFeedback(`Project "${project.title}" ${!project.isPublished ? 'published' : 'unpublished'}.`);
    onRefresh();
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const currentProj = projects[index];
    const targetProj = projects[targetIdx];

    const currentOrder = currentProj.featuredOrder;
    const targetOrder = targetProj.featuredOrder;

    await projectsService.updateProject(currentProj.id, { featuredOrder: targetOrder });
    await projectsService.updateProject(targetProj.id, { featuredOrder: currentOrder });
    showFeedback('Order updated.');
    onRefresh();
  };

  const handleReset = async () => {
    if (confirm('Reset all projects to default starter data?')) {
      await projectsService.resetProjects();
      showFeedback('Projects reset to defaults.');
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-[#141413]">
        <div>
          <h3 className="font-editorial text-lg text-cream font-medium">
            Projects Management ({projects.length})
          </h3>
          <p className="text-xs font-mono text-cream-dim">
            Configure project details, statuses, repositories, and featured priority.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg border border-border hover:bg-[#1E1E1C] text-cream-dim hover:text-cream transition-colors text-xs font-mono flex items-center gap-1.5"
            title="Reset to initial projects"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-lg bg-cream text-background text-xs font-mono font-medium hover:bg-cream-muted transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-[#0E1F18] border border-[#2D4A3E] text-[#6EE7B7] text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="p-5 rounded-xl border border-border bg-[#121211] hover:border-cream/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              {/* Order Controls */}
              <div className="flex flex-col items-center gap-1 pt-1">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMoveOrder(idx, 'up')}
                  className="p-1 rounded text-cream-dim hover:text-cream disabled:opacity-20 transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono text-cream-dim">#{idx + 1}</span>
                <button
                  disabled={idx === projects.length - 1}
                  onClick={() => handleMoveOrder(idx, 'down')}
                  className="p-1 rounded text-cream-dim hover:text-cream disabled:opacity-20 transition-colors"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Info */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h4 className="font-editorial text-base text-cream font-medium">
                    {project.title}
                  </h4>
                  <StatusBadge status={project.status} size="sm" />
                  {!project.isPublished && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/60 text-red-400 border border-red-900">
                      Unpublished
                    </span>
                  )}
                </div>

                <p className="text-xs text-cream-muted line-clamp-1">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-cream-dim pt-1">
                  <span>Category: {project.category}</span>
                  {project.githubUrl ? (
                    <span className="text-[#6EE7B7]">GitHub Linked</span>
                  ) : (
                    <span className="text-cream-dim/60">No Repo Link</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => handleTogglePublish(project)}
                className={`p-2 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  project.isPublished
                    ? 'border-[#2D4A3E] text-[#6EE7B7] bg-[#0E1F18] hover:bg-[#122820]'
                    : 'border-border text-cream-dim bg-[#181816] hover:bg-[#20201D]'
                }`}
                title={project.isPublished ? 'Unpublish from public view' : 'Publish to public view'}
              >
                {project.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{project.isPublished ? 'Published' : 'Hidden'}</span>
              </button>

              <button
                onClick={() => handleOpenEdit(project)}
                className="p-2 rounded-lg border border-border bg-[#181816] hover:bg-[#20201D] text-cream-muted hover:text-cream transition-colors"
                title="Edit project"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(project.id, project.title)}
                className="p-2 rounded-lg border border-border bg-[#181816] hover:bg-red-950/50 hover:border-red-900 text-cream-dim hover:text-red-400 transition-colors"
                title="Delete project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal Form */}
      {(isCreating || editingProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#121211] border border-border rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-editorial text-xl text-cream font-medium">
                {isCreating ? 'Create New Project' : `Edit: ${editingProject?.title}`}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="p-1.5 text-cream-muted hover:text-cream rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-cream-dim block">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  placeholder="e.g. Next-Gen Embedded Controller"
                />
              </div>

              <div className="space-y-1">
                <label className="text-cream-dim block">Tagline *</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  placeholder="Brief one-line summary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-cream-dim block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  >
                    <option value="Hardware & Simulation">Hardware & Simulation</option>
                    <option value="AI & Search">AI & Search</option>
                    <option value="Agricultural AI">Agricultural AI</option>
                    <option value="GovTech & Identity">GovTech & Identity</option>
                    <option value="Web Systems">Web Systems</option>
                    <option value="Systems & Open Source">Systems & Open Source</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-cream-dim block">Development Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  >
                    <option value="PROTOTYPE">PROTOTYPE</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="EXPLORATION">EXPLORATION</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-cream-dim block">Overview / Summary</label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none font-sans text-xs"
                  placeholder="Summary of project purpose and scope..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-cream-dim block">Problem Statement</label>
                <textarea
                  rows={2}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none font-sans text-xs"
                  placeholder="The friction or technical challenge being solved..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-cream-dim block">Technical Approach</label>
                <textarea
                  rows={2}
                  value={formData.technicalApproach}
                  onChange={(e) => setFormData({ ...formData, technicalApproach: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none font-sans text-xs"
                  placeholder="Technologies, telemetry, pipelines, and models used..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-cream-dim block">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  placeholder="ESP32-S3, Python, FastAPI, Three.js"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-cream-dim block">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cream-dim block">Live Demonstration URL</label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded bg-[#181816] border-border text-cream focus:ring-0"
                  />
                  <span className="text-cream">Published on Public Site</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProject(null);
                    }}
                    className="px-4 py-2 rounded-lg border border-border hover:bg-[#1C1C1A] text-cream-dim transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-cream text-background font-medium hover:bg-cream-muted transition-all"
                  >
                    {isCreating ? 'Create Project' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
