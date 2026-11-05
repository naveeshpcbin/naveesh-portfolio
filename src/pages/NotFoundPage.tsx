import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onBackToHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <span className="font-mono text-xs text-cream-dim tracking-widest uppercase mb-3">
        404 &middot; SECTION NOT FOUND
      </span>
      <h1 className="text-4xl sm:text-5xl font-editorial font-light text-cream mb-4">
        Page Not Found
      </h1>
      <p className="text-sm text-cream-muted max-w-md mb-8 font-light">
        The requested URL does not exist or has been relocated within the portfolio structure.
      </p>
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream text-background text-xs font-mono font-medium hover:bg-cream-muted transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </button>
    </div>
  );
};
