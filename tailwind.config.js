/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#07080A',
          subtle: '#0D0F14',
          card: '#10131B',
          elevated: '#171B26',
        },
        cream: {
          DEFAULT: '#F8FAFC',
          muted: '#94A3B8',
          dim: '#64748B',
          dark: '#334155',
        },
        border: {
          DEFAULT: '#1E2330',
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(56, 189, 248, 0.2)',
        },
        accent: {
          DEFAULT: '#38BDF8',
          gold: '#F59E0B',
          silver: '#94A3B8',
          cyan: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        editorial: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      letterSpacing: {
        'widest-editorial': '0.25em',
        'tighter-editorial': '-0.04em',
      }
    },
  },
  plugins: [],
}
