/**
 * Cricket Data API Service
 * Communicates with SportsVerse backend at http://localhost:8000
 * All data comes from Highlightly real cricket API
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
  timestamp: string
}

// ==================== REAL HIGHLIGHTLY API TYPES ====================

export interface BatterRecord {
  player: {
    id: string
    name: string
    battingStyles: string[]
    bowlingStyles: string[]
    roles: string[]
  }
  runs: number
  balls: number
  fours: number
  sixes: number
  dismissalStatus: string
  battingStrikeRate: number
  dismissalFielders: Array<{
    name: string
    isKeeper?: boolean
    isSubstitute?: boolean
  }>
}

export interface BowlerRecord {
  player: {
    name: string
    battingStyles: string[]
    bowlingStyles: string[]
    roles: string[]
  }
  overs: number
  wickets: number
  concededRuns: number
  economy: number
  maidens: number
}

export interface WicketRecord {
  order: number
  runs: number
  overs: number
  dismissalBatsman: {
    name: string
  }
}

export interface PartnershipRecord {
  runs: number
  balls: number
  overs: number
  firstPlayer: { id: string; name: string }
  secondPlayer: { id: string; name: string }
  firstPlayerRuns: number
  firstPlayerBalls: number
  secondPlayerRuns: number
  secondPlayerBalls: number
}

export interface InningStatistics {
  inningNumber: number
  team: {
    id: number
    name: string
    abbreviation: string
    logo: string
    byes: number
    legByes: number
    wides: number
    noBalls: number
    extras: number
    fours?: number | null
    sixes?: number | null
  }
  inningBatsmen: BatterRecord[]
  inningBowlers: BowlerRecord[]
  fallOfWickets: WicketRecord[]
  inningPartnerships: PartnershipRecord[]
  fieldingSummary?: {
    catches: number | null
    runOuts: number | null
    stumpings: number | null
    runsSaved: number | null
    catchesDropped: number | null
  }
}

export interface SquadInfo {
  team: {
    id: number
    name: string
    abbreviation: string
    logo: string
  }
  players: Array<{
    name: string
    battingStyles: string[]
    bowlingStyles: string[]
    roles: string[]
  }>
}

export interface BestPerformer {
  team: {
    id: number
    name: string
    abbreviation: string
    logo: string
  }
  players: Array<{
    name: string
    statistics: Record<string, unknown>
  }>
}

export interface HighlightlyMatch {
  id: string
  startDate: string
  startTime: string
  endDate: string
  format: string
  dayType: string
  country: {
    code: string
    name: string
    logo: string
  }
  homeTeam: {
    id: string | number
    name: string
    abbreviation: string
    logo: string
  }
  awayTeam: {
    id: string | number
    name: string
    abbreviation: string
    logo: string
  }
  state: {
    description: string
    report?: string
    teams: {
      home: {
        score: string
        info: string | null
      }
      away: {
        score: string
        info: string | null
      }
    }
  }
  league: {
    id: string | number
    name: string
    season?: number
    logo?: string | null
  }
  venue: {
    name: string | null
    city: string | null
    country: string | null
    capacity: string | null
  }
  forecast: {
    status: string | null
    temperature: string | null
  }
  predictions: unknown | null
  statistics: InningStatistics[]
  squad: SquadInfo[]
  bestBatsmen?: BestPerformer[]
  bestBowlers?: BestPerformer[]
}

// ==================== LEGACY SIMPLIFIED TYPES ====================

export interface Match {
  id: string
  external_id?: string
  homeTeam: {
    id?: string
    name: string
    shortName?: string
    logo?: string
  }
  awayTeam: {
    id?: string
    name: string
    shortName?: string
    logo?: string
  }
  status: 'live' | 'upcoming' | 'completed' | 'abandoned'
  format: string
  venue?: {
    id?: string
    name?: string
    city?: string
    country?: string
  }
  league?: {
    id?: string
    name: string
  }
  series?: {
    id?: string
    name?: string
  }
  matchDate?: string
  startTime?: string
  liveData?: {
    homeTeam?: {
      score?: string
      info?: string
    }
    awayTeam?: {
      score?: string
      info?: string
    }
    description?: string
    report?: string
  }
  scorecard?: unknown
  commentary?: unknown
}


// ==================== API FUNCTIONS ====================

export async function getLiveMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/live`)
    if (!response.ok) throw new Error(`Failed to fetch live matches: ${response.status}`)
    const data: ApiResponse<Match[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching live matches:', error)
    return []
  }
}

export async function getTodayMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/today`)
    if (!response.ok) throw new Error(`Failed to fetch today's matches: ${response.status}`)
    const data: ApiResponse<Match[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching today\'s matches:', error)
    return []
  }
}

export async function getUpcomingMatches(days: number = 7): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/upcoming?days=${days}`)
    if (!response.ok) throw new Error(`Failed to fetch upcoming matches: ${response.status}`)
    const data: ApiResponse<Match[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching upcoming matches:', error)
    return []
  }
}

export async function getResults(limit: number = 20): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/results?limit=${limit}`)
    if (!response.ok) throw new Error(`Failed to fetch results: ${response.status}`)
    const data: ApiResponse<Match[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching results:', error)
    return []
  }
}

export async function getMatchDetails(matchId: string): Promise<HighlightlyMatch | null> {
  try {
    const response = await fetch(`${API_BASE}/cricket/match/${matchId}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Failed to fetch match details: ${response.status}`)
    }
    const data: ApiResponse<HighlightlyMatch> = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching match details:', error)
    return null
  }
}

export async function getSeries(seriesId: string): Promise<Match | null> {
  try {
    const response = await fetch(`${API_BASE}/cricket/series/${seriesId}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Failed to fetch series details: ${response.status}`)
    }
    const data: ApiResponse<Match> = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching series:', error)
    return null
  }
}

export async function getSeriesMatches(seriesId: string, status: string = 'all'): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/series/${seriesId}/matches?status=${status}`)
    if (!response.ok) throw new Error(`Failed to fetch series matches: ${response.status}`)
    const data: ApiResponse<Match[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching series matches:', error)
    return []
  }
}

export async function getStandings(seriesId: string): Promise<unknown[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/standings/${seriesId}`)
    if (!response.ok) throw new Error(`Failed to fetch standings: ${response.status}`)
    const data: ApiResponse<unknown[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching standings:', error)
    return []
  }
}

export async function getNews(limit: number = 20): Promise<unknown[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/news?limit=${limit}`)
    if (!response.ok) throw new Error(`Failed to fetch news: ${response.status}`)
    const data: ApiResponse<unknown[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export async function searchCricket(query: string): Promise<{
  matches: Match[]
  players: unknown[]
  teams: unknown[]
  news: unknown[]
}> {
  try {
    const response = await fetch(`${API_BASE}/cricket/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) throw new Error(`Failed to search: ${response.status}`)
    const data: ApiResponse<{
      matches: Match[]
      players: unknown[]
      teams: unknown[]
      news: unknown[]
    }> = await response.json()
    return data.data || { matches: [], players: [], teams: [], news: [] }
  } catch (error) {
    console.error('Error searching cricket data:', error)
    return { matches: [], players: [], teams: [], news: [] }
  }
}

export async function getTeam(teamId: string): Promise<unknown> {
  try {
    const response = await fetch(`${API_BASE}/cricket/team/${teamId}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Failed to fetch team: ${response.status}`)
    }
    const data: ApiResponse<unknown> = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching team:', error)
    return null
  }
}

export async function getTeamSquad(teamId: string): Promise<unknown[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/team/${teamId}/squad`)
    if (!response.ok) throw new Error(`Failed to fetch team squad: ${response.status}`)
    const data: ApiResponse<unknown[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching team squad:', error)
    return []
  }
}

export async function getTeamFixtures(teamId: string): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/team/${teamId}/fixtures`)
    if (!response.ok) throw new Error(`Failed to fetch team fixtures: ${response.status}`)
    const data: ApiResponse<Match[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching team fixtures:', error)
    return []
  }
}

export async function getTeamResults(teamId: string): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/team/${teamId}/results`)
    if (!response.ok) throw new Error(`Failed to fetch team results: ${response.status}`)
    const data: ApiResponse<Match[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching team results:', error)
    return []
  }
}

export async function getTeamNews(teamId: string): Promise<unknown[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/team/${teamId}/news`)
    if (!response.ok) throw new Error(`Failed to fetch team news: ${response.status}`)
    const data: ApiResponse<unknown[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching team news:', error)
    return []
  }
}

export async function getPlayer(playerId: string): Promise<unknown> {
  try {
    const response = await fetch(`${API_BASE}/cricket/player/${playerId}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Failed to fetch player: ${response.status}`)
    }
    const data: ApiResponse<unknown> = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching player:', error)
    return null
  }
}

export async function getPlayerCareer(playerId: string): Promise<unknown> {
  try {
    const response = await fetch(`${API_BASE}/cricket/player/${playerId}/career`)
    if (!response.ok) throw new Error(`Failed to fetch player career: ${response.status}`)
    const data: ApiResponse<unknown> = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching player career:', error)
    return null
  }
}

export async function getPlayerMatches(playerId: string): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/player/${playerId}/matches`)
    if (!response.ok) throw new Error(`Failed to fetch player matches: ${response.status}`)
    const data: ApiResponse<Match[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching player matches:', error)
    return []
  }
}

export async function getPlayerStatistics(playerId: string): Promise<unknown> {
  try {
    const response = await fetch(`${API_BASE}/cricket/player/${playerId}/statistics`)
    if (!response.ok) throw new Error(`Failed to fetch player statistics: ${response.status}`)
    const data: ApiResponse<unknown> = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching player statistics:', error)
    return null
  }
}

export async function getPlayerNews(playerId: string): Promise<unknown[]> {
  try {
    const response = await fetch(`${API_BASE}/cricket/player/${playerId}/news`)
    if (!response.ok) throw new Error(`Failed to fetch player news: ${response.status}`)
    const data: ApiResponse<unknown[]> = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching player news:', error)
    return []
  }
}


// Alias for compatibility
export const getCricketNews = getNews
