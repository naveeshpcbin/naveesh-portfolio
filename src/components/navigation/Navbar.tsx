import React, { useState, useEffect } from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { MobileDrawer } from './MobileDrawer';

interface NavbarProps {
  onNavigateAdmin: () => void;
  isAdminPage?: boolean;
  onNavigateHome?: () => void;
}

const sectionChapterMap: Record<string, string> = {
  hero: '00 · INTRO',
  about: '01 · STORY',
  projects: '02 · WORK',
  achievements: '03 · ARCHIVE',
  interests: '04 · EXPLORE',
  content: '05 · CONTENT',
  contact: '06 · CONTACT',
};

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateAdmin,
  isAdminPage = false,
  onNavigateHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll-reactive active section detection
      const sections = ['contact', 'content', 'interests', 'achievements', 'projects', 'about', 'hero'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0A]/90 backdrop-blur-md border-b border-border py-4 shadow-xl shadow-black/40'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand & Chapter Indicator - Upper Left */}
          <div className="flex items-center gap-3.5">
            {isAdminPage ? (
              <button
                onClick={onNavigateHome}
                className="group text-left focus-visible:outline-2 focus-visible:outline-cream rounded"
              >
                <span className="font-editorial text-lg tracking-wider font-light text-cream group-hover:text-cream-muted transition-colors">
                  NAVEESH
                </span>
                <span className="ml-2 font-mono text-[10px] tracking-widest text-cream-dim uppercase border border-border px-1.5 py-0.5 rounded">
                  PORTFOLIO
                </span>
              </button>
            ) : (
              <a
                href="#hero"
                className="group focus-visible:outline-2 focus-visible:outline-cream rounded flex items-center gap-3"
              >
                <span className="font-editorial text-xl sm:text-2xl tracking-wider font-light text-cream group-hover:text-cream-muted transition-colors">
                  NAVEESH
                </span>
              </a>
            )}

            {/* Scroll-Reactive Chapter Indicator (Subtle architectural pill) */}
            {!isAdminPage && isScrolled && sectionChapterMap[activeSection] && (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-[#38BDF8] tracking-widest uppercase transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                <span>{sectionChapterMap[activeSection]}</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation with Active Section Highlighting */}
          {!isAdminPage && (
            <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {siteConfig.navigation.map((item) => {
                const targetId = item.href.replace('#', '');
                const isActive = activeSection === targetId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`text-xs font-mono tracking-widest-editorial uppercase transition-all relative py-1 group ${
                      isActive ? 'text-white font-medium' : 'text-cream-muted hover:text-cream'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#38BDF8] transition-all duration-300 ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>
          )}

          {/* Action Button - Right */}
          <div className="flex items-center gap-3">
            {isAdminPage ? (
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-[#141414] hover:bg-[#1C1C1B] text-xs font-mono text-cream transition-all"
              >
                <span>Back to Public Site</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cream-dim" />
              </button>
            ) : (
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#07080A] text-xs font-medium tracking-wide hover:bg-neutral-200 transition-all shadow-md shadow-white/5 active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="uppercase tracking-wider text-[11px] font-semibold">GET IN TOUCH</span>
              </a>
            )}

            {/* Mobile / Tablet Hamburger Button */}
            {!isAdminPage && (
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden p-2 text-cream-muted hover:text-cream transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-cream"
                aria-label="Open navigation drawer"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        onNavigateAdmin={onNavigateAdmin}
      />
    </>
  );
};
