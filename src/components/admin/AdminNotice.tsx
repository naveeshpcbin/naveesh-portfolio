import React from 'react';
import { AlertTriangle, Database, ShieldAlert, Info } from 'lucide-react';

export const AdminNotice: React.FC = () => {
  return (
    <div className="mb-8 p-6 rounded-2xl border border-[#4A3E2D] bg-[#1E190E]/90 text-[#FDE047] space-y-3 shadow-xl">
      <div className="flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-[#FDE047] shrink-0" />
        <h3 className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
          DEMO MODE — CHANGES ARE LOCAL TO THIS BROWSER
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-[#FEF08A] leading-relaxed">
        This administration area is an interactive prototype for testing workflows (project editing, local file selection, document previews, publication controls, and link configuration).
        <strong> Production authentication and cloud storage are not yet active.</strong>
      </p>
      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#FDE047]/80 border-t border-[#4A3E2D]/60">
        <span className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5" />
          Data: LocalStorage Prototype Adapter
        </span>
        <span className="flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          Phase 2 Target: Supabase Auth &amp; Storage
        </span>
      </div>
    </div>
  );
};
