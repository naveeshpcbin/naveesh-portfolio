import React, { useEffect } from 'react';
import { X, FileText, Download, ExternalLink, Calendar, Building, CheckCircle2 } from 'lucide-react';
import { Achievement } from '@/types/achievement';
import { formatDate } from '@/lib/utilities';

interface AchievementPreviewModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementPreviewModal: React.FC<AchievementPreviewModalProps> = ({
  achievement,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (achievement) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Document preview for ${achievement.title}`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#121211] border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-[#151514]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-[#1E1E1C] border border-border text-cream">
              <FileText className="w-4 h-4 text-accent-gold" />
            </span>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-cream-dim block">
                {achievement.category}
              </span>
              <span className="font-editorial text-sm sm:text-base font-normal text-cream">
                Document Preview
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-cream-muted hover:text-cream rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-cream"
            aria-label="Close document preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-xl sm:text-2xl font-editorial font-light text-cream mb-2">
              {achievement.title}
            </h3>
            <p className="text-sm text-cream-muted leading-relaxed">
              {achievement.description}
            </p>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-border bg-[#161615] text-xs font-mono">
            <div className="flex items-center gap-2 text-cream-muted">
              <Building className="w-4 h-4 text-cream-dim" />
              <span>{achievement.issuingOrganization}</span>
            </div>
            <div className="flex items-center gap-2 text-cream-muted">
              <Calendar className="w-4 h-4 text-cream-dim" />
              <span>{formatDate(achievement.date)}</span>
            </div>
          </div>

          {/* Interactive Document Viewer Sheet */}
          <div className="p-6 rounded-xl border border-border bg-[#0B0B0A] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-20 rounded-lg border border-border bg-[#161615] flex flex-col items-center justify-center shadow-lg relative">
              <FileText className="w-8 h-8 text-cream-muted" />
              <span className="absolute bottom-1 text-[9px] font-mono text-accent-gold uppercase font-bold">
                {achievement.documentType?.toUpperCase() || 'PDF'}
              </span>
            </div>

            <div>
              <p className="text-xs font-mono text-cream font-medium">
                {achievement.documentName || `${achievement.title}.pdf`}
              </p>
              <p className="text-[11px] font-mono text-cream-dim mt-0.5">
                {achievement.documentSize || 'Verified Document'} &middot; Stored for Cloud Retrieval
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {achievement.documentUrl ? (
                <a
                  href={achievement.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream text-background text-xs font-mono font-medium hover:bg-cream-muted transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Open Document</span>
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181816] border border-border text-xs font-mono text-cream-dim">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  <span>Document Stored Locally</span>
                </div>
              )}

              {achievement.verificationUrl && (
                <a
                  href={achievement.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181816] border border-border hover:border-cream/40 text-xs font-mono text-cream transition-all"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
