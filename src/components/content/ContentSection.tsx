import React, { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Youtube, ExternalLink, Calendar, Video, Play } from 'lucide-react';
import { ContentItem } from '@/types/profile';
import { profileService } from '@/services/profile.service';
import { formatDate } from '@/lib/utilities';

export const ContentSection: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileService.getPublishedContent().then((items) => {
      setContentItems(items);
      setLoading(false);
    });
  }, []);

  return (
    <section id="content" className="py-24 sm:py-32 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number="05"
          title="SemiconNavee & Technical Media"
          subtitle="Documenting technical explorations, semiconductor architecture, simulation walkthroughs, and electronics tutorials."
        />

        {/* Featured Channel Intro Card */}
        <div className="mb-12 p-8 sm:p-10 rounded-2xl border border-border bg-[#121211] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-accent-gold uppercase tracking-wider">
              <Youtube className="w-4 h-4 text-[#F87171]" />
              <span>CONTENT INITIATIVE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-light text-cream">
              SemiconNavee
            </h3>
            <p className="text-sm text-cream-muted leading-relaxed font-light">
              A specialized platform exploring semiconductor engineering, hardware digital twins, embedded firmware, and intelligent computing paradigms. Designed to break down complex system concepts into clear technical analyses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10 w-full md:w-auto">
            <div className="px-4 py-2.5 rounded-lg border border-border bg-[#181816] text-xs font-mono text-cream-dim text-center">
              Channel: In Production
            </div>
          </div>

          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-red-950/20 blur-3xl pointer-events-none" />
        </div>

        {/* Video / Content Showcase Grid */}
        {loading ? (
          <div className="py-16 text-center font-mono text-xs text-cream-dim">
            Loading technical media...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contentItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-border bg-[#141413] hover:border-cream/30 hover:bg-[#181816] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail / Media Container */}
                  <div className="relative aspect-video w-full bg-[#1A1A18] overflow-hidden">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cream-dim">
                        <Video className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-cream-muted">
                      <span className="bg-[#0B0B0A]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-border">
                        {item.channelName}
                      </span>
                      {item.publishedDate && (
                        <span className="bg-[#0B0B0A]/80 backdrop-blur-sm px-2 py-1 rounded border border-border flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.publishedDate)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-6">
                    <h4 className="text-xl font-editorial font-light text-cream group-hover:text-cream-muted transition-colors mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-cream-muted leading-relaxed font-light mb-4">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Topics Tag Bar */}
                <div className="px-6 pb-6 pt-2 border-t border-border/60 flex flex-wrap gap-1.5">
                  {item.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#1C1C1A] text-[10px] font-mono text-cream-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
