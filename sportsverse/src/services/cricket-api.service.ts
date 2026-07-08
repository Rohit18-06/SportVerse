/**
 * Cricket Data Service
 * Integrates with real cricket data providers for live scores
 * Supports: Highlightly Cricket API, RapidAPI, EntitySport, Sportmonks
 * 
 * API Documentation:
 * - Highlightly: https://cricket.highlightly.net
 * - RapidAPI: https://rapidapi.com/api-sports/api/api-cricket
 */

export interface LiveMatch {
  id: string
  homeTeam: {
    name: string
    shortName: string
    logo?: string
  }
  awayTeam: {
    name: string
    shortName: string
    logo?: string
  }
  status: 'live' | 'upcoming' | 'completed'
  score: {
    home: number
    away: number
    homeWickets?: number
    awayWickets?: number
  }
  overs?: {
    current: number
    total: number
  }
  venue?: string
  format: 'T20' | 'ODI' | 'Test'
  series?: string
  startTime?: Date
}

export interface CricketApiResponse {
  success: boolean
  data?: unknown
  error?: string
}

// Get API configuration from environment
const API_PROVIDER = process.env.NEXT_PUBLIC_CRICKET_API_PROVIDER || 'highlightly'
const API_KEY = process.env.CRICKET_API_KEY
const API_TIMEOUT = Number(process.env.CRICKET_API_TIMEOUT || '10000')
const ENABLE_REAL_DATA = process.env.ENABLE_REAL_CRICKET_DATA === 'true'

// API endpoints
const HIGHLIGHTLY_BASE = 'https://cricket.highlightly.net'
const RAPIDAPI_HOST = 'api-cricket.p.rapidapi.com'
const RAPIDAPI_BASE = `https://${RAPIDAPI_HOST}`

/**
 * Helper to make API requests with timeout and error handling
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

/**
 * Get all live matches
 * Fetches from configured cricket API provider
 */
export async function getLiveMatches(): Promise<LiveMatch[]> {
  try {
    if (!ENABLE_REAL_DATA || !API_KEY) {
      console.log('Cricket API: Real data disabled or API key not configured')
      return []
    }

    let url = ''
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Configure request based on API provider
    if (API_PROVIDER === 'rapidapi') {
      url = `${RAPIDAPI_BASE}/matches?status=live`
      headers['x-rapidapi-host'] = RAPIDAPI_HOST
      headers['x-rapidapi-key'] = API_KEY
    } else {
      // Default: Highlightly
      url = `${HIGHLIGHTLY_BASE}/matches?status=live`
      headers['Authorization'] = `Bearer ${API_KEY}`
    }

    const response = await fetchWithTimeout(url, { headers })

    if (!response.ok) {
      console.error(`Cricket API error: ${response.status} ${response.statusText}`)
      return []
    }

    const data = await response.json()

    // Handle different response formats from different providers
    if (data.response && Array.isArray(data.response)) {
      return data.response.slice(0, 10) // Limit to 10 matches
    }

    if (data.matches && Array.isArray(data.matches)) {
      return data.matches.slice(0, 10)
    }

    if (Array.isArray(data)) {
      return data.slice(0, 10)
    }

    console.warn('Unexpected API response format:', data)
    return []
  } catch (error) {
    console.error('Failed to fetch live matches:', error)
    return []
  }
}

/**
 * Get match details and scorecard
 */
export async function getMatchDetails(matchId: string): Promise<CricketApiResponse> {
  try {
    if (!ENABLE_REAL_DATA || !API_KEY) {
      return { success: false, error: 'Real data disabled or API key not configured' }
    }

    let url = ''
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (API_PROVIDER === 'rapidapi') {
      url = `${RAPIDAPI_BASE}/matches?id=${matchId}`
      headers['x-rapidapi-host'] = RAPIDAPI_HOST
      headers['x-rapidapi-key'] = API_KEY
    } else {
      url = `${HIGHLIGHTLY_BASE}/matches/${matchId}`
      headers['Authorization'] = `Bearer ${API_KEY}`
    }

    const response = await fetchWithTimeout(url, { headers })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error(`Failed to fetch match details for ${matchId}:`, error)
    return { success: false, error: String(error) }
  }
}

/**
 * Get upcoming matches
 */
export async function getUpcomingMatches(date?: Date): Promise<LiveMatch[]> {
  try {
    if (!ENABLE_REAL_DATA || !API_KEY) {
      console.log('Cricket API: Real data disabled or API key not configured')
      return []
    }

    let url = ''
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Format date if provided (YYYY-MM-DD)
    const dateStr = date ? date.toISOString().split('T')[0] : ''

    if (API_PROVIDER === 'rapidapi') {
      url = `${RAPIDAPI_BASE}/matches?status=upcoming${dateStr ? `&date=${dateStr}` : ''}`
      headers['x-rapidapi-host'] = RAPIDAPI_HOST
      headers['x-rapidapi-key'] = API_KEY
    } else {
      url = `${HIGHLIGHTLY_BASE}/matches?status=upcoming${dateStr ? `&date=${dateStr}` : ''}`
      headers['Authorization'] = `Bearer ${API_KEY}`
    }

    const response = await fetchWithTimeout(url, { headers })

    if (!response.ok) {
      console.error(`Cricket API error: ${response.status}`)
      return []
    }

    const data = await response.json()

    if (data.response && Array.isArray(data.response)) {
      return data.response.slice(0, 20)
    }

    if (data.matches && Array.isArray(data.matches)) {
      return data.matches.slice(0, 20)
    }

    if (Array.isArray(data)) {
      return data.slice(0, 20)
    }

    return []
  } catch (error) {
    console.error('Failed to fetch upcoming matches:', error)
    return []
  }
}

/**
 * Get completed matches (recent results)
 */
export async function getResults(limit = 10): Promise<LiveMatch[]> {
  try {
    if (!ENABLE_REAL_DATA || !API_KEY) {
      console.log('Cricket API: Real data disabled or API key not configured')
      return []
    }

    let url = ''
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (API_PROVIDER === 'rapidapi') {
      url = `${RAPIDAPI_BASE}/matches?status=completed&limit=${limit}`
      headers['x-rapidapi-host'] = RAPIDAPI_HOST
      headers['x-rapidapi-key'] = API_KEY
    } else {
      url = `${HIGHLIGHTLY_BASE}/matches?status=completed&limit=${limit}`
      headers['Authorization'] = `Bearer ${API_KEY}`
    }

    const response = await fetchWithTimeout(url, { headers })

    if (!response.ok) {
      console.error(`Cricket API error: ${response.status}`)
      return []
    }

    const data = await response.json()

    if (data.response && Array.isArray(data.response)) {
      return data.response.slice(0, limit)
    }

    if (data.matches && Array.isArray(data.matches)) {
      return data.matches.slice(0, limit)
    }

    if (Array.isArray(data)) {
      return data.slice(0, limit)
    }

    return []
  } catch (error) {
    console.error('Failed to fetch results:', error)
    return []
  }
}

/**
 * Get cricket news
 */
export async function getCricketNews(): Promise<unknown[]> {
  try {
    if (!ENABLE_REAL_DATA || !API_KEY) {
      console.log('Cricket API: Real data disabled or API key not configured')
      return []
    }

    let url = ''
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (API_PROVIDER === 'rapidapi') {
      url = `${RAPIDAPI_BASE}/news?type=cricket&limit=20`
      headers['x-rapidapi-host'] = RAPIDAPI_HOST
      headers['x-rapidapi-key'] = API_KEY
    } else {
      url = `${HIGHLIGHTLY_BASE}/news?type=cricket&limit=20`
      headers['Authorization'] = `Bearer ${API_KEY}`
    }

    const response = await fetchWithTimeout(url, { headers })

    if (!response.ok) {
      console.error(`Cricket API error: ${response.status}`)
      return []
    }

    const data = await response.json()

    if (data.articles && Array.isArray(data.articles)) {
      return data.articles.slice(0, 20)
    }

    if (data.news && Array.isArray(data.news)) {
      return data.news.slice(0, 20)
    }

    if (Array.isArray(data)) {
      return data.slice(0, 20)
    }

    return []
  } catch (error) {
    console.error('Failed to fetch cricket news:', error)
    return []
  }
}

/**
 * Check if real data is configured and available
 */
export function isRealDataConfigured(): boolean {
  return ENABLE_REAL_DATA && !!API_KEY
}
