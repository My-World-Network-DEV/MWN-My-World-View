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
          accent: 'var(--mwv-accent)',
          'accent-foreground': '#ffffff',
          success: 'var(--mwv-success)',
          error: 'var(--mwv-error)',
          muted: 'var(--mwv-muted)',
          card: 'var(--mwv-card)',
          border: 'var(--mwv-border)',
          ring: 'var(--mwv-ring)',
          background: 'var(--mwv-background)',
          foreground: 'var(--mwv-foreground)',
        },
        gray: {
          25: '#fcfcfd',
          75: '#f7f7f8',
          125: '#f2f4f7',
          275: '#e4e7ec',
          325: '#d0d5dd',
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
