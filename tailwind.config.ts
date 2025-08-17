import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mwv: {
          primary: '#2563eb',
          'primary-foreground': '#ffffff',
          muted: 'var(--mwv-muted)',
          card: 'var(--mwv-card)',
          border: 'var(--mwv-border)',
          ring: 'var(--mwv-ring)',
          background: 'var(--mwv-background)',
          foreground: 'var(--mwv-foreground)',
        },
      },
      spacing: {
        18: '4.5rem', // 72px helper for 8pt scale
      },
      fontSize: {
        '2.5xl': ['1.75rem', { lineHeight: '2rem' }],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'card-hover': '0 2px 8px 0 rgb(0 0 0 / 0.08)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
