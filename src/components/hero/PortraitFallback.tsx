import React from 'react';

interface PortraitFallbackProps {
  imageUrl?: string;
  className?: string;
}

export const PortraitFallback: React.FC<PortraitFallbackProps> = ({
  imageUrl = '/images/naveesh-portrait.jpg',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient background glow ring */}
      <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#1E1E1C]/80 to-[#2A2A28]/40 blur-3xl -z-10" />

      {/* Frame Container */}
      <div className="relative w-[280px] h-[360px] sm:w-[340px] sm:h-[440px] md:w-[380px] md:h-[490px] rounded-2xl overflow-hidden border border-[#2A2A27] bg-[#121211] shadow-2xl shadow-black/80 group">
        {/* Authentic Photograph */}
        <img
          src={imageUrl}
          alt="Portrait of Naveesh"
          className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
          loading="eager"
        />

        {/* Subtle Vignette & Bezel Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 ring-1 ring-inset ring-cream/10 rounded-2xl pointer-events-none" />

        {/* Editorial Floating Tag */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-cream-muted bg-[#0B0B0A]/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-border">
          <span className="tracking-widest uppercase">ECE / SYSTEMS</span>
          <span className="text-[#6EE7B7] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
            ONLINE
          </span>
        </div>
      </div>
    </div>
  );
};
