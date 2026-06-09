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
          surface: '#0A1628',   // Primary Surface
          card: '#0F1F35',      // Elevated Surface
        },
        accent: {
          green: '#00FF87',     // Success
          red: '#FF3366',       // Danger
          amber: '#FFB800',     // Warning
          blue: '#00D4FF',      // Information
        },
        text: {
          primary: '#E8F4FD',   // Off-white/blue
          muted: '#7BA7C4',     // Secondary/muted text
          subtle: 'rgba(123, 167, 196, 0.4)', // Very muted
        }
      },
      fontFamily: {
        display: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 135, 0.1)',
        'glow-red': '0 0 20px rgba(255, 51, 102, 0.1)',
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.1)',
      }
    },
  },
  plugins: [],
} satisfies Config;
