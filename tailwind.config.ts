import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pure monochrome — wearebrand.io style
        bg: '#000000',
        surface: '#0A0A0A',
        card: '#111111',
        line: 'rgba(255,255,255,0.12)',
        'line-soft': 'rgba(255,255,255,0.06)',
        ink: '#FFFFFF',
        'ink-soft': 'rgba(255,255,255,0.72)',
        dim: 'rgba(255,255,255,0.55)',
        'dim-2': 'rgba(255,255,255,0.35)',
        accent: '#22C55E',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['"League Spartan"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"League Spartan"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.035em',
      },
      animation: {
        'fade-up': 'fade-up 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.8s ease-out',
        'ken-burns': 'ken-burns 20s ease-out infinite alternate',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.15) translate(-2%, -1%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
