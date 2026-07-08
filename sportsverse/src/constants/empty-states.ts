/**
 * Shared empty state messages used across all cricket screens.
 * Use these constants to ensure consistent wording and tone.
 * When an API field is unavailable, show the corresponding empty state.
 */

export const EMPTY_STATES = {
  // Match Information - Genuinely unavailable from API
  TOSS_NOT_AVAILABLE: 'Toss information not available',
  VENUE_NOT_AVAILABLE: 'Venue details not available',
  WEATHER_NOT_AVAILABLE: 'Weather forecast not available',
  PREDICTION_NOT_AVAILABLE: 'Match prediction not available',
  COMMENTARY_NOT_AVAILABLE: 'Ball-by-ball commentary not available for this match',

  // Scoring Data - Empty when match not started or still in progress
  NO_BATTING_DATA: 'Batting scorecard will appear once the match starts',
  NO_BOWLING_DATA: 'Bowling scorecard will appear once the match starts',
  NO_WICKETS_DATA: 'Fall of wickets will appear once the match starts',
  NO_PARTNERSHIPS_DATA: 'Partnership data will appear once batting begins',
  NO_EXTRAS_DATA: 'Extras information will appear once the match starts',

  // Match Collections
  NO_LIVE_MATCHES: 'No live matches available',
  NO_UPCOMING_MATCHES: 'No upcoming matches scheduled',
  NO_RECENT_RESULTS: 'No recent match results available',
  NO_SEARCH_RESULTS: 'No matches found for your search',
  NO_NEWS: 'No news available',

  // Player/Team Data
  NO_PLAYER_NEWS: 'No player news available',
  NO_TEAM_NEWS: 'No team news available',
  NO_SQUAD_DATA: 'Squad information not available',
  NO_CAREER_STATS: 'Career statistics not available',

  // General Errors
  MATCH_NOT_FOUND: 'Match not found or could not be loaded',
  PLAYER_NOT_FOUND: 'Player not found or could not be loaded',
  TEAM_NOT_FOUND: 'Team not found or could not be loaded',
  TOURNAMENT_NOT_FOUND: 'Tournament not found or could not be loaded',
  LOAD_ERROR: 'Unable to load data. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
} as const

// Type for IDE autocomplete
export type EmptyStateKey = keyof typeof EMPTY_STATES

/**
 * Helper function to get empty state message with context
 * Usage: getEmptyStateMessage('NO_BATTING_DATA', 'batting')
 */
export function getEmptyStateMessage(key: EmptyStateKey): string {
  return EMPTY_STATES[key]
}

/**
 * Empty state messages grouped by category for easier discovery
 */
export const EMPTY_STATES_BY_CATEGORY = {
  API_LIMITATIONS: {
    TOSS_NOT_AVAILABLE: EMPTY_STATES.TOSS_NOT_AVAILABLE,
    VENUE_NOT_AVAILABLE: EMPTY_STATES.VENUE_NOT_AVAILABLE,
    WEATHER_NOT_AVAILABLE: EMPTY_STATES.WEATHER_NOT_AVAILABLE,
    PREDICTION_NOT_AVAILABLE: EMPTY_STATES.PREDICTION_NOT_AVAILABLE,
    COMMENTARY_NOT_AVAILABLE: EMPTY_STATES.COMMENTARY_NOT_AVAILABLE,
  },

  MATCH_NOT_STARTED: {
    NO_BATTING_DATA: EMPTY_STATES.NO_BATTING_DATA,
    NO_BOWLING_DATA: EMPTY_STATES.NO_BOWLING_DATA,
    NO_WICKETS_DATA: EMPTY_STATES.NO_WICKETS_DATA,
    NO_PARTNERSHIPS_DATA: EMPTY_STATES.NO_PARTNERSHIPS_DATA,
    NO_EXTRAS_DATA: EMPTY_STATES.NO_EXTRAS_DATA,
  },

  NOT_FOUND: {
    MATCH_NOT_FOUND: EMPTY_STATES.MATCH_NOT_FOUND,
    PLAYER_NOT_FOUND: EMPTY_STATES.PLAYER_NOT_FOUND,
    TEAM_NOT_FOUND: EMPTY_STATES.TEAM_NOT_FOUND,
    TOURNAMENT_NOT_FOUND: EMPTY_STATES.TOURNAMENT_NOT_FOUND,
  },

  ERROR: {
    LOAD_ERROR: EMPTY_STATES.LOAD_ERROR,
    NETWORK_ERROR: EMPTY_STATES.NETWORK_ERROR,
  },
} as const
