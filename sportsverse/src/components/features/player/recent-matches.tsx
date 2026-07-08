import Link from 'next/link'
import { formatDate } from '@/lib/date-format'

interface Match {
  id?: string
  eventId?: string
  homeTeam?: {
    name?: string
    shortName?: string
    logo?: string
  }
  awayTeam?: {
    name?: string
    shortName?: string
    logo?: string
  }
  status?: string
  format?: string
  venue?: {
    name?: string
    city?: string
  }
  matchDate?: string
  startTime?: string
  liveData?: {
    homeTeam?: {
      score?: string
      info?: string
    }
    awayTeam?: {
      score?: string
      info?: string
    }
    description?: string
  }
}

interface RecentMatchesProps {
  matches: Match[]
  isLoading?: boolean
}

export function RecentMatches({ matches, isLoading }: RecentMatchesProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No recent matches available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => {
        const matchId = match.id || match.eventId
        const homeTeam = match.homeTeam?.shortName || match.homeTeam?.name || 'Team'
        const awayTeam = match.awayTeam?.shortName || match.awayTeam?.name || 'Team'
        const homeScore = match.liveData?.homeTeam?.score
        const awayScore = match.liveData?.awayTeam?.score
        const venue = match.venue?.name || match.venue?.city || 'Venue'
        const format = match.format || ''

        return (
          <Link key={matchId} href={`/match/${matchId}`} className="group block">
            <div className="bg-[#1a1f2e] rounded-lg p-4 hover:bg-[#242b3d] transition-all duration-300">
              {/* Header: Date and Status */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-cyan-400">{format}</span>
                  {match.status && (
                    <span className="text-xs px-2 py-1 rounded-full bg-[#0f1419] text-gray-400 capitalize">
                      {match.status === 'completed' ? 'Ended' : match.status}
                    </span>
                  )}
                </div>
                {match.matchDate && (
                  <span className="text-xs text-gray-500">{formatDate(new Date(match.matchDate))}</span>
                )}
              </div>

              {/* Teams and Score */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex-1 text-right">
                  <p className="font-semibold text-white">{homeTeam}</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  {homeScore && awayScore ? (
                    <p className="text-lg font-bold text-cyan-400">
                      {homeScore} - {awayScore}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">vs</p>
                  )}
                  {match.liveData?.description && (
                    <p className="text-xs text-gray-500 text-center max-w-[60px]">
                      {match.liveData.description}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-white">{awayTeam}</p>
                </div>
              </div>

              {/* Venue */}
              {venue && (
                <div className="text-xs text-gray-500 text-center">
                  {venue}
                </div>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
