import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, KeyRound, Terminal } from 'lucide-react';
import { authService } from '@/services/auth.service';

interface AdminAuthGateProps {
  onAuthenticated: () => void;
  onBackToSite: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({
  onAuthenticated,
  onBackToSite,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Check initial lockout state & setup countdown timer
  useEffect(() => {
    const checkLockout = () => {
      const status = authService.getLockoutStatus();
      if (status.isLockedOut) {
        setLockoutRemaining(status.remainingSeconds);
      } else {
        setLockoutRemaining(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || loading || lockoutRemaining > 0) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const result = await authService.login(password);
      if (result.success) {
        onAuthenticated();
      } else {
        setErrorMsg(result.error || 'Authentication failed. Access denied.');
        const status = authService.getLockoutStatus();
        if (status.isLockedOut) {
          setLockoutRemaining(status.remainingSeconds);
        }
      }
    } catch {
      setErrorMsg('An unexpected security exception occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-[#0284C7]/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#F59E0B]/5 blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO PORTFOLIO</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#64748B]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>SECURITY GATE V2.4</span>
        </div>
      </div>

      {/* Center Auth Card */}
      <div className="max-w-md w-full mx-auto my-auto z-10 py-8">
        <div className="rounded-2xl border border-white/10 bg-[#0C0E14]/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-black/80">
          
          {/* Security Icon & Terminal Badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-xl border border-[#38BDF8]/30 bg-[#0C1524] flex items-center justify-center text-[#38BDF8] shadow-lg shadow-[#38BDF8]/10">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-[#94A3B8] tracking-widest uppercase">
              <Terminal className="w-3 h-3 text-[#38BDF8]" />
              <span>RESTRICTED</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-bold font-editorial text-white tracking-tight">
              Administrative Console<span className="text-[#38BDF8]">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Restricted management portal for portfolio content, live telemetry, and project verification records.
            </p>
          </div>

          {/* Lockout Warning Banner */}
          {lockoutRemaining > 0 && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-950/30 text-red-300 text-xs font-mono flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Temporary Security Lock Active</p>
                <p className="text-red-300/80">
                  Multiple invalid passphrases detected. Console unlock in{' '}
                  <span className="font-bold text-white">{lockoutRemaining}s</span>.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && lockoutRemaining === 0 && (
            <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-950/30 text-amber-300 text-xs font-mono flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-passphrase"
                className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2"
              >
                Master Passphrase
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                  <Lock className="w-4 h-4" />
                </div>

                <input
                  id="admin-passphrase"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || lockoutRemaining > 0}
                  placeholder="Enter administrator passphrase"
                  autoComplete="current-password"
                  autoFocus
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-white/10 bg-[#07080A] text-white text-sm placeholder:text-[#475569] focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password.trim() || lockoutRemaining > 0}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-[#07080A] font-medium text-sm hover:bg-neutral-200 transition-all shadow-lg shadow-white/10 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#07080A] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authorize &amp; Unlock Console</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice Note */}
          <div className="mt-8 pt-6 border-t border-white/5 text-[11px] font-mono text-[#64748B] leading-relaxed">
            <span className="text-[#94A3B8] font-semibold block mb-1">
              HOSTING &amp; PRIVACY NOTICE
            </span>
            Access is restricted to Naveesh. Session automatically terminates on browser exit. Master passphrase is confirmed against environment configuration.
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-md w-full mx-auto text-center text-xs font-mono text-[#475569] z-10">
        Naveesh Portfolio Infrastructure &middot; Thiagarajar College of Engineering
      </div>
    </div>
  );
};
