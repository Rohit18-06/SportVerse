import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine Tailwind and clsx classes with proper merging
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format time ago (e.g., "2 hours ago")
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - new Date(date).getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return `${diffSecs}s ago`
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return new Date(date).toLocaleDateString()
}

/**
 * Format date to readable string (e.g., "Jan 15, 2026")
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format date and time (e.g., "Jan 15, 2026 at 14:30")
 */
export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format time (e.g., "14:30")
 */
export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Format number with commas (e.g., "1,000,000")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/**
 * Calculate strike rate (runs / balls faced * 100)
 */
export function calculateStrikeRate(runs: number, balls: number): number {
  if (balls === 0) return 0
  return (runs / balls) * 100
}

/**
 * Calculate economy rate (runs conceded / overs bowled)
 */
export function calculateEconomy(runs: number, overs: number): number {
  if (overs === 0) return 0
  return runs / overs
}

/**
 * Calculate run rate (runs / overs completed)
 */
export function calculateRunRate(runs: number, overs: number, balls: number): number {
  const totalBalls = overs * 6 + balls
  if (totalBalls === 0) return 0
  return (runs / totalBalls) * 6
}

/**
 * Calculate required run rate
 */
export function calculateRequiredRunRate(
  runsNeeded: number,
  ballsRemaining: number
): number {
  if (ballsRemaining === 0) return 0
  return (runsNeeded / ballsRemaining) * 6
}

/**
 * Parse overs and balls format (e.g., "47.2" => { overs: 47, balls: 2 })
 */
export function parseOvers(oversString: string): { overs: number; balls: number } {
  const [overs, balls] = oversString.split('.').map(Number)
  return {
    overs: overs || 0,
    balls: balls || 0,
  }
}

/**
 * Format overs to string format (e.g., { overs: 47, balls: 2 } => "47.2")
 */
export function formatOvers(overs: number, balls: number): string {
  return `${overs}.${balls}`
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Check if value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Check if running on mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 640
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

/**
 * Get sport accent color
 */
export function getSportColor(sport: string): string {
  const colors: Record<string, string> = {
    cricket: '#00D9FF',
    football: '#10B981',
    basketball: '#FF8C42',
    tennis: '#A3E635',
    formula1: '#EF4444',
    baseball: '#FBBF24',
    'american-football': '#3B82F6',
  }
  return colors[sport] || '#00D9FF'
}
