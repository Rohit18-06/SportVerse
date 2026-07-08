/**
 * SportsVerse Type Definitions
 */

// Sports
export type Sport = 'cricket' | 'football' | 'basketball' | 'tennis' | 'formula1' | 'baseball' | 'american-football'

// Match status
export type MatchStatus = 'live' | 'upcoming' | 'completed' | 'abandoned' | 'postponed'

// Cricket specific types
export interface CricketMatch {
  id: string
  eventId: string
  homeTeam: Team
  awayTeam: Team
  status: MatchStatus
  format: 'T20' | 'ODI' | 'Test' | 'T10' | 'Domestic'
  venue: Venue
  startTime: Date
  endTime?: Date
  tossWinner?: string
  tossDecision?: 'bat' | 'bowl'
  result?: MatchResult
  liveData?: LiveCricketData
  commentary?: CommentaryEvent[]
}

export interface Team {
  id: string
  name: string
  shortName: string
  logo: string
  country: string
}

export interface Venue {
  id: string
  name: string
  city: string
  country: string
  capacity?: number
  ground?: string
}

export interface LiveCricketData {
  batting: BattingTeamData
  bowling: BowlingTeamData
  currentRun: number
  currentWicket: number
  currentOver: number
  currentBall: number
  runRate?: number
  requiredRunRate?: number
  lastWicket?: WicketInfo
  winProbability?: {
    team1: number
    team2: number
  }
}

interface BattingTeamData {
  runs: number
  wickets: number
  overs: number
  balls: number
  runRate?: number
  batsmen: Batsman[]
  lastOver?: OverData
  partnership?: Partnership
}

export interface BowlingTeamData {
  bowlers: Bowler[]
}

export interface Batsman {
  id: string
  name: string
  role: 'batsman' | 'bowler' | 'all-rounder'
  runs: number
  ballsFaced: number
  fours: number
  sixes: number
  strikeRate: number
  isCurrentBatsman: boolean
  isBatting: boolean
}

export interface Bowler {
  id: string
  name: string
  role: 'bowler' | 'all-rounder'
  overs: number
  balls: number
  runs: number
  wickets: number
  economy: number
  isCurrentBowler: boolean
}

export interface OverData {
  over: number
  runs: number
  balls: Array<'0' | '1' | '2' | '3' | '4' | 'W' | 'Wd' | 'Nb'>
}

export interface Partnership {
  runs: number
  balls: number
}

export interface WicketInfo {
  batsmanId: string
  batsmanName: string
  howOut: string
  runs: number
  bowlerId: string
  bowlerName: string
  wicketNumber: number
}

export interface MatchResult {
  winner: string
  margin: string
  marginType: 'runs' | 'wickets' | 'super-over' | 'tie'
  playerOfTheMatch?: string
}

export interface CommentaryEvent {
  id: string
  over: number
  ball: number
  timestamp: Date
  text: string
  type: 'commentary' | 'wicket' | 'milestone' | 'stat' | 'news'
  runs?: number
  wicketInfo?: WicketInfo
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  timestamp: Date
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// User preferences
export interface UserPreferences {
  theme: 'dark' | 'light'
  sport: Sport
  language: string
  notifications: boolean
  favoriteTeams: string[]
  favoriteVenues: string[]
}

// Notification
export interface Notification {
  id: string
  title: string
  message: string
  type: 'match-start' | 'wicket' | 'milestone' | 'result' | 'news'
  matchId?: string
  timestamp: Date
  read: boolean
}
