import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stadium theme
        'stadium': {
          'black': '#0A0E27',
          'navy': '#0D1B3F',
        },
        // Accents
        'cyan': {
          'primary': '#00D9FF',
          'tint': 'rgba(0, 217, 255, 0.06)',
        },
        'gold': {
          'primary': '#FFD700',
          'tint': 'rgba(255, 215, 0, 0.04)',
        },
        'crimson': {
          'primary': '#FF3B5C',
        },
        'pitch': {
          'frost': '#E8F4F8',
        },
        'neutral': {
          'gray': '#6B7280',
        },
        // Sport-specific accents (used with data-sport attribute)
        'sport': {
          'cricket': '#00D9FF',
          'football': '#10B981',
          'basketball': '#FF8C42',
          'tennis': '#A3E635',
          'formula1': '#EF4444',
          'baseball': '#FBBF24',
          'american-football': '#3B82F6',
        },
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '48px',
      },
      fontFamily: {
        'display': ['Inter', ...defaultTheme.fontFamily.sans],
        'body': ['Inter', ...defaultTheme.fontFamily.sans],
        'mono': ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      backdropFilter: {
        'blur-sm': 'blur(4px)',
        'blur-md': 'blur(8px)',
        'blur-lg': 'blur(16px)',
        'blur-xl': 'blur(24px)',
      },
      boxShadow: {
        'glass-sm': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'glass-md': '0 8px 24px rgba(0, 0, 0, 0.5)',
        'glass-lg': '0 16px 40px rgba(0, 0, 0, 0.6)',
      },
      zIndex: {
        'dropdown': '10',
        'sticky': '20',
        'fixed': '30',
        'modal-backdrop': '40',
        'modal': '50',
        'popover': '60',
        'tooltip': '70',
      },
      animation: {
        'digit-flip': 'digit-flip 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'led-glow': 'led-glow 150ms ease-out',
        'illumination-flash': 'illumination-flash 100ms ease-out',
        'live-pulse': 'live-pulse 2.5s ease-in-out infinite',
        'skeleton-loading': 'skeleton-loading 2s infinite',
      },
      keyframes: {
        'digit-flip': {
          '0%': {
            transform: 'rotateY(0deg)',
            opacity: '1',
          },
          '50%': {
            transform: 'rotateY(-90deg)',
            opacity: '0.3',
          },
          '100%': {
            transform: 'rotateY(-180deg)',
            opacity: '1',
          },
        },
        'led-glow': {
          '0%': {
            textShadow: '0 0 0px rgba(0, 217, 255, 0)',
          },
          '50%': {
            textShadow: '0 0 12px rgba(0, 217, 255, 0.8)',
          },
          '100%': {
            textShadow: '0 0 0px rgba(0, 217, 255, 0)',
          },
        },
        'illumination-flash': {
          '0%, 100%': {
            color: '#E8F4F8',
          },
          '50%': {
            color: '#FFFFFF',
          },
        },
        'live-pulse': {
          '0%, 100%': {
            borderColor: 'rgba(0, 217, 255, 0.24)',
            opacity: '0.24',
          },
          '50%': {
            borderColor: 'rgba(0, 217, 255, 0.5)',
            opacity: '0.5',
          },
        },
        'skeleton-loading': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
        'slow': '300ms',
        'slowest': '500ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
