import { ReactNode } from 'react'
import Link from 'next/link'
import type { CricketMatch, MatchStatus } from '@/types'

interface MatchCardProps {
  match: CricketMatch
}

function getStatusDisplay(status: MatchStatus): { label: string; color: string } {
  const statusMap = {
    live: { label: 'LIVE', color: 'text-cyan-primary' },
    upcoming: { label: 'UPCOMING', color: 'text-text-secondary' },
    completed: { label: 'COMPLETED', color: 'text-text-tertiary' },
    abandoned: { label: 'ABANDONED', color: 'text-orange-500' },
    postponed: { label: 'POSTPONED', color: 'text-text-tertiary' },
  }
  return statusMap[status]
}

export function MatchCard({ match }: MatchCardProps): ReactNode {
  const status = getStatusDisplay(match.status)
  const liveData = match.liveData

  return (
    <Link href={`/match/${match.id}`} className="block">
      <div className="card p-4 md:p-6 group cursor-pointer relative">
        {/* Header: Status and format */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-bold uppercase tracking-widest ${status.color}`}>
            {match.status === 'live' && <span className="live-indicator" />}
            {status.label}
          </span>
          <span className="text-xs text-text-secondary font-medium">{match.format}</span>
        </div>

        {/* Teams */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm md:text-base font-medium text-white">
              {match.homeTeam.shortName}
            </span>
            {liveData ? (
              <span className="text-lg md:text-xl font-bold text-white">
                {liveData.currentRun}/{liveData.currentWicket}
              </span>
            ) : (
              <span className="text-text-secondary text-sm">TBD</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm md:text-base font-medium text-white">
              {match.awayTeam.shortName}
            </span>
            {liveData ? (
              <span className="text-lg md:text-xl font-bold text-white">320/9</span>
            ) : (
              <span className="text-text-secondary text-sm">TBD</span>
            )}
          </div>
        </div>

        {/* Match info line */}
        <div className="pt-4 border-t border-white/10">
          {liveData ? (
            <div className="text-xs md:text-sm text-text-secondary">
              {liveData.currentOver}.{liveData.currentBall} • CRR {(liveData.runRate || 0).toFixed(2)}
            </div>
          ) : (
            <div className="text-xs md:text-sm text-text-secondary">
              {/* Use consistent UTC time formatting to avoid hydration mismatch */}
              {`${String(match.startTime.getHours()).padStart(2, '0')}:${String(match.startTime.getMinutes()).padStart(2, '0')}`}
              {' • '}
              {match.venue.name}
            </div>
          )}
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-primary/0 to-cyan-primary/0 group-hover:from-cyan-primary/5 group-hover:to-cyan-primary/5 transition-all duration-300 pointer-events-none" />
      </div>
    </Link>
  )
}
