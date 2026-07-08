'use client'

import { ReactNode } from 'react'
import { SectionHeader } from '@/components/common/section-header'
import { MatchCard } from './match-card'
import { useLiveMatches } from '@/hooks/useLiveMatches'
import type { CricketMatch } from '@/types'
import { isRealDataConfigured } from '@/services/cricket-api.service'

// Fallback mock matches for when real data is disabled
// Use static Date to avoid hydration mismatch
const STATIC_DATE = new Date('2026-07-04T15:30:00Z')

const mockLiveMatches: CricketMatch[] = [
  {
    id: '2',
    eventId: '2',
    homeTeam: {
      id: '3',
      name: 'Pakistan',
      shortName: 'PAK',
      logo: 'https://via.placeholder.com/64',
      country: 'Pakistan',
    },
    awayTeam: {
      id: '4',
      name: 'Bangladesh',
      shortName: 'BAN',
      logo: 'https://via.placeholder.com/64',
      country: 'Bangladesh',
    },
    status: 'live',
    format: 'T20',
    venue: {
      id: '2',
      name: 'Gaddafi Stadium',
      city: 'Lahore',
      country: 'Pakistan',
    },
    startTime: STATIC_DATE,
    liveData: {
      batting: {
        runs: 156,
        wickets: 4,
        overs: 15,
        balls: 3,
        runRate: 10.4,
        batsmen: [],
      },
      bowling: {
        bowlers: [],
      },
      currentRun: 156,
      currentWicket: 4,
      currentOver: 15,
      currentBall: 3,
      requiredRunRate: 9.5,
      winProbability: {
        team1: 55,
        team2: 45,
      },
    },
  },
  {
    id: '3',
    eventId: '3',
    homeTeam: {
      id: '5',
      name: 'South Africa',
      shortName: 'SA',
      logo: 'https://via.placeholder.com/64',
      country: 'South Africa',
    },
    awayTeam: {
      id: '6',
      name: 'West Indies',
      shortName: 'WI',
      logo: 'https://via.placeholder.com/64',
      country: 'West Indies',
    },
    status: 'live',
    format: 'ODI',
    venue: {
      id: '3',
      name: 'Kingsmead',
      city: 'Durban',
      country: 'South Africa',
    },
    startTime: STATIC_DATE,
    liveData: {
      batting: {
        runs: 245,
        wickets: 6,
        overs: 42,
        balls: 5,
        runRate: 5.82,
        batsmen: [],
      },
      bowling: {
        bowlers: [],
      },
      currentRun: 245,
      currentWicket: 6,
      currentOver: 42,
      currentBall: 5,
      requiredRunRate: 10.2,
      winProbability: {
        team1: 38,
        team2: 62,
      },
    },
  },
]

export function LiveMatchesGrid(): ReactNode {
  const { data: liveMatches = [], error } = useLiveMatches()
  
  // Use real data if configured, otherwise use mock data
  const showRealData = isRealDataConfigured()
  const matches: CricketMatch[] = showRealData && liveMatches.length > 0 
    ? (liveMatches as unknown as CricketMatch[])
    : mockLiveMatches
  
  if (showRealData && error) {
    return (
      <section className="mb-12 md:mb-16">
        <SectionHeader
          title="Live Matches"
          subtitle="Matches happening right now"
          action={{ label: 'See all', href: '/live' }}
        />
        <div className="text-center py-8 text-red-400">
          Failed to load live matches. Please try again later.
        </div>
      </section>
    )
  }

  if (matches.length === 0) {
    return (
      <section className="mb-12 md:mb-16">
        <SectionHeader
          title="Live Matches"
          subtitle="Matches happening right now"
          action={{ label: 'See all', href: '/live' }}
        />
        <div className="text-center py-8 text-text-secondary">
          No live matches currently available.
        </div>
      </section>
    )
  }

  // ✅ Always render the same structure - server and client both see matches
  // Use static subtitle to avoid hydration mismatch
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader
        title="Live Matches"
        subtitle="Matches happening right now"
        action={{ label: 'See all', href: '/live' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  )
}
