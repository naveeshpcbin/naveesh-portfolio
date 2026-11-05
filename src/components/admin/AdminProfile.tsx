import React, { useState } from 'react';
import { Profile } from '@/types/profile';
import { profileService } from '@/services/profile.service';
import { Check, RefreshCw } from 'lucide-react';

interface AdminProfileProps {
  profile: Profile;
  onRefresh: () => void;
}

export const AdminProfile: React.FC<AdminProfileProps> = ({ profile, onRefresh }) => {
  const [formData, setFormData] = useState<Profile>(profile);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await profileService.updateProfile(formData);
    showFeedback('Profile metadata updated in local demo.');
    onRefresh();
  };

  const handleReset = async () => {
    if (confirm('Reset profile text to defaults?')) {
      const def = await profileService.resetProfile();
      setFormData(def);
      showFeedback('Profile reset to defaults.');
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-[#141413]">
        <div>
          <h3 className="font-editorial text-lg text-cream font-medium">
            Profile &amp; Biography Configuration
          </h3>
          <p className="text-xs font-mono text-cream-dim">
            Edit biography, institutional details, hero marquee text, and tagline.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-lg border border-border hover:bg-[#1E1E1C] text-cream-dim hover:text-cream transition-colors text-xs font-mono flex items-center gap-1.5 self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-[#0E1F18] border border-[#2D4A3E] text-[#6EE7B7] text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl border border-border bg-[#121211] space-y-5 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-cream-dim block">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-cream-dim block">Headline / Role</label>
            <input
              type="text"
              required
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-cream-dim block">Hero Tagline</label>
          <input
            type="text"
            required
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-cream-dim block">Hero Animated Marquee Text</label>
          <input
            type="text"
            required
            value={formData.heroMarqueeText}
            onChange={(e) => setFormData({ ...formData, heroMarqueeText: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none uppercase"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-cream-dim block">Institution</label>
            <input
              type="text"
              required
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-cream-dim block">Degree Program</label>
            <input
              type="text"
              required
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-cream-dim block">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-cream-dim block">Short Biography (Lead Statement)</label>
          <textarea
            rows={3}
            required
            value={formData.shortBio}
            onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none font-sans text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-cream-dim block">Full Biography Paragraphs (One per line)</label>
          <textarea
            rows={5}
            value={formData.fullBio ? formData.fullBio.join('\n\n') : ''}
            onChange={(e) => setFormData({
              ...formData,
              fullBio: e.target.value.split('\n\n').filter((p) => p.trim().length > 0)
            })}
            className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream focus:border-cream/50 outline-none font-sans text-xs"
          />
        </div>

        <div className="pt-4 flex justify-end border-t border-border">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-cream text-background font-medium hover:bg-cream-muted transition-all"
          >
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};
