import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        slate: {
          950: 'var(--color-slate-950)',
          900: 'var(--color-slate-900)',
          700: 'var(--color-slate-700)',
        },
        appetite: {
          DEFAULT: 'var(--color-appetite)',
          dim: 'var(--color-appetite-dim)',
        },
        amber: 'var(--color-amber)',
        coral: 'var(--color-coral)',
        steel: 'var(--color-steel)',
        brand: 'var(--color-brand)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
      transitionDuration: {
        loop: '220ms',
        block: '180ms',
        alert: '240ms',
      },
    },
  },
  plugins: [],
};

export default config;
