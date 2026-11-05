import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { AboutSection } from '@/components/about/AboutSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { AchievementsSection } from '@/components/achievements/AchievementsSection';
import { TechnicalInterestsSection } from '@/components/interests/TechnicalInterestsSection';
import { ContentSection } from '@/components/content/ContentSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Profile } from '@/types/profile';
import { profileService } from '@/services/profile.service';

interface HomePageProps {
  onNavigateAdmin: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateAdmin }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    profileService.getProfile().then((data) => setProfile(data));
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-mono text-xs text-cream-dim">
        Loading personal portfolio...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-cream selection:bg-cream selection:text-background">
      {/* Top Fixed Navigation */}
      <Navbar onNavigateAdmin={onNavigateAdmin} />

      {/* Main Multi-Section Layout */}
      <main id="main-content">
        {/* Section 00: Full-viewport Opening Hero with 3D Portrait */}
        <Hero profile={profile} />

        {/* Section 01: Philosophy & Background (About) */}
        <AboutSection profile={profile} />

        {/* Section 02: Selected Engineering Projects Showcase */}
        <ProjectsSection />

        {/* Section 03: Document & Achievement Archive */}
        <AchievementsSection onNavigateAdmin={onNavigateAdmin} />

        {/* Section 04: Technical Interests & Multidisciplinary Pillars */}
        <TechnicalInterestsSection />

        {/* Section 05: SemiconNavee Content & Media */}
        <ContentSection />

        {/* Section 06: Direct Contact & Destination Links */}
        <ContactSection email={profile.email} onNavigateAdmin={onNavigateAdmin} />
      </main>
    </div>
  );
};
