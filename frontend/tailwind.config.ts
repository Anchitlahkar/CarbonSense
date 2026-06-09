import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050A0E',   // Page Background
          surface: '#0B1220',   // Primary Surface
          card: '#111827',      // Elevated Surface
        },
        accent: {
          green: '#22C55E',     // Success
          red: '#EF4444',       // Danger
          amber: '#F59E0B',     // Warning
          blue: '#3B82F6',      // Information
        },
        text: {
          primary: '#FFFFFF',   // Pure white
          muted: '#7BA7C4',     // Secondary/muted text
          subtle: 'rgba(255, 255, 255, 0.5)', // Muted text
        }
      },
      fontFamily: {
        display: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.1)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.1)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.1)',
      }
    },
  },
  plugins: [],
} satisfies Config;
