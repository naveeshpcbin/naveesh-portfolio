import React, { useRef, useState, useEffect } from 'react';
import { Cpu, Terminal, ShieldCheck, Sparkles } from 'lucide-react';

interface ArchitecturalPortraitProps {
  imageUrl?: string;
  className?: string;
}

export const ArchitecturalPortrait: React.FC<ArchitecturalPortraitProps> = ({
  imageUrl = '/images/naveesh-portrait.jpg',
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [timeString, setTimeString] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (max ~12 degrees)
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className={`relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] mx-auto select-none perspective-[1200px] ${className}`}
    >
      {/* Ambient warm back-glow */}
      <div
        className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/15 via-[#EFEEE9]/5 to-transparent rounded-3xl blur-2xl transition-opacity duration-700 pointer-events-none"
        style={{ opacity: isHovered ? 0.9 : 0.4 }}
      />

      {/* Outer Technical Frame with Corner Crosshairs */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative rounded-2xl bg-[#121215] border border-white/10 p-2 sm:p-2.5 shadow-2xl shadow-black/90 cursor-pointer overflow-hidden group"
      >
        {/* Dynamic Specular Sheen (Glare) */}
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
          }}
        />

        {/* Top Technical Metadata Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 mb-1.5 text-[10px] font-mono text-cream-dim border-b border-white/5 tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="text-accent-gold font-bold">+</span>
            <span className="text-cream-muted">SYS_ID: NAVEE-01</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#10B981] font-medium tracking-widest">LIVE TELEMETRY</span>
          </div>
        </div>

        {/* Authentic Photograph Viewport */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-[#0A0A0C]">
          <img
            src={imageUrl}
            alt="Naveesh — Electronics and Communication Engineer"
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.03]"
            loading="eager"
            fetchPriority="high"
          />

          {/* Architectural Framing Elements (Non-intrusive) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-75 pointer-events-none" />

          {/* Top-Right Technical Stamp */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[9px] font-mono text-cream/90 pointer-events-none">
            <Cpu className="w-3 h-3 text-accent-gold" />
            <span>TCE &middot; ECE DEPT</span>
          </div>

          {/* Bottom Floating Telemetry Overlay */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#09090B]/85 backdrop-blur-md border border-white/10 pointer-events-none">
            <div className="flex items-center justify-between text-[11px] font-mono text-cream mb-1">
              <span className="font-semibold tracking-wide text-cream">NAVEESH P</span>
              <span className="text-accent-gold text-[10px]">{timeString || 'MADURAI, TN'}</span>
            </div>
            <p className="text-[10px] text-cream-dim leading-snug font-sans">
              Embedded Systems &middot; TinyML &middot; Semiconductor Architecture
            </p>
          </div>

          {/* Precision Corner Alignment Brackets */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-accent-gold/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-accent-gold/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-accent-gold/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-accent-gold/60 pointer-events-none" />
        </div>

        {/* Bottom Interactive Hint */}
        <div className="flex items-center justify-between px-3 pt-2 text-[9px] font-mono text-cream-dim/80">
          <span className="flex items-center gap-1">
            <Terminal className="w-2.5 h-2.5 text-accent-gold" />
            <span>3D SPATIAL PERSPECTIVE</span>
          </span>
          <span className="text-[9px] tracking-widest text-cream-muted uppercase">
            PARALLAX REACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
