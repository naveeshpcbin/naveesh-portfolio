import React from 'react';
import { FileText, Eye, ArrowUpRight, Building, Calendar } from 'lucide-react';
import { Achievement } from '@/types/achievement';
import { formatDate } from '@/lib/utilities';

interface AchievementCardProps {
  achievement: Achievement;
  onPreview: (achievement: Achievement) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onPreview }) => {
  return (
    <article
      onClick={() => onPreview(achievement)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-[#141413] hover:border-cream/30 hover:bg-[#181816] transition-all duration-300 cursor-pointer shadow-lg shadow-black/20"
    >
      <div>
        {/* Top category & date */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="font-mono text-[10px] tracking-wider uppercase text-accent-gold bg-[#1E1C15] px-2.5 py-0.5 rounded border border-[#3E3825]">
            {achievement.category}
          </span>
          <span className="font-mono text-[11px] text-cream-dim flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {formatDate(achievement.date)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-editorial font-light text-cream group-hover:text-cream-muted transition-colors mb-2">
          {achievement.title}
        </h3>

        {/* Organization */}
        <div className="flex items-center gap-2 text-xs font-mono text-cream-dim mb-3">
          <Building className="w-3.5 h-3.5 text-cream-dim" />
          <span>{achievement.issuingOrganization}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-cream-muted font-light leading-relaxed line-clamp-3 mb-4">
          {achievement.description}
        </p>
      </div>

      {/* Footer bar */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-cream-dim">
          <FileText className="w-3.5 h-3.5 text-accent-gold" />
          <span className="uppercase text-[11px]">{achievement.documentType?.toUpperCase() || 'DOCUMENT'}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 text-cream-muted group-hover:text-cream transition-colors">
          <span>VIEW DOCUMENT</span>
          <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </article>
  );
};
