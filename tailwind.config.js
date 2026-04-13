/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0F766E',
          dark:    '#0D5F5B',
          light:   '#14B8A6',
          subtle:  '#CCFBF1',
          glow:    '#2DD4BF',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt:     '#F9FAFB',
          section: '#F3F4F6',
          dark:    '#0F172A',
          card:    '#1E293B',
        },
        text: {
          primary:   '#111827',
          secondary: '#4B5563',
          muted:     '#9CA3AF',
          inverse:   '#FFFFFF',
          teal:      '#14B8A6',
        },
        accent: {
          subtle:  '#E5E7EB',
          warm:    '#F59E0B',
          danger:  '#EF4444',
          success: '#10B981',
          info:    '#3B82F6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          raised:  '#F8FAFC',
          overlay: '#1E293B',
          border:  '#E2E8F0',
        },
      },
      boxShadow: {
        'teal':       '0 4px 14px 0 rgba(15,118,110,0.25)',
        'teal-lg':    '0 8px 30px rgba(15,118,110,0.3)',
        'teal-glow':  '0 8px 24px rgba(15,118,110,0.4)',
        'card':       '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        'card-hover': '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        'service':    '0 16px 40px rgba(15,118,110,0.18)',
        'orb':        '0 0 60px rgba(15,118,110,0.18)',
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '28px',
      },
      backdropBlur: {
        xs: '2px',
        sm: '6px',
      },
      keyframes: {
        orbitF: {
          to: { transform: 'rotate(360deg)' },
        },
        orbitR: {
          to: { transform: 'rotate(-360deg)' },
        },
        counterF: {
          to: { transform: 'rotate(-360deg)' },
        },
        counterR: {
          to: { transform: 'rotate(360deg)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)',    opacity: '0.3' },
          '100%': { transform: 'scale(1.18)', opacity: '0' },
        },
        floatOrb: {
          '0%,100%': { transform: 'translateY(0) rotateY(0deg)' },
          '50%':     { transform: 'translateY(-14px) rotateY(10deg)' },
        },
        shimmerText: {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        reveal: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        slideDown: {
          from: { maxHeight: '0', opacity: '0' },
          to:   { maxHeight: '200px', opacity: '1' },
        },
        topShine: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'orbit-f':    'orbitF var(--orbit-dur, 18s) linear infinite',
        'orbit-r':    'orbitR var(--orbit-dur, 30s) linear infinite',
        'counter-f':  'counterF var(--orbit-dur, 18s) linear infinite',
        'counter-r':  'counterR var(--orbit-dur, 30s) linear infinite',
        'pulse-ring': 'pulseRing 2.6s ease-out infinite',
        'float-orb':  'floatOrb 6s ease-in-out infinite',
        'shimmer-text':'shimmerText 4s linear infinite',
        'blink':       'blink 1.4s ease infinite',
        'fade-up':     'fadeUp 0.55s ease both',
        'fade-up-1':   'fadeUp 0.55s 0.08s ease both',
        'fade-up-2':   'fadeUp 0.55s 0.16s ease both',
        'fade-up-3':   'fadeUp 0.55s 0.22s ease both',
        'fade-up-4':   'fadeUp 0.55s 0.30s ease both',
        'slide-down':  'slideDown 0.35s ease forwards',
      },
    },
  },
  plugins: [],
}