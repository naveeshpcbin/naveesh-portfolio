import React, { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Mail, Github, Linkedin, Youtube, Instagram, MessageSquare, Copy, Check, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { SocialLink } from '@/types/profile';
import { socialLinksService } from '@/services/social-links.service';

interface ContactSectionProps {
  email: string;
  onNavigateAdmin: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ email, onNavigateAdmin }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    socialLinksService.getAllLinks().then((links) => setSocialLinks(links));
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'whatsapp': return <MessageSquare className="w-5 h-5" />;
      default: return <Mail className="w-5 h-5" />;
    }
  };

  const configuredLinks = socialLinks.filter((l) => l.isConfigured && l.url.trim().length > 0);
  const unconfiguredLinks = socialLinks.filter((l) => !l.isConfigured || l.url.trim().length === 0);

  return (
    <footer id="contact" className="py-24 sm:py-32 bg-[#080807] text-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number="06"
          title="Direct Inquiries & Connections"
          subtitle="Open to technical dialogue on embedded systems, AI search architectures, semiconductor engineering, and collaborative ventures."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-border">
          {/* Email Callout Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl border border-border bg-[#111110] space-y-6">
            <span className="font-mono text-xs text-accent-gold uppercase tracking-widest block">
              PRIMARY DIRECT COMMUNICATION
            </span>

            <h3 className="text-2xl sm:text-3xl font-editorial font-light text-cream leading-tight">
              Let&apos;s build intelligent systems together.
            </h3>

            <p className="text-sm text-cream-muted leading-relaxed font-light">
              Feel free to reach out directly via email for engineering inquiries, research discussions, or project collaborations.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cream text-background text-sm font-mono font-medium hover:bg-cream-muted transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>{email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-border bg-[#181816] text-cream-muted hover:text-cream text-xs font-mono transition-all"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#6EE7B7]" />
                    <span className="text-[#6EE7B7]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Links List */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs text-cream-dim uppercase tracking-widest block">
              VERIFIED DESTINATIONS
            </span>

            <div className="space-y-3">
              {configuredLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-[#111110] hover:border-cream/30 hover:bg-[#161615] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-cream-dim group-hover:text-cream transition-colors">
                      {getIcon(link.platform)}
                    </span>
                    <div>
                      <span className="font-mono text-xs text-cream block">
                        {link.label}
                      </span>
                      <span className="font-mono text-[10px] text-cream-dim">
                        {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-cream-dim group-hover:text-cream group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>

            {/* Unconfigured notice */}
            {unconfiguredLinks.length > 0 && (
              <div className="p-4 rounded-xl border border-border/70 bg-[#0E0E0D] space-y-2">
                <span className="font-mono text-[10px] text-cream-dim uppercase tracking-wider block">
                  PENDING PROFILES ({unconfiguredLinks.length})
                </span>
                <p className="text-[11px] font-mono text-cream-dim leading-relaxed">
                  {unconfiguredLinks.map((l) => l.label).join(' &middot; ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Base Bar */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-cream-dim">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left">
            <span className="text-cream font-medium">NAVEESH &copy; 2026</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>ECE Undergraduate &middot; Thiagarajar College of Engineering</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#hero"
              className="text-cream-dim hover:text-cream transition-colors uppercase text-[11px]"
            >
              Back to Top &uarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
