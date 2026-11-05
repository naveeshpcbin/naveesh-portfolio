import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ArrowDown, Cpu } from 'lucide-react';
import { Profile } from '@/types/profile';
import { ScrollLinkedVideo } from './ScrollLinkedVideo';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface HeroScrollytellingProps {
  profile: Profile;
}

/**
 * HeroScrollytelling — Immersive scroll-driven hero section.
 *
 * Architecture:
 * - Outer container: ~240vh tall (provides scroll runway for the animation)
 * - Inner sticky stage: 100vh (stays pinned while user scrolls)
 * - Background: Cinematic architectural image from photo/image.png
 * - Portrait: Scroll-linked video that rotates from front-facing to side-facing
 * - Typography: Phased narrative overlays that transition with scroll
 *
 * The video's currentTime is mapped directly to scroll progress (0→1).
 * No play/pause controls. No autoplay. Pure scroll-driven interaction.
 */
export const HeroScrollytelling: React.FC<HeroScrollytellingProps> = ({ profile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  const [liveIST, setLiveIST] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveIST(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Phase Calculations ──
  // Phase 0: 0.00 → 0.32  (Hero Introduction)
  // Phase 1: 0.32 → 0.65  (What I do)
  // Phase 2: 0.65 → 1.00  (How I think)
  const phase0Opacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.04) / 0.22));
  const phase0TranslateY = scrollProgress * -45;

  const phase1Opacity =
    scrollProgress < 0.28
      ? 0
      : scrollProgress < 0.46
      ? Math.min(1, (scrollProgress - 0.28) / 0.14)
      : scrollProgress < 0.63
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.63) / 0.14);

  const phase1TranslateY =
    scrollProgress < 0.35
      ? (1 - phase1Opacity) * 35
      : scrollProgress > 0.63
      ? ((scrollProgress - 0.63) / 0.14) * -35
      : 0;

  const phase2Opacity =
    scrollProgress < 0.63
      ? 0
      : Math.min(1, (scrollProgress - 0.63) / 0.15);

  const phase2TranslateY =
    scrollProgress < 0.78
      ? (1 - phase2Opacity) * 35
      : 0;

  // ── Subtle background parallax (separate from video scroll) ──
  const bgParallaxY = scrollProgress * -30; // gentle upward shift

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full bg-[#07080A] text-white"
      style={{ height: '240vh' }} // scroll runway
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* STICKY VIEWPORT STAGE — pinned for the scroll duration */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Layer 0: Dark base ── */}
        <div className="absolute inset-0 bg-[#07080A]" />

        {/* ── Layer 1: Cinematic Architectural Background ── */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${bgParallaxY}px, 0)`,
          }}
        >
          <img
            src="/images/cinematic-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-[115%] object-cover object-center"
            style={{
              filter: 'brightness(0.35) contrast(1.1) saturate(0.85)',
            }}
            loading="eager"
          />
        </div>

        {/* ── Layer 2: Atmospheric depth overlays ── */}
        {/* Warm amber glow — upper left */}
        <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#F59E0B]/[0.06] blur-[120px] pointer-events-none" />
        {/* Cool blue glow — lower right */}
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#0284C7]/[0.08] blur-[140px] pointer-events-none" />

        {/* ── Layer 3: Scroll-Linked Portrait Video ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none"
        >
          {/* Portrait container — responsive sizing */}
          <div
            className="relative w-[88vw] h-[70vh] sm:w-[75vw] sm:h-[78vh] md:w-[60vw] md:h-[85vh] lg:w-[50vw] lg:h-[88vh] xl:w-[45vw] xl:h-[90vh] max-w-[800px] flex items-center justify-center"
          >
            <ScrollLinkedVideo
              src="/videos/naveesh-portrait-scroll.mp4"
              poster="/images/naveesh-scroll-poster.jpg"
              progress={scrollProgress}
              alt="Naveesh — portrait turning from front-facing to side-facing"
              reducedMotion={prefersReducedMotion}
              fallbackImage="/images/naveesh-hero.jpg"
              className="w-full h-full rounded-sm overflow-hidden"
            />

            {/* ── Seamless edge blending masks ── */}
            {/* Deep bottom vignette */}
            <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#07080A] via-[#07080A]/80 to-transparent pointer-events-none" />
            {/* Left vignette */}
            <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[#07080A] via-[#07080A]/50 to-transparent pointer-events-none" />
            {/* Right vignette */}
            <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-[#07080A] via-[#07080A]/50 to-transparent pointer-events-none" />
            {/* Top vignette */}
            <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#07080A] via-[#07080A]/50 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* NARRATIVE TEXT OVERLAY — Bottom-left aligned             */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-16">

          {/* Top spacer for navbar clearance */}
          <div className="h-14" />

          {/* Dynamic Content Container */}
          <div className="relative max-w-xl sm:max-w-2xl text-left pointer-events-auto pb-12 sm:pb-8">

            {/* ── PHASE 0: Hero Introduction ── */}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                opacity: phase0Opacity,
                transform: `translateY(${phase0TranslateY}px)`,
                display: phase0Opacity <= 0 ? 'none' : 'block',
              }}
            >
              {/* Category Kicker */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                <span>ELECTRONICS / AI / SYSTEMS</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-editorial text-white tracking-tight leading-[0.94] mb-4 sm:mb-5">
                Naveesh<span className="text-[#38BDF8]">.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-normal leading-relaxed max-w-xl mb-6 sm:mb-8">
                Building at the intersection of Electronics, AI, and Software.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#07080A] font-medium text-sm hover:bg-neutral-200 transition-all shadow-lg shadow-white/10 active:scale-95"
                >
                  <span>Get in touch</span>
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#12141A]/85 backdrop-blur-md border border-white/15 text-white font-medium text-sm hover:bg-[#1A1D26] hover:border-white/30 transition-all active:scale-95"
                >
                  <span>See my work</span>
                </a>
              </div>
            </div>

            {/* ── PHASE 1: What I Do ── */}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                opacity: phase1Opacity,
                transform: `translateY(${phase1TranslateY}px)`,
                display: phase1Opacity <= 0 ? 'none' : 'block',
              }}
            >
              <div className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2 sm:mb-3">
                01 — WHAT I DO
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-editorial text-white tracking-tight leading-tight mb-4">
                I build hardware-linked digital twins &amp; intelligent edge systems.
              </h2>
              <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-xl">
                Integrating ESP32-S3 microcontroller telemetry, TinyML edge inference, and real-time 3D spatial simulation to monitor physical environments.
              </p>
            </div>

            {/* ── PHASE 2: How I Think ── */}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                opacity: phase2Opacity,
                transform: `translateY(${phase2TranslateY}px)`,
                display: phase2Opacity <= 0 ? 'none' : 'block',
              }}
            >
              <div className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2 sm:mb-3">
                02 — HOW I THINK
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-editorial text-white tracking-tight leading-tight mb-4">
                Bridging physical silicon with real-time computation &amp; sensor telemetry.
              </h2>
              <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-xl">
                From discrete semiconductor device physics to distributed full-stack platforms — solving practical engineering problems with verifiable rigor.
              </p>
            </div>
          </div>

          {/* ── Bottom Bar: Telemetry & Scroll Status ── */}
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B] pt-4 border-t border-white/5 pointer-events-auto">
            {/* Left: Institution */}
            <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
              <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="hidden sm:inline">THIAGARAJAR COLLEGE OF ENGINEERING · MADURAI</span>
              <span className="sm:hidden">TCE · MADURAI</span>
            </div>

            {/* Center: Scroll prompt (fades on scroll) */}
            <div
              className="hidden sm:flex items-center gap-2 text-[#94A3B8] transition-opacity duration-500"
              style={{ opacity: scrollProgress < 0.1 ? 1 : 0 }}
            >
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#38BDF8]" />
              <span className="uppercase tracking-widest text-[11px]">SCROLL</span>
            </div>

            {/* Right: Live telemetry status */}
            <div className="flex items-center gap-2.5 bg-[#101217]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] text-white">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="tracking-wider uppercase">ACTIVE</span>
              <span className="text-[#64748B]">&middot;</span>
              <span className="text-[#38BDF8] font-medium">{liveIST}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroScrollytelling;
