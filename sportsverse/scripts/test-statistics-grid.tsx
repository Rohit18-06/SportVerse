/**
 * Test harness for statistics-grid.tsx
 * Verifies component renders correctly with real-shaped data
 */

import { StatisticsGrid } from '@/components/features/match-details/statistics-grid'
import type { HighlightlyMatch } from '@/services/api/cricket'

// Sample match data matching actual Highlightly API response shape
const FIXTURE_MATCH: HighlightlyMatch = {
  id: 'test-match-001',
  startDate: '2026-07-07',
  startTime: '2026-07-07T14:30:00Z',
  endDate: '2026-07-07',
  format: 'T20',
  dayType: 'day',
  country: {
    code: 'IN',
    name: 'India',
    logo: 'https://example.com/india.png',
  },
  homeTeam: {
    id: 1,
    name: 'India',
    abbreviation: 'IND',
    logo: 'https://example.com/ind.png',
  },
  awayTeam: {
    id: 2,
    name: 'Pakistan',
    abbreviation: 'PAK',
    logo: 'https://example.com/pak.png',
  },
  state: {
    description: 'Finished',
    report: 'India won by 5 wickets',
    teams: {
      home: {
        score: '165/4',
        info: '20.0 Ov',
      },
      away: {
        score: '164',
        info: '20.0 Ov',
      },
    },
  },
  league: {
    id: 1,
    name: 'Test Series',
    season: 2026,
  },
  venue: {
    name: 'Lord\'s',
    city: 'London',
    country: 'England',
    capacity: '30000',
  },
  forecast: {
    status: 'Clear',
    temperature: '22°C',
  },
  predictions: null,
  statistics: [
    {
      inningNumber: 1,
      team: {
        id: 2,
        name: 'Pakistan',
        abbreviation: 'PAK',
        logo: 'https://example.com/pak.png',
        byes: 1,
        legByes: 2,
        wides: 3,
        noBalls: 1,
        extras: 7,
        fours: 18,
        sixes: 4,
      },
      inningBatsmen: [
        {
          player: {
            id: 'p1',
            name: 'Babar Azam',
            battingStyles: ['Right-hand'],
            bowlingStyles: [],
            roles: ['Batsman', 'Captain'],
          },
          runs: 52,
          balls: 38,
          fours: 6,
          sixes: 1,
          dismissalStatus: 'c Dhawan b Bumrah',
          battingStrikeRate: 136.84,
          dismissalFielders: [{ name: 'Dhawan', isKeeper: false }],
        },
        {
          player: {
            id: 'p2',
            name: 'Fakhar Zaman',
            battingStyles: ['Left-hand'],
            bowlingStyles: [],
            roles: ['Batsman'],
          },
          runs: 45,
          balls: 32,
          fours: 5,
          sixes: 1,
          dismissalStatus: 'b Bumrah',
          battingStrikeRate: 140.62,
          dismissalFielders: [],
        },
        {
          player: {
            id: 'p3',
            name: 'Mohammad Rizwan',
            battingStyles: ['Right-hand'],
            bowlingStyles: [],
            roles: ['Batsman', 'Wicketkeeper'],
          },
          runs: 38,
          balls: 28,
          fours: 4,
          sixes: 1,
          dismissalStatus: 'not out',
          battingStrikeRate: 135.71,
          dismissalFielders: [],
        },
      ],
      inningBowlers: [
        {
          player: {
            name: 'Jasprit Bumrah',
            battingStyles: [],
            bowlingStyles: ['Right-arm', 'Fast'],
            roles: ['Bowler'],
          },
          overs: 4,
          wickets: 2,
          concededRuns: 28,
          economy: 7.0,
          maidens: 0,
        },
        {
          player: {
            name: 'Yuzvendra Chahal',
            battingStyles: [],
            bowlingStyles: ['Right-arm', 'Leg-spin'],
            roles: ['Bowler'],
          },
          overs: 4,
          wickets: 1,
          concededRuns: 32,
          economy: 8.0,
          maidens: 0,
        },
      ],
      fallOfWickets: [
        {
          order: 1,
          runs: 52,
          overs: 8.2,
          dismissalBatsman: { name: 'Babar Azam' },
        },
        {
          order: 2,
          runs: 97,
          overs: 14.5,
          dismissalBatsman: { name: 'Fakhar Zaman' },
        },
      ],
      inningPartnerships: [
        {
          runs: 52,
          balls: 38,
          overs: 8.2,
          firstPlayer: { id: 'p1', name: 'Babar Azam' },
          secondPlayer: { id: 'p2', name: 'Fakhar Zaman' },
          firstPlayerRuns: 32,
          firstPlayerBalls: 23,
          secondPlayerRuns: 20,
          secondPlayerBalls: 15,
        },
      ],
      fieldingSummary: {
        catches: 5,
        runOuts: 1,
        stumpings: 0,
        runsSaved: 12,
        catchesDropped: 1,
      },
    },
    {
      inningNumber: 2,
      team: {
        id: 1,
        name: 'India',
        abbreviation: 'IND',
        logo: 'https://example.com/ind.png',
        byes: 2,
        legByes: 1,
        wides: 2,
        noBalls: 0,
        extras: 5,
        fours: 20,
        sixes: 2,
      },
      inningBatsmen: [
        {
          player: {
            id: 'p4',
            name: 'Rohit Sharma',
            battingStyles: ['Right-hand'],
            bowlingStyles: [],
            roles: ['Batsman', 'Captain'],
          },
          runs: 58,
          balls: 42,
          fours: 7,
          sixes: 2,
          dismissalStatus: 'not out',
          battingStrikeRate: 138.09,
          dismissalFielders: [],
        },
        {
          player: {
            id: 'p5',
            name: 'Shikhar Dhawan',
            battingStyles: ['Left-hand'],
            bowlingStyles: [],
            roles: ['Batsman'],
          },
          runs: 41,
          balls: 35,
          fours: 5,
          sixes: 0,
          dismissalStatus: 'b Shaheen',
          battingStrikeRate: 117.14,
          dismissalFielders: [],
        },
      ],
      inningBowlers: [
        {
          player: {
            name: 'Shaheen Shah Afridi',
            battingStyles: [],
            bowlingStyles: ['Left-arm', 'Fast'],
            roles: ['Bowler'],
          },
          overs: 4,
          wickets: 1,
          concededRuns: 35,
          economy: 8.75,
          maidens: 0,
        },
      ],
      fallOfWickets: [
        {
          order: 1,
          runs: 41,
          overs: 7.3,
          dismissalBatsman: { name: 'Shikhar Dhawan' },
        },
      ],
      inningPartnerships: [
        {
          runs: 99,
          balls: 68,
          overs: 11.4,
          firstPlayer: { id: 'p4', name: 'Rohit Sharma' },
          secondPlayer: { id: 'p5', name: 'Shikhar Dhawan' },
          firstPlayerRuns: 58,
          firstPlayerBalls: 42,
          secondPlayerRuns: 41,
          secondPlayerBalls: 26,
        },
      ],
      fieldingSummary: {
        catches: 3,
        runOuts: 0,
        stumpings: 1,
        runsSaved: 8,
        catchesDropped: 0,
      },
    },
  ],
  squad: [
    {
      team: {
        id: 1,
        name: 'India',
        abbreviation: 'IND',
        logo: 'https://example.com/ind.png',
      },
      players: [
        { name: 'Rohit Sharma', battingStyles: [], bowlingStyles: [], roles: [] },
      ],
    },
  ],
  bestBatsmen: [],
  bestBowlers: [],
}

/**
 * VERIFICATION CHECKLIST
 *
 * When you load this component with FIXTURE_MATCH, confirm:
 *
 * ✅ Both innings render with correct team names (Pakistan Inning 1, India Inning 2)
 * ✅ Batting table Inning 1: shows Babar (52), Fakhar (45), Rizwan (38)
 * ✅ Bowling table Inning 1: shows Bumrah (2 wickets), Chahal (1 wicket)
 * ✅ Fall of Wickets section: shows 2 wickets with order/runs/batsman
 * ✅ Partnerships section: shows Babar-Fakhar (52 runs, 8.2 overs)
 * ✅ Extras section: shows Byes=1, Leg Byes=2, Wides=3, No Balls=1, Total=7
 * ✅ Fielding Summary: shows Catches=5, Run Outs=1, Stumpings=0, Drops=1
 * ✅ Batting table Inning 2: shows Rohit (58), Dhawan (41)
 * ✅ Bowling table Inning 2: shows Shaheen (1 wicket, 8.75 economy)
 * ✅ No console errors on page render
 *
 * FAILURE MODES TO CHECK FOR:
 * ❌ If any section shows "No data available" when data exists above = component bug
 * ❌ If extras show 0 when should show 7/5 = wrong field mapping
 * ❌ If fallOfWickets doesn't appear with 2 entries = conditional rendering broke
 * ❌ If partnerships shows 0 length = array iteration failed
 *
 * NEXT STEP:
 * Load http://localhost:3000/match/test with this data as fixture
 * and confirm all sections render with correct player names and numbers.
 */

export { FIXTURE_MATCH }
