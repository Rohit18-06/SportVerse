'use client'

import { ReactNode } from 'react'
import { SectionHeader } from '@/components/common/section-header'
import { MatchCard } from './match-card'
import { useResults } from '@/hooks/useResults'
import type { CricketMatch } from '@/types'
import { isRealDataConfigured } from '@/services/cricket-api.service'

// Mock completed matches
const mockResults: CricketMatch[] = [
  {
    id: '7',
    eventId: '7',
    homeTeam: {
      id: '9',
      name: 'England',
      shortName: 'ENG',
      logo: 'https://via.placeholder.com/64',
      country: 'England',
    },
    awayTeam: {
      id: '10',
      name: 'Ireland',
      shortName: 'IRE',
      logo: 'https://via.placeholder.com/64',
      country: 'Ireland',
    },
    status: 'completed',
    format: 'ODI',
    venue: {
      id: '7',
      name: 'Lord\'s Cricket Ground',
      city: 'London',
      country: 'England',
    },
    startTime: new Date(Date.now() - 86400000),
    result: {
      winner: 'England',
      margin: '45 runs',
      marginType: 'runs',
      playerOfTheMatch: 'Joe Root',
    },
    liveData: {
      batting: {
        runs: 312,
        wickets: 8,
        overs: 50,
        balls: 0,
        runRate: 6.24,
        batsmen: [],
      },
      bowling: {
        bowlers: [],
      },
      currentRun: 312,
      currentWicket: 8,
      currentOver: 50,
      currentBall: 0,
      requiredRunRate: 0,
      winProbability: {
        team1: 100,
        team2: 0,
      },
    },
  },
  {
    id: '8',
    eventId: '8',
    homeTeam: {
      id: '11',
      name: 'Afghanistan',
      shortName: 'AFG',
      logo: 'https://via.placeholder.com/64',
      country: 'Afghanistan',
    },
    awayTeam: {
      id: '12',
      name: 'Zimbabwe',
      shortName: 'ZIM',
      logo: 'https://via.placeholder.com/64',
      country: 'Zimbabwe',
    },
    status: 'completed',
    format: 'T20',
    venue: {
      id: '8',
      name: 'Sharjah Cricket Ground',
      city: 'Sharjah',
      country: 'UAE',
    },
    startTime: new Date(Date.now() - 172800000),
    result: {
      winner: 'Afghanistan',
      margin: '7 wickets',
      marginType: 'wickets',
      playerOfTheMatch: 'Rashid Khan',
    },
    liveData: {
      batting: {
        runs: 158,
        wickets: 3,
        overs: 18,
        balls: 4,
        runRate: 8.78,
        batsmen: [],
      },
      bowling: {
        bowlers: [],
      },
      currentRun: 158,
      currentWicket: 3,
      currentOver: 18,
      currentBall: 4,
      requiredRunRate: 0,
      winProbability: {
        team1: 100,
        team2: 0,
      },
    },
  },
  {
    id: '9',
    eventId: '9',
    homeTeam: {
      id: '13',
      name: 'Netherlands',
      shortName: 'NED',
      logo: 'https://via.placeholder.com/64',
      country: 'Netherlands',
    },
    awayTeam: {
      id: '14',
      name: 'Kenya',
      shortName: 'KEN',
      logo: 'https://via.placeholder.com/64',
      country: 'Kenya',
    },
    status: 'completed',
    format: 'ODI',
    venue: {
      id: '9',
      name: 'Sportpark Voorschoten',
      city: 'Voorschoten',
      country: 'Netherlands',
    },
    startTime: new Date(Date.now() - 259200000),
    result: {
      winner: 'Netherlands',
      margin: '56 runs',
      marginType: 'runs',
      playerOfTheMatch: 'Max O\'Dowd',
    },
    liveData: {
      batting: {
        runs: 289,
        wickets: 7,
        overs: 50,
        balls: 0,
        runRate: 5.78,
        batsmen: [],
      },
      bowling: {
        bowlers: [],
      },
      currentRun: 289,
      currentWicket: 7,
      currentOver: 50,
      currentBall: 0,
      requiredRunRate: 0,
      winProbability: {
        team1: 100,
        team2: 0,
      },
    },
  },
]

export function RecentResults(): ReactNode {
  const { data: results = [] } = useResults(10)
  
  // Use real data if configured, otherwise use mock data
  const showRealData = isRealDataConfigured()
  const matches: CricketMatch[] = showRealData && results.length > 0
    ? (results as unknown as CricketMatch[])
    : mockResults

  if (matches.length === 0) {
    return (
      <section className="mb-12 md:mb-16">
        <SectionHeader
          title="Recent Results"
          subtitle="Latest match outcomes"
          action={{ label: 'See all', href: '/finished' }}
        />
        <div className="text-center py-8 text-text-secondary">
          No recent results currently available.
        </div>
      </section>
    )
  }

  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader
        title="Recent Results"
        subtitle="Latest match outcomes"
        action={{ label: 'See all', href: '/finished' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {matches.map((match: CricketMatch) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  )
}
