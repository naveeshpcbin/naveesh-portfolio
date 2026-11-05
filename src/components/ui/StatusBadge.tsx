import React from 'react';
import { ProjectStatus } from '@/types/project';
import { PublicationStatus } from '@/types/achievement';

interface StatusBadgeProps {
  status: ProjectStatus | PublicationStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyle = () => {
    switch (status) {
      case 'COMPLETED':
      case 'Published':
        return 'border-[#2D4A3E] text-[#6EE7B7] bg-[#0E1F18]';
      case 'IN PROGRESS':
        return 'border-[#4A3E2D] text-[#FDE047] bg-[#221B0E]';
      case 'PROTOTYPE':
        return 'border-[#2D3A4E] text-[#93C5FD] bg-[#0F172A]';
      case 'EXPLORATION':
      case 'Draft':
        return 'border-[#3E3E3B] text-[#D1D0CA] bg-[#1A1A18]';
      case 'Private':
        return 'border-[#4E2D2D] text-[#FCA5A5] bg-[#200F0F]';
      default:
        return 'border-border text-cream-muted bg-background-subtle';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-mono font-medium tracking-wider uppercase rounded-full border ${getStyle()} ${sizeClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {status}
    </span>
  );
};
