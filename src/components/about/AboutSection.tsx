import React from 'react';
import { Profile } from '@/types/profile';
import { Cpu, Terminal, Compass, Zap, MapPin } from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#07080A] text-white border-b border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#0284C7]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full bg-[#F59E0B]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ============================================================== */}
        {/* SECTION HEADER (zaidsayyed.in signature layout)                */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-3">
              <span>01</span>
              <span className="w-8 h-[1px] bg-[#38BDF8]/40" />
              <span>MY JOURNEY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial text-white tracking-tight">
              How I got here<span className="text-[#38BDF8]">.</span>
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl font-normal leading-relaxed mt-4">
              Education, technical research, and the milestones that shape how I build hardware and software systems.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#64748B] tracking-widest uppercase">
            <span>DISCIPLINE &middot; RIGOR &middot; SYSTEMS</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TIMELINE SECTION (zaidsayyed.in vertical timeline style)       */}
        {/* ============================================================== */}
        <div className="py-16 sm:py-20 border-b border-white/10">
          <div className="space-y-12 sm:space-y-16">
            
            {/* Timeline Item 1: TCE Madurai Degree */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
              {/* Year column with glowing concentric node */}
              <div className="md:col-span-4 flex items-center gap-4">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#38BDF8]/40 bg-[#0C131D]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#64748B] tracking-tight">
                  2025 — 2029
                </span>
              </div>

              {/* Details column */}
              <div className="md:col-span-8 pl-12 md:pl-0 border-l border-white/10 md:border-l-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 font-editorial">
                  {profile.degree || 'B.E. (Electronics and Communication Engineering)'}
                </h3>
                <div className="flex items-center gap-2 text-[#38BDF8] font-mono text-sm mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.institution || 'Thiagarajar College of Engineering, Madurai'}</span>
                </div>
                <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-2xl">
                  Focusing on VLSI architecture, embedded microcontrollers, sensor telemetry, digital signal processing, and low-level hardware-software interfaces.
                </p>
              </div>
            </div>

            {/* Timeline Item 2: Present Engineering Practice */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
              {/* Year column with glowing concentric node */}
              <div className="md:col-span-4 flex items-center gap-4">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#10B981]/40 bg-[#0C1D18]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                  Present
                </span>
              </div>

              {/* Details column */}
              <div className="md:col-span-8 pl-12 md:pl-0 border-l border-white/10 md:border-l-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 font-editorial">
                  Systems &amp; Embedded AI Developer
                </h3>
                <div className="flex items-center gap-2 text-[#10B981] font-mono text-sm mb-3">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Personal Engineering Lab &amp; Independent Research</span>
                </div>
                <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-2xl">
                  Engineering autonomous robotics, real-time digital twins (PRW Wild), regulatory monitoring platforms (Pramaan AICTE), and low-latency edge sensor pipelines with ESP32-S3 and TinyML.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* PHILOSOPHY & WORKSTATION SHOWCASE                              */}
        {/* ============================================================== */}
        <div className="pt-16 sm:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Biography and Technical Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
              Engineering philosophy &amp; focus areas<span className="text-[#38BDF8]">.</span>
            </h3>

            <p className="text-lg text-[#E2E8F0] font-normal leading-relaxed">
              {profile.shortBio}
            </p>

            {profile.fullBio && profile.fullBio.length > 1 ? (
              profile.fullBio.slice(1).map((paragraph, idx) => (
                <p key={idx} className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : null}

            {/* Core Values / Focus Pillars (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 mt-8 border-t border-white/10">
              <div className="p-5 rounded-2xl border border-white/10 bg-[#0C0E14] hover:border-[#F59E0B]/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-white mb-2">
                  <Cpu className="w-4 h-4 text-[#F59E0B]" />
                  <span>HARDWARE &amp; FIRMWARE</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Embedded workflows with ESP32-S3, microcontroller peripherals, telemetry sensing, and edge signals.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-[#0C0E14] hover:border-[#38BDF8]/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-white mb-2">
                  <Terminal className="w-4 h-4 text-[#38BDF8]" />
                  <span>INTELLIGENT SYSTEMS</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Retrieval engines, local inference orchestration, time-series prediction, and Python backend services.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-[#0C0E14] hover:border-[#FDE047]/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-white mb-2">
                  <Zap className="w-4 h-4 text-[#FDE047]" />
                  <span>SIMULATION &amp; DIGITAL TWINS</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Interactive 3D environments in Three.js and Blender bridging real-time telemetry with spatial visual models.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-[#0C0E14] hover:border-[#6EE7B7]/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-white mb-2">
                  <Compass className="w-4 h-4 text-[#6EE7B7]" />
                  <span>TECHNOLOGY VENTURES</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Long-term commitment to semiconductor advancements, scalable platforms, and practical engineering solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Workstation Photograph Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0C0E14] shadow-2xl">
              <img
                src="/images/naveesh-work.jpg"
                alt="Naveesh developing systems at engineering workstation"
                className="w-full h-auto object-cover filter brightness-[0.96] contrast-[1.04] hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/85 to-transparent p-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#38BDF8] block mb-1">
                  PRACTICAL IMPLEMENTATION
                </span>
                <p className="text-xs font-mono text-[#94A3B8]">
                  Testing ideas through engineering projects, hardware telemetry, and software architectures.
                </p>
              </div>
            </div>

            {/* Credential Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0E14]">
              <span className="font-mono text-[10px] text-[#64748B] tracking-widest uppercase block mb-3">
                CURRENT ACADEMIC AFFILIATION
              </span>
              <h4 className="text-lg font-editorial text-white font-medium mb-1">
                {profile.degree}
              </h4>
              <p className="text-sm text-[#94A3B8] mb-2">
                {profile.institution}
              </p>
              <p className="text-xs font-mono text-[#64748B]">
                {profile.location} &middot; India
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
