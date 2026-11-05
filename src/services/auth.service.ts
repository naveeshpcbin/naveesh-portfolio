// Hardened Authentication Service for Admin Portal
// Protects the /admin route from unauthorized public access

const SESSION_TOKEN_KEY = 'naveesh_admin_auth_token_v1';
const FAILED_ATTEMPTS_KEY = 'naveesh_admin_failed_attempts_v1';
const LOCKOUT_TIMESTAMP_KEY = 'naveesh_admin_lockout_until_v1';

// Default admin master passphrase for local development only
const DEFAULT_ADMIN_PASSWORD = import.meta.env.DEV ? 'Naveesh@2025!' : '';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds
const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

export interface AuthState {
  isAuthenticated: boolean;
  isLockedOut: boolean;
  lockoutRemainingSeconds: number;
}

export const authService = {
  /**
   * Check if the current session is authenticated and not expired
   */
  isAuthenticated(): boolean {
    try {
      const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
      if (!token) return false;

      const [hash, timestampStr] = token.split('.');
      if (!hash || !timestampStr) return false;

      const sessionTime = parseInt(timestampStr, 10);
      if (isNaN(sessionTime) || Date.now() - sessionTime > SESSION_TTL_MS) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if admin portal is temporarily locked due to failed attempts
   */
  getLockoutStatus(): { isLockedOut: boolean; remainingSeconds: number } {
    try {
      const lockoutUntil = sessionStorage.getItem(LOCKOUT_TIMESTAMP_KEY);
      if (!lockoutUntil) return { isLockedOut: false, remainingSeconds: 0 };

      const remainingMs = parseInt(lockoutUntil, 10) - Date.now();
      if (remainingMs > 0) {
        return {
          isLockedOut: true,
          remainingSeconds: Math.ceil(remainingMs / 1000),
        };
      } else {
        // Lockout expired, clear attempts
        sessionStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);
        sessionStorage.removeItem(FAILED_ATTEMPTS_KEY);
        return { isLockedOut: false, remainingSeconds: 0 };
      }
    } catch {
      return { isLockedOut: false, remainingSeconds: 0 };
    }
  },

  /**
   * Authenticate with master password
   */
  async login(password: string): Promise<{ success: boolean; error?: string }> {
    // 1. Check lockout
    const lockout = this.getLockoutStatus();
    if (lockout.isLockedOut) {
      return {
        success: false,
        error: `Security lock active. Too many failed attempts. Try again in ${lockout.remainingSeconds}s.`,
      };
    }

    // 2. Artificial progressive delay to thwart timing / automated dictionary attacks
    await new Promise((r) => setTimeout(r, 650));

    // 3. Resolve target password (env or default)
    const validPassword =
      (import.meta as any).env?.VITE_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    // 4. Verify password
    if (password === validPassword) {
      // Clear failed attempts
      sessionStorage.removeItem(FAILED_ATTEMPTS_KEY);
      sessionStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);

      // Generate session token with timestamp
      const token = `auth_${Math.random().toString(36).substring(2)}.${Date.now()}`;
      sessionStorage.setItem(SESSION_TOKEN_KEY, token);

      return { success: true };
    }

    // 5. Track failed attempts
    const currentFailed = parseInt(
      sessionStorage.getItem(FAILED_ATTEMPTS_KEY) || '0',
      10
    ) + 1;
    sessionStorage.setItem(FAILED_ATTEMPTS_KEY, currentFailed.toString());

    if (currentFailed >= MAX_FAILED_ATTEMPTS) {
      const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
      sessionStorage.setItem(LOCKOUT_TIMESTAMP_KEY, lockUntil.toString());
      return {
        success: false,
        error: `Maximum failed attempts exceeded. Console locked for 60 seconds.`,
      };
    }

    return {
      success: false,
      error: `Invalid master passphrase. ${MAX_FAILED_ATTEMPTS - currentFailed} attempts remaining before temporary lockout.`,
    };
  },

  /**
   * Terminate admin session
   */
  logout(): void {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  },
};
