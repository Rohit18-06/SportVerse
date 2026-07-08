'use client'

import { ReactNode } from 'react'
import { useTournamentFixtures } from '@/hooks/useTournament'

interface TournamentOverviewProps {
  tournamentId: string
  tournament: {
    name: string
    format?: string
    status?: string
    season?: string
  }
}

export function TournamentOverview({ tournamentId, tournament }: TournamentOverviewProps): ReactNode {
  const { data: fixtures } = useTournamentFixtures(tournamentId, 'all')

  const totalMatches = fixtures?.length || 0
  const upcomingMatches = fixtures?.filter((m: unknown) => (m as Record<string, unknown>).status === 'upcoming').length || 0

  return (
    <div className="space-y-8">
      {/* Tournament Summary */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-4">Tournament Summary</h3>
        <p className="text-text-secondary mb-4 leading-relaxed">
          {tournament.name} is a {tournament.format || 'cricket'} tournament in the {tournament.season || 'current'} season.
          Follow all the matches, standings, and live updates here.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-4">
          <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-2">
            Total Matches
          </p>
          <p className="text-2xl font-bold text-white">{totalMatches}</p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-4">
          <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-2">
            Upcoming
          </p>
          <p className="text-2xl font-bold text-cyan-primary">{upcomingMatches}</p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-4">
          <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-2">
            Format
          </p>
          <p className="text-2xl font-bold text-white">{tournament.format || 'TBD'}</p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-4">
          <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-2">
            Status
          </p>
          <p className="text-2xl font-bold text-white">{tournament.status || 'TBD'}</p>
        </div>
      </div>

      {/* Current Stage */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-4">Current Stage</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Stage</span>
            <span className="text-white font-semibold">Group Stage</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Matches Completed</span>
            <span className="text-white font-semibold">{Math.max(0, totalMatches - upcomingMatches)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Matches Remaining</span>
            <span className="text-white font-semibold">{upcomingMatches}</span>
          </div>
        </div>
      </div>

      {/* Next Match */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-4">Next Match</h3>
        {fixtures && fixtures.length > 0 ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold mb-1">
                {fixtures[0]?.homeTeam?.name || 'TBD'} vs {fixtures[0]?.awayTeam?.name || 'TBD'}
              </p>
              <p className="text-sm text-text-secondary">
                {fixtures[0]?.venue?.name || 'Venue TBD'}
              </p>
            </div>
            <span className="text-sm text-text-tertiary">
              {fixtures[0]?.startTime ? new Date(fixtures[0].startTime).toLocaleDateString() : 'TBD'}
            </span>
          </div>
        ) : (
          <p className="text-text-secondary">No upcoming matches</p>
        )}
      </div>
    </div>
  )
}
