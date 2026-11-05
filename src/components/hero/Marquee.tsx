import React from 'react';

interface MarqueeProps {
  text?: string;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text = 'NAVEESH — ELECTRONICS / AI / SYSTEMS',
  className = '',
}) => {
  // Duplicated text to ensure uninterrupted continuous seamless scroll
  const phrases = Array(6).fill(text);

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee will-change-transform">
        {phrases.map((phrase, idx) => (
          <span
            key={idx}
            className="inline-block text-[13vw] sm:text-[11vw] md:text-[9.5vw] font-editorial font-light tracking-tighter text-[#EFEEE9]/[0.07] uppercase px-6"
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
};
