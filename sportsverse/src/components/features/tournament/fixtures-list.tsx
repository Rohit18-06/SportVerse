'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useTournamentFixtures } from '@/hooks/useTournament'

interface FixturesListProps {
  tournamentId: string
}

export function FixturesList({ tournamentId }: FixturesListProps): ReactNode {
  const { data: fixtures = [], isLoading } = useTournamentFixtures(tournamentId, 'upcoming')

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!fixtures || fixtures.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <p className="text-text-secondary text-lg">No upcoming fixtures available.</p>
      </div>
    )
  }

  type FixtureType = Record<string, unknown>
  return (
    <div className="space-y-4">
      {fixtures.map((fixture: unknown, fixtureIdx: number) => {
        const f = fixture as FixtureType
        const key = (f.id as string) || String(fixtureIdx)
        return (
        <Link key={key} href={`/match/${f.id}`}>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-4 md:p-6 hover:border-white/20 transition-colors cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Teams */}
              <div className="md:col-span-1">
                <div className="flex items-center justify-between md:flex-col md:gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {f.homeTeam && typeof f.homeTeam === 'object' 
                        ? (((f.homeTeam as Record<string, unknown>).shortName as string) || ((f.homeTeam as Record<string, unknown>).name as string)) 
                        : 'TBD'}
                    </p>
                  </div>
                  <span className="text-xs text-text-tertiary md:hidden">vs</span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {f.awayTeam && typeof f.awayTeam === 'object'
                        ? (((f.awayTeam as Record<string, unknown>).shortName as string) || ((f.awayTeam as Record<string, unknown>).name as string))
                        : 'TBD'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="md:col-span-1 md:text-center">
                <p className="text-text-secondary text-sm mb-1">
                  {f.startTime
                    ? new Date(f.startTime as string).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'TBD'}
                </p>
                <p className="text-text-tertiary text-xs">
                  {f.startTime
                    ? new Date(f.startTime as string).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    : 'Time TBD'}
                </p>
              </div>

              {/* Venue */}
              <div className="md:col-span-1 md:text-right">
                <p className="text-sm text-text-secondary">
                  {f.venue && typeof f.venue === 'object'
                    ? String((f.venue as Record<string, unknown>).name || (f.venue as Record<string, unknown>).city)
                    : 'Venue TBD'}
                </p>
                <p className="text-xs text-text-tertiary">
                  {String(f.format || 'Match')}
                </p>
              </div>
            </div>
          </div>
        </Link>
        )
      })}
    </div>
  )
}
