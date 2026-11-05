import React, { useState } from 'react';
import { Achievement, AchievementCategory, PublicationStatus } from '@/types/achievement';
import { achievementsService } from '@/services/achievements.service';
import { storageService } from '@/services/storage.service';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utilities';
import { Plus, Edit3, Trash2, FileText, Upload, Check, X, RefreshCw, Eye, EyeOff, Lock } from 'lucide-react';

interface AdminAchievementsProps {
  achievements: Achievement[];
  onRefresh: () => void;
}

export const AdminAchievements: React.FC<AdminAchievementsProps> = ({ achievements, onRefresh }) => {
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    issuingOrganization: '',
    category: 'Project verification reports' as AchievementCategory,
    date: new Date().toISOString().split('T')[0],
    description: '',
    publicationStatus: 'Published' as PublicationStatus,
    verificationUrl: '',
    documentUrl: '',
    documentName: '',
    documentSize: '',
    documentType: 'pdf' as 'pdf' | 'image' | 'report' | 'link',
  });

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      issuingOrganization: 'Thiagarajar College of Engineering',
      category: 'Project verification reports',
      date: new Date().toISOString().split('T')[0],
      description: '',
      publicationStatus: 'Draft',
      verificationUrl: '',
      documentUrl: '',
      documentName: '',
      documentSize: '',
      documentType: 'pdf',
    });
    setIsCreating(true);
  };

  const handleOpenEdit = (item: Achievement) => {
    setEditingAchievement(item);
    setFormData({
      title: item.title,
      issuingOrganization: item.issuingOrganization,
      category: item.category,
      date: item.date,
      description: item.description,
      publicationStatus: item.publicationStatus,
      verificationUrl: item.verificationUrl || '',
      documentUrl: item.documentUrl || '',
      documentName: item.documentName || '',
      documentSize: item.documentSize || '',
      documentType: item.documentType || 'pdf',
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await storageService.uploadDocument(file);
      setFormData((prev) => ({
        ...prev,
        documentUrl: result.url,
        documentName: result.filename,
        documentSize: result.sizeFormatted,
        documentType: file.type.includes('image') ? 'image' : 'pdf',
      }));
      showFeedback(`Local file "${file.name}" loaded for preview (${result.sizeFormatted}).`);
    } catch {
      showFeedback('Failed to read local file.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      await achievementsService.createAchievement({
        title: formData.title,
        issuingOrganization: formData.issuingOrganization,
        category: formData.category,
        date: formData.date,
        description: formData.description,
        publicationStatus: formData.publicationStatus,
        verificationUrl: formData.verificationUrl,
        documentUrl: formData.documentUrl,
        documentName: formData.documentName,
        documentSize: formData.documentSize,
        documentType: formData.documentType,
      });
      showFeedback(`Achievement "${formData.title}" created (${formData.publicationStatus}).`);
      setIsCreating(false);
    } else if (editingAchievement) {
      await achievementsService.updateAchievement(editingAchievement.id, {
        title: formData.title,
        issuingOrganization: formData.issuingOrganization,
        category: formData.category,
        date: formData.date,
        description: formData.description,
        publicationStatus: formData.publicationStatus,
        verificationUrl: formData.verificationUrl,
        documentUrl: formData.documentUrl,
        documentName: formData.documentName,
        documentSize: formData.documentSize,
        documentType: formData.documentType,
      });
      showFeedback(`Achievement updated.`);
      setEditingAchievement(null);
    }
    onRefresh();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete achievement "${title}"?`)) {
      await achievementsService.deleteAchievement(id);
      showFeedback(`Deleted "${title}".`);
      onRefresh();
    }
  };

  const handleStatusCycle = async (item: Achievement) => {
    const statuses: PublicationStatus[] = ['Draft', 'Published', 'Private'];
    const currentIdx = statuses.indexOf(item.publicationStatus);
    const nextStatus = statuses[(currentIdx + 1) % statuses.length];

    await achievementsService.updateAchievement(item.id, { publicationStatus: nextStatus });
    showFeedback(`Status changed to ${nextStatus}.`);
    onRefresh();
  };

  const handleReset = async () => {
    if (confirm('Reset achievements archive to initial demonstration records?')) {
      await achievementsService.resetAchievements();
      showFeedback('Achievements reset to initial state.');
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-[#141413]">
        <div>
          <h3 className="font-editorial text-lg text-cream font-medium">
            Document &amp; Achievement Archive ({achievements.length})
          </h3>
          <p className="text-xs font-mono text-cream-dim">
            Manage verification reports, technical documentation, local file selection, and publication states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg border border-border hover:bg-[#1E1E1C] text-cream-dim hover:text-cream transition-colors text-xs font-mono flex items-center gap-1.5"
            title="Reset defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-lg bg-cream text-background text-xs font-mono font-medium hover:bg-cream-muted transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Achievement</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-[#0E1F18] border border-[#2D4A3E] text-[#6EE7B7] text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Achievements List */}
      <div className="space-y-3">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-border bg-[#121211] hover:border-cream/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="p-2.5 rounded-lg border border-border bg-[#181816] text-accent-gold mt-1">
                <FileText className="w-5 h-5" />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h4 className="font-editorial text-base text-cream font-medium">
                    {item.title}
                  </h4>
                  <StatusBadge status={item.publicationStatus} size="sm" />
                </div>

                <p className="text-xs text-cream-muted line-clamp-1">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-cream-dim pt-1">
                  <span>Organization: {item.issuingOrganization}</span>
                  <span>Date: {formatDate(item.date)}</span>
                  <span>Category: {item.category}</span>
                  {item.documentName && (
                    <span className="text-[#6EE7B7]">Doc: {item.documentName}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => handleStatusCycle(item)}
                className="px-3 py-1.5 rounded-lg border border-border bg-[#181816] hover:bg-[#20201D] text-xs font-mono text-cream-dim hover:text-cream transition-colors"
                title="Cycle status: Draft -> Published -> Private"
              >
                Toggle Status
              </button>

              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-lg border border-border bg-[#181816] hover:bg-[#20201D] text-cream-muted hover:text-cream transition-colors"
                title="Edit achievement"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="p-2 rounded-lg border border-border bg-[#181816] hover:bg-red-950/50 hover:border-red-900 text-cream-dim hover:text-red-400 transition-colors"
                title="Delete achievement"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {(isCreating || editingAchievement) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#121211] border border-border rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-editorial text-xl text-cream font-medium">
                {isCreating ? 'Add Achievement / Document' : `Edit: ${editingAchievement?.title}`}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingAchievement(null);
                }}
                className="p-1.5 text-cream-muted hover:text-cream rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-cream-dim block">Document / Achievement Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  placeholder="e.g. ESP32-S3 Telemetry Verification Report"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-cream-dim block">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.issuingOrganization}
                    onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                    placeholder="e.g. Thiagarajar College of Engineering"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cream-dim block">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-cream-dim block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  >
                    <option value="Project verification reports">Project verification reports</option>
                    <option value="Technical documentation">Technical documentation</option>
                    <option value="Certificates">Certificates</option>
                    <option value="Academic achievements">Academic achievements</option>
                    <option value="Competition-related documents">Competition-related documents</option>
                    <option value="Other approved accomplishments">Other approved accomplishments</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-cream-dim block">Publication Status</label>
                  <select
                    value={formData.publicationStatus}
                    onChange={(e) => setFormData({ ...formData, publicationStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  >
                    <option value="Draft">Draft (Internal only)</option>
                    <option value="Published">Published (Visible to public)</option>
                    <option value="Private">Private (Restricted)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-cream-dim block">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none font-sans text-xs"
                  placeholder="Details of the verified report, certificate, or paper..."
                />
              </div>

              {/* Local File Selector for Document Preview */}
              <div className="p-4 rounded-xl border border-dashed border-border bg-[#161615] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-cream-dim block font-medium">
                    Select Local Document File (PDF / Report)
                  </label>
                  <span className="text-[10px] text-accent-gold">Prototype File Picker</span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 rounded-lg border border-border bg-[#1C1C1A] hover:bg-[#242421] text-cream cursor-pointer transition-colors flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Local File</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>

                  {formData.documentName && (
                    <span className="text-xs text-[#6EE7B7] flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      {formData.documentName} ({formData.documentSize})
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-cream-dim/80">
                  Note: In Phase 1, files are loaded locally in browser memory for preview. In Phase 2, uploads will stream directly to Supabase Storage bucket <code>achievements-documents</code>.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-cream-dim block">External Verification URL (optional)</label>
                <input
                  type="url"
                  value={formData.verificationUrl}
                  onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingAchievement(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-[#1C1C1A] text-cream-dim transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cream text-background font-medium hover:bg-cream-muted transition-all"
                >
                  {isCreating ? 'Add Achievement' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
