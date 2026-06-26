import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-card-light': 'var(--bg-card-light)',
        'bg-card-dark': 'var(--bg-card-dark)',
        'bg-card-mid': 'var(--bg-card-mid)',
        'bg-input': 'var(--bg-input)',
        'accent-gold': 'var(--accent-gold)',
        'accent-gold-light': 'var(--accent-gold-light)',
        'accent-gold-dark': 'var(--accent-gold-dark)',
        'accent-gold-muted': 'var(--accent-gold-muted)',
        'accent-green': 'var(--accent-green)',
        'accent-green-light': 'var(--accent-green-light)',
        'accent-green-dark': 'var(--accent-green-dark)',
        'accent-green-muted': 'var(--accent-green-muted)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-on-dark': 'var(--text-on-dark)',
        'text-on-gold': 'var(--text-on-gold)',
        'color-urgent': 'var(--color-urgent)',
        'color-urgent-bg': 'var(--color-urgent-bg)',
        'color-warning': 'var(--color-warning)',
        'color-warning-bg': 'var(--color-warning-bg)',
        'color-success': 'var(--color-success)',
        'color-success-bg': 'var(--color-success-bg)',
        'color-info': 'var(--color-info)',
        'color-info-bg': 'var(--color-info-bg)',
      },
      borderRadius: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
        'pill': '999px',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'dark': 'var(--shadow-dark)',
        'button': 'var(--shadow-button)',
        'float': 'var(--shadow-float)',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
    }
  },
  plugins: [tailwindcssAnimate],
};

export default config;
