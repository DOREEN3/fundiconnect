/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F766E',  // main teal
          dark: '#0D5F5B',     // hover / pressed
          light: '#14B8A6',    // links / highlights
          subtle: '#CCFBF1',   // teal tint backgrounds
          glow: '#2DD4BF',     // bright accent / badges
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F9FAFB',
          section: '#F3F4F6',
          dark: '#0F172A',     // dark sections / footer
          card: '#1E293B',     // dark cards
        },
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',    // placeholders / captions
          inverse: '#FFFFFF',
          teal: '#14B8A6',     // teal-colored text
        },
        accent: {
          subtle: '#E5E7EB',
          warm: '#F59E0B',     // amber warning / highlight
          danger: '#EF4444',   // errors / destructive
          success: '#10B981',  // success states
          info: '#3B82F6',     // info / links
        },
        surface: {
          DEFAULT: '#FFFFFF',
          raised: '#F8FAFC',   // slightly elevated cards
          overlay: '#1E293B',  // modals / drawers
          border: '#E2E8F0',   // consistent border color
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'teal': '0 4px 14px 0 rgba(15, 118, 110, 0.25)',
        'teal-lg': '0 8px 30px rgba(15, 118, 110, 0.3)',
        'card': '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        'card-hover': '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: [],
}