import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Cpu } from 'lucide-react';
import { Profile } from '@/types/profile';
import { ScrollLinkedVideo } from './ScrollLinkedVideo';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface HeroScrollytellingProps {
  profile: Profile;
}

/**
 * HeroScrollytelling — Responsive 9:16 Cinematic Hero Section.
 *
 * Architecture:
 * - Outer container: 240vh tall (provides scroll runway for the portrait animation)
 * - Inner sticky stage: 100vh pinned stage with strict 4-layer architecture:
 *   - Layer 1: Cinematic architectural background (photo/image.png) with scroll parallax
 *   - Layer 2: Environmental lighting & spatial depth (warm linear ceiling glow, atmospheric lighting)
 *   - Layer 3: Foreground portrait with strict aspect-ratio: 9/16, responsive floor contact shadow
 *   - Layer 4: Website interface & typography (phased narrative, CTAs, live telemetry status)
 *
 * Interaction:
 * - Scrolling down progressively advances the portrait from front-facing to 3/4 profile.
 * - Scrolling up reverses the video towards front-facing.
 * - Stopping scrolling holds the current frame.
 * - Zero autoplay, zero controls UI, zero distortion.
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

  // ── Narrative Phase Calculations ──
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

  // ── Subtle 3D background parallax (separate from portrait video scroll) ──
  const bgParallaxY = scrollProgress * -32;

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full bg-[#07080A] text-white"
      style={{ height: '240vh' }}
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* STICKY VIEWPORT STAGE — pinned for the scroll duration */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Layer 0: Dark Base ── */}
        <div className="absolute inset-0 bg-[#07080A]" />

        {/* ── Layer 1: Cinematic Architectural Background ── */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${bgParallaxY}px, 0) scale(1.03)`,
          }}
        >
          <picture>
            <source srcSet="/images/cinematic-bg.webp" type="image/webp" />
            <img
              src="/images/cinematic-bg.jpg"
              alt="Minimalist architectural hall with linear illumination"
              aria-hidden="true"
              className="w-full h-[115%] object-cover object-center select-none pointer-events-none"
              style={{
                filter: 'brightness(0.48) contrast(1.08) saturate(0.92)',
              }}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* ── Layer 2: Environmental Depth & Lighting ── */}
        {/* Overhead linear warm beam illumination matching architecture */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#F59E0B]/[0.08] via-[#F59E0B]/[0.02] to-transparent pointer-events-none"
        />
        {/* Twilight side atmospheric glows */}
        <div
          aria-hidden="true"
          className="absolute top-[12%] left-0 w-[450px] h-[550px] rounded-full bg-[#38BDF8]/[0.04] blur-[140px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[10%] right-0 w-[450px] h-[550px] rounded-full bg-[#38BDF8]/[0.05] blur-[150px] pointer-events-none"
        />
        {/* Cinematic edge vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(7,8,10,0.55)_100%)] pointer-events-none"
        />

        {/* ── Layer 3: Foreground Portrait (STRICT 9:16 ASPECT RATIO) ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none select-none flex items-center justify-center lg:justify-end lg:pr-[8%] xl:pr-[12%] 2xl:pr-[16%] pt-12 sm:pt-14 lg:pt-0"
        >
          {/* Dedicated 9:16 portrait wrapper with proportional scaling constraints */}
          <div
            className="relative flex items-center justify-center"
            style={{
              height: 'clamp(340px, 72vh, 840px)',
              aspectRatio: '9 / 16',
              maxWidth: 'calc(100vw - 32px)',
            }}
          >
            {/* 3D Floor contact shadow grounding Naveesh on the architectural floor */}
            <div
              aria-hidden="true"
              className="absolute bottom-[-1.5%] left-1/2 -translate-x-1/2 w-[70%] h-[6%] rounded-[100%] bg-black/75 blur-xl pointer-events-none"
            />

            {/* Scroll-driven 9:16 video / WebGL canvas */}
            <ScrollLinkedVideo
              srcWebm="/videos/naveesh-portrait-alpha.webm"
              srcMp4="/videos/naveesh-portrait-720p.mp4"
              poster="/images/naveesh-portrait-poster.webp"
              progress={scrollProgress}
              alt="Naveesh — architectural portrait turning from front-facing to three-quarter profile"
              reducedMotion={prefersReducedMotion}
              fallbackImage="/images/naveesh-portrait-poster.webp"
              className="w-full h-full object-contain pointer-events-none"
            />

            {/* Subtle soft grounding gradient at base to merge into floor plane */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-[#07080A]/60 to-transparent pointer-events-none"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* Layer 4: Website Interface & Typography                */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-16">

          {/* Top spacer for navbar clearance */}
          <div className="h-14" />

          {/* Dynamic Content Container */}
          <div className="relative max-w-xl sm:max-w-2xl text-left pointer-events-auto pb-8 sm:pb-8 lg:mb-16 mt-auto lg:mt-0">

            {/* Backdrop scrim on mobile/tablet to ensure 100% legibility */}
            <div className="sm:bg-transparent bg-[#07080A]/75 backdrop-blur-md sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl border border-white/5 sm:border-none shadow-2xl sm:shadow-none">

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
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-editorial text-white tracking-tight leading-[0.94] mb-3 sm:mb-5">
                  Naveesh<span className="text-[#38BDF8]">.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg md:text-xl text-[#94A3B8] font-normal leading-relaxed max-w-xl mb-5 sm:mb-8">
                  Building at the intersection of Electronics, AI, and Software.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#07080A] font-medium text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-lg shadow-white/10 active:scale-95"
                  >
                    <span>Get in touch</span>
                  </a>

                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#12141A]/85 backdrop-blur-md border border-white/15 text-white font-medium text-xs sm:text-sm hover:bg-[#1A1D26] hover:border-white/30 transition-all active:scale-95"
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
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-editorial text-white tracking-tight leading-tight mb-3 sm:mb-4">
                  I build hardware-linked digital twins &amp; intelligent edge systems.
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-xl">
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
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-editorial text-white tracking-tight leading-tight mb-3 sm:mb-4">
                  Bridging physical silicon with real-time computation &amp; sensor telemetry.
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-xl">
                  From discrete semiconductor device physics to distributed full-stack platforms — solving practical engineering problems with verifiable rigor.
                </p>
              </div>

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
