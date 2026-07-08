'use client'

import { ReactNode } from 'react'
import { SectionHeader } from '@/components/common/section-header'
import { MatchCard } from './match-card'
import { useUpcomingMatches } from '@/hooks/useUpcomingMatches'
import type { CricketMatch } from '@/types'
import { isRealDataConfigured } from '@/services/cricket-api.service'

// Mock upcoming matches for fallback
const mockUpcomingMatches: CricketMatch[] = [
  {
    id: '4',
    eventId: '4',
    homeTeam: {
      id: '1',
      name: 'India',
      shortName: 'IND',
      logo: 'https://via.placeholder.com/64',
      country: 'India',
    },
    awayTeam: {
      id: '7',
      name: 'Sri Lanka',
      shortName: 'SL',
      logo: 'https://via.placeholder.com/64',
      country: 'Sri Lanka',
    },
    status: 'upcoming',
    format: 'T20',
    venue: {
      id: '4',
      name: 'Arun Jaitley Stadium',
      city: 'New Delhi',
      country: 'India',
    },
    startTime: new Date(Date.now() + 86400000), // Tomorrow
  },
  {
    id: '5',
    eventId: '5',
    homeTeam: {
      id: '2',
      name: 'Australia',
      shortName: 'AUS',
      logo: 'https://via.placeholder.com/64',
      country: 'Australia',
    },
    awayTeam: {
      id: '3',
      name: 'Pakistan',
      shortName: 'PAK',
      logo: 'https://via.placeholder.com/64',
      country: 'Pakistan',
    },
    status: 'upcoming',
    format: 'Test',
    venue: {
      id: '5',
      name: 'WACA Ground',
      city: 'Perth',
      country: 'Australia',
    },
    startTime: new Date(Date.now() + 172800000), // In 2 days
  },
  {
    id: '6',
    eventId: '6',
    homeTeam: {
      id: '5',
      name: 'South Africa',
      shortName: 'SA',
      logo: 'https://via.placeholder.com/64',
      country: 'South Africa',
    },
    awayTeam: {
      id: '8',
      name: 'New Zealand',
      shortName: 'NZ',
      logo: 'https://via.placeholder.com/64',
      country: 'New Zealand',
    },
    status: 'upcoming',
    format: 'ODI',
    venue: {
      id: '6',
      name: 'Newlands',
      city: 'Cape Town',
      country: 'South Africa',
    },
    startTime: new Date(Date.now() + 259200000), // In 3 days
  },
]

export function UpcomingMatches(): ReactNode {
  const { data: upcomingMatches = [] } = useUpcomingMatches()
  
  // Use real data if configured, otherwise use mock data
  const showRealData = isRealDataConfigured()
  const matches: CricketMatch[] = showRealData && upcomingMatches.length > 0
    ? (upcomingMatches as unknown as CricketMatch[])
    : mockUpcomingMatches

  if (matches.length === 0) {
    return (
      <section className="mb-12 md:mb-16">
        <SectionHeader
          title="Upcoming Matches"
          subtitle="Coming soon"
          action={{ label: 'See all', href: '/upcoming' }}
        />
        <div className="text-center py-8 text-text-secondary">
          No upcoming matches currently available.
        </div>
      </section>
    )
  }

  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader
        title="Upcoming Matches"
        subtitle="Coming soon"
        action={{ label: 'See all', href: '/upcoming' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  )
}
