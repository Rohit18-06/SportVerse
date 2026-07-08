import Link from 'next/link'
import { format } from 'date-fns'
import { Clock } from 'lucide-react'

interface Match {
  id?: string
  matchId?: string
  homeTeam?: {
    name?: string
    shortName?: string
  }
  awayTeam?: {
    name?: string
    shortName?: string
  }
  matchDate?: string
  date?: string
  startTime?: string
  time?: string
  venue?: {
    name?: string
  }
}

interface FixturesListProps {
  fixtures: Match[]
  isLoading?: boolean
}

export function FixturesList({ fixtures, isLoading }: FixturesListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!fixtures || fixtures.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No upcoming fixtures available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {fixtures.map((match) => {
        const homeTeam = match.homeTeam || {}
        const awayTeam = match.awayTeam || {}
        const matchDate = match.matchDate || match.date
        const startTime = match.startTime || match.time
        const venue = match.venue || {}
        const matchId = match.id || match.matchId

        return (
          <Link key={matchId} href={`/match/${matchId}`}>
            <div className="bg-[#1a1f2e] rounded-lg p-4 hover:bg-[#242b3d] transition-colors cursor-pointer">
              {/* Date and Venue */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <Clock className="w-4 h-4" />
                {matchDate && (
                  <span>{format(new Date(matchDate), 'MMM dd, yyyy')}</span>
                )}
                {startTime && <span className="text-gray-500">•</span>}
                {startTime && <span>{startTime}</span>}
                {venue?.name && <span className="text-gray-500">• {venue.name}</span>}
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{homeTeam.name || 'Team'}</p>
                  <p className="font-semibold text-white">{homeTeam.shortName || homeTeam.name}</p>
                </div>

                <div className="text-gray-500 px-4">vs</div>

                <div className="flex-1 text-right">
                  <p className="text-sm text-gray-400">{awayTeam.name || 'Team'}</p>
                  <p className="font-semibold text-white">{awayTeam.shortName || awayTeam.name}</p>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
