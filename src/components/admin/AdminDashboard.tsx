import React, { useState, useEffect } from 'react';
import { AdminNotice } from './AdminNotice';
import { AdminProjects } from './AdminProjects';
import { AdminAchievements } from './AdminAchievements';
import { AdminProfile } from './AdminProfile';
import { AdminSocialLinks } from './AdminSocialLinks';
import { Project } from '@/types/project';
import { Achievement } from '@/types/achievement';
import { Profile, SocialLink } from '@/types/profile';
import { projectsService } from '@/services/projects.service';
import { achievementsService } from '@/services/achievements.service';
import { profileService } from '@/services/profile.service';
import { socialLinksService } from '@/services/social-links.service';
import { LayoutGrid, Award, User, Link as LinkIcon, ArrowLeft, ExternalLink, LogOut, ShieldCheck } from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'achievements' | 'profile' | 'social'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    const [p, a, prof, soc] = await Promise.all([
      projectsService.getAllProjects(),
      achievementsService.getAllAchievements(),
      profileService.getProfile(),
      socialLinksService.getAllLinks(),
    ]);
    setProjects(p);
    setAchievements(a);
    setProfile(prof);
    setSocialLinks(soc);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: LayoutGrid, count: projects.length },
    { id: 'achievements', label: 'Achievements & Docs', icon: Award, count: achievements.length },
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'social', label: 'Social & Links', icon: LinkIcon, count: socialLinks.filter((l) => l.isConfigured).length },
  ];

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-mono text-xs text-cream-dim">
        Loading administrative console...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080A] text-white pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                Portfolio Administration
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#0C1D18] border border-[#10B981]/30 text-[#10B981] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>AUTHENTICATED</span>
              </span>
            </div>
            <p className="font-mono text-xs text-[#94A3B8]">
              Authorized administrator session &middot; Modifies live project portfolio data and telemetry
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#12141A] hover:bg-[#1A1D26] text-xs font-mono text-[#94A3B8] hover:text-white transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public View</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 bg-red-950/20 hover:bg-red-950/40 text-xs font-mono text-red-300 hover:text-red-200 transition-all"
                title="Lock console and clear session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Console</span>
              </button>
            )}
          </div>
        </div>

        {/* Prototype Limitations Notice */}
        <AdminNotice />

        {/* Tab Navigation */}
        <div className="flex border-b border-border mb-8 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-6 py-3.5 font-mono text-xs uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-cream text-cream font-medium bg-[#141413]'
                    : 'border-transparent text-cream-dim hover:text-cream hover:bg-[#111110]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    isActive ? 'bg-cream text-background' : 'bg-[#1C1C1A] text-cream-dim'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div>
          {activeTab === 'projects' && (
            <AdminProjects projects={projects} onRefresh={loadAll} />
          )}

          {activeTab === 'achievements' && (
            <AdminAchievements achievements={achievements} onRefresh={loadAll} />
          )}

          {activeTab === 'profile' && (
            <AdminProfile profile={profile} onRefresh={loadAll} />
          )}

          {activeTab === 'social' && (
            <AdminSocialLinks socialLinks={socialLinks} onRefresh={loadAll} />
          )}
        </div>
      </div>
    </div>
  );
};
