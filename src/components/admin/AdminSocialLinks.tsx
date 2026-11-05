import React, { useState } from 'react';
import { SocialLink } from '@/types/profile';
import { socialLinksService } from '@/services/social-links.service';
import { Check, ExternalLink, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminSocialLinksProps {
  socialLinks: SocialLink[];
  onRefresh: () => void;
}

export const AdminSocialLinks: React.FC<AdminSocialLinksProps> = ({ socialLinks, onRefresh }) => {
  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleUrlChange = (id: string, url: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, url, isConfigured: url.trim().length > 0 } : l))
    );
  };

  const handleSaveLink = async (link: SocialLink) => {
    await socialLinksService.updateLink(link.id, {
      url: link.url,
      isConfigured: link.url.trim().length > 0,
    });
    showFeedback(`Saved ${link.label} (${link.url.trim().length > 0 ? 'Configured' : 'Unconfigured'}).`);
    onRefresh();
  };

  const handleReset = async () => {
    if (confirm('Reset social links to site config defaults?')) {
      const def = await socialLinksService.resetLinks();
      setLinks(def);
      showFeedback('Social links reset.');
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-[#141413]">
        <div>
          <h3 className="font-editorial text-lg text-cream font-medium">
            Social &amp; Destination Links
          </h3>
          <p className="text-xs font-mono text-cream-dim">
            Configure external profiles. Missing or empty links remain unconfigured without breaking navigation.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-lg border border-border hover:bg-[#1E1E1C] text-cream-dim hover:text-cream transition-colors text-xs font-mono flex items-center gap-1.5 self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-[#0E1F18] border border-[#2D4A3E] text-[#6EE7B7] text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="space-y-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="p-5 rounded-xl border border-border bg-[#121211] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 sm:w-1/3">
              <div className="flex items-center gap-2">
                <span className="font-editorial text-base text-cream font-medium">
                  {link.label}
                </span>
                {link.isConfigured && link.url.trim().length > 0 ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#6EE7B7] bg-[#0E1F18] px-2 py-0.5 rounded border border-[#2D4A3E]">
                    <ShieldCheck className="w-3 h-3" />
                    Configured
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cream-dim bg-[#1A1A18] px-2 py-0.5 rounded border border-border">
                    <AlertCircle className="w-3 h-3" />
                    Unconfigured
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] text-cream-dim uppercase block">
                Platform: {link.platform}
              </span>
            </div>

            <div className="flex-1 flex items-center gap-3">
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleUrlChange(link.id, e.target.value)}
                placeholder={`Enter ${link.label} URL...`}
                className="w-full px-3 py-2 rounded-lg bg-[#181816] border border-border text-cream font-mono text-xs focus:border-cream/50 outline-none"
              />

              {link.url && link.url.trim().length > 0 && (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border bg-[#181816] text-cream-dim hover:text-cream transition-colors"
                  title="Test Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={() => handleSaveLink(link)}
                className="px-4 py-2 rounded-lg bg-[#1D1D1B] border border-border hover:border-cream/40 text-cream text-xs font-mono transition-all shrink-0"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
