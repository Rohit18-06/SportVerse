/**
 * SportsVerse Design Tokens v2
 * Source of truth for all design values
 */

// Colors - Premium sports app aesthetic
export const colors = {
  // Background - Deep, premium dark
  background: {
    primary: '#080B14',    // Dark background
    secondary: '#111827',  // Card background
    tertiary: '#1A1F2E',   // Hover state
  },
  // Text - High contrast white
  text: {
    primary: '#FFFFFF',    // Main text
    secondary: '#A1A1AA',  // Secondary text
    tertiary: '#727280',   // Tertiary text
  },
  // Accent - Electric cyan for live and important
  accent: {
    primary: '#00D9FF',    // Live indicator, active states
    hover: '#00B8D4',      // Hover state
    muted: 'rgba(0, 217, 255, 0.15)',
  },
  // Status colors
  status: {
    live: '#00D9FF',       // Live matches
    upcoming: '#A1A1AA',   // Upcoming
    completed: '#727280',  // Completed
    success: '#22C55E',    // Success state
    warning: '#F59E0B',    // Warning state
    error: '#EF4444',      // Error state
  },
  // Sport-specific accents
  sport: {
    cricket: '#00D9FF',
    football: '#10B981',
    basketball: '#FF8C42',
    tennis: '#A3E635',
    formula1: '#EF4444',
    baseball: '#FBBF24',
    americanFootball: '#3B82F6',
  },
  // Borders and dividers
  border: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(255, 255, 255, 0.15)',
  },
} as const

// Spacing scale (8px base unit)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
} as const

// Border radius scale
export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const

// Icon sizes
export const iconSize = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  '2xl': '64px',
} as const

// Glass system
export const glass = {
  // Blur radius
  blur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
  // Opacity layers
  opacity: {
    primary: 0.12,
    secondary: 0.08,
    hover: 0.18,
    overlay: 0.18,
  },
  // Border opacity
  borderOpacity: {
    light: 0.16,
    medium: 0.24,
    dark: 0.32,
  },
  // Shadows
  shadow: {
    sm: '0 4px 12px rgba(0, 0, 0, 0.4)',
    md: '0 8px 24px rgba(0, 0, 0, 0.5)',
    lg: '0 16px 40px rgba(0, 0, 0, 0.6)',
  },
  // Saturation
  saturate: 1.1,
  // Noise opacity
  noise: 0.02,
} as const

// Z-index scale
export const zIndex = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const

// Animation
export const animation = {
  // Durations
  duration: {
    fast: '100ms',
    base: '200ms',
    slow: '300ms',
    slowest: '500ms',
  },
  // Easing curves
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

// Responsive breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '1024px',
  lg: '1280px',
  xl: '1536px',
} as const

// Typography scale
export const fontSize = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '48px',
} as const

// Font families
export const fontFamily = {
  display: 'Inter',
  body: 'Inter',
  mono: 'IBM Plex Mono',
} as const

// Grid system
export const grid = {
  columns: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
  gap: {
    mobile: '8px',
    tablet: '12px',
    desktop: '16px',
  },
  margin: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
} as const
