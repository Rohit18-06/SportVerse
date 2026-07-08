'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useTournamentTeams } from '@/hooks/useTournament'

interface TeamGridProps {
  tournamentId: string
}

export function TeamGrid({ tournamentId }: TeamGridProps): ReactNode {
  const { data: teams = [] } = useTournamentTeams(tournamentId)

  if (!teams || teams.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <p className="text-text-secondary text-lg">No teams available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {teams.map((team: unknown, teamIdx: number) => {
        const t = team as Record<string, unknown>
        const key = (t.id as string) || String(teamIdx)
        const teamId = (t.id as string) || (t.name as string)?.toLowerCase().replace(/\s+/g, '-')
        
        return (
          <Link key={key} href={`/team/${teamId}`}>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer h-full">
              {/* Team Logo */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-primary/20 to-cyan-primary/5 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-primary">
                  {(t.name as string)?.[0] || 'T'}
                </span>
              </div>

              {/* Team Name */}
              <h3 className="font-semibold text-white mb-1 truncate">
                {String(t.name)}
              </h3>

              {/* Country */}
              <p className="text-xs text-text-secondary">
                {String(t.country || 'Country TBD')}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
