// Experimental Design System — Tailwind Config
// Maps the 3-color token system into Tailwind utilities
// Load this AFTER the Tailwind CDN script

tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        pp: ['"PP Neue Montreal"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ── SOURCE COLORS ─────────────────────────
        orange: '#ec4e0b',
        dark:   '#141414',

        // ── SURFACE SCALE (derived from #141414) ──
        'bg-deep':   '#0a0a0a',
        'bg-base':   '#141414',
        'bg-raised': '#1c1c1c',
        'bg-panel':  '#222222',
        'bg-card':   '#2c2c2c',
        'bg-hover':  '#363636',

        // ── ORANGE SCALE (derived from #ec4e0b) ───
        'o-solid':  '#ec4e0b',
        'o-deep':   '#d14009',
      },
      borderRadius: {
        DEFAULT: '4px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      fontSize: {
        'xxs': ['10px', { lineHeight: '14px', letterSpacing: '0.1em' }],
      },
      keyframes: {
        'drop-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'ring-pulse': {
          '0%':   { boxShadow: '0 0 0 0 rgba(236,78,11,0.4)' },
          '60%':  { boxShadow: '0 0 0 6px rgba(236,78,11,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(236,78,11,0)' },
        },
      },
      animation: {
        'drop-in':    'drop-in 0.14s ease',
        'ring-pulse': 'ring-pulse 0.4s ease',
      },
    },
  },
};
