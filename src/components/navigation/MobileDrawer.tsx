import React, { useEffect } from 'react';
import { X, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateAdmin: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateAdmin,
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-[#111110] border-l border-border flex flex-col justify-between p-6 sm:p-8 z-10 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-border mb-8">
            <span className="font-editorial text-lg tracking-wider text-cream font-medium">
              NAVEESH
            </span>
            <button
              onClick={onClose}
              className="p-2 text-cream-muted hover:text-cream transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-cream"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col space-y-5" aria-label="Mobile Navigation">
            {siteConfig.navigation.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between py-2 text-xl font-editorial text-cream-muted hover:text-cream transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cream-dim">0{index + 1}</span>
                  <span className="tracking-tight">{item.label}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cream-dim" />
              </a>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-8 border-t border-border mt-8 flex flex-col gap-4">
          <p className="text-[11px] text-cream-dim font-mono leading-relaxed">
            Thiagarajar College of Engineering<br />
            Madurai, Tamil Nadu
          </p>
        </div>
      </div>
    </div>
  );
};
