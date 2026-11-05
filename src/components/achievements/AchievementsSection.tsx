import React, { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AchievementCard } from './AchievementCard';
import { AchievementPreviewModal } from './AchievementPreviewModal';
import { Achievement, AchievementCategory } from '@/types/achievement';
import { achievementsService } from '@/services/achievements.service';
import { Award, FileText, ArrowUpRight } from 'lucide-react';

interface AchievementsSectionProps {
  onNavigateAdmin?: () => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ onNavigateAdmin }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [previewAchievement, setPreviewAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    achievementsService.getPublishedAchievements().then((data) => {
      setAchievements(data);
      setLoading(false);
    });
  }, []);

  const categories: string[] = [
    'ALL',
    'Project verification reports',
    'Technical documentation',
    'Certificates',
    'Academic achievements',
    'Competition-related documents',
  ];

  const filteredAchievements = selectedCategory === 'ALL'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  return (
    <section id="achievements" className="py-24 sm:py-32 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number="03"
          title="Achievement & Document Archive"
          subtitle="Verified project reports, technical specifications, and academic documentation. Designed for future cloud storage integration."
        />

        {/* Categories Bar */}
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

        {/* Content Area */}
        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-cream-dim">
            Loading archive documents...
          </div>
        ) : filteredAchievements.length === 0 ? (
          /* Polished Empty State adhering to Section 9 specifications */
          <div className="py-16 sm:py-20 px-8 text-center rounded-2xl border border-dashed border-border bg-[#141413] flex flex-col items-center justify-center max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full border border-border bg-[#1A1A18] flex items-center justify-center text-cream-dim">
              <Award className="w-6 h-6 text-cream-muted" />
            </div>
            <div className="space-y-1">
              <h3 className="font-editorial text-lg text-cream font-medium">
                No Published Records in This Category
              </h3>
              <p className="text-xs sm:text-sm text-cream-muted max-w-md mx-auto leading-relaxed">
                Official certificates, competition entries, and documentation will appear here as they are approved and published.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAchievements.map((item) => (
              <AchievementCard
                key={item.id}
                achievement={item}
                onPreview={(a) => setPreviewAchievement(a)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Document Reader & Preview Modal */}
      <AchievementPreviewModal
        achievement={previewAchievement}
        onClose={() => setPreviewAchievement(null)}
      />
    </section>
  );
};
