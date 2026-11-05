import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  category?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  subtitle,
  className = '',
  category = 'SECTION',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-3">
        <span>{number}</span>
        <span className="w-8 h-[1px] bg-[#38BDF8]/40" />
        <span>{category}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight">
          {title}
          <span className="text-[#38BDF8]">.</span>
        </h2>
        {subtitle && (
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
