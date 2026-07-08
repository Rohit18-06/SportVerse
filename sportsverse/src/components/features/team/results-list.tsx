import Link from 'next/link'
import { format } from 'date-fns'
import { Trophy } from 'lucide-react'

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
  liveData?: {
    homeTeam?: {
      score?: string | number
    }
    awayTeam?: {
      score?: string | number
    }
  }
  homeScore?: string | number
  awayScore?: string | number
  winner?: string
  margin?: string
  playerOfTheMatch?: string
  motm?: string
}

interface ResultsListProps {
  results: Match[]
  isLoading?: boolean
}

export function ResultsList({ results, isLoading }: ResultsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-lg h-28 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No recent results available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {results.map((match) => {
        const homeTeam = match.homeTeam || {}
        const awayTeam = match.awayTeam || {}
        const matchDate = match.matchDate || match.date
        const homeScore = match.liveData?.homeTeam?.score || match.homeScore
        const awayScore = match.liveData?.awayTeam?.score || match.awayScore
        const winner = match.winner
        const margin = match.margin
        const motm = match.playerOfTheMatch || match.motm
        const matchId = match.id || match.matchId

        return (
          <Link key={matchId} href={`/match/${matchId}`}>
            <div className="bg-[#1a1f2e] rounded-lg p-4 hover:bg-[#242b3d] transition-colors cursor-pointer">
              {/* Date */}
              <p className="text-sm text-gray-400 mb-3">
                {matchDate && format(new Date(matchDate), 'MMM dd, yyyy')}
              </p>

              {/* Score */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-white">{homeTeam.shortName || homeTeam.name}</p>
                  <p className="text-2xl font-bold text-cyan-400">{homeScore}</p>
                </div>

                <div className="text-gray-500 px-4">vs</div>

                <div className="flex-1 text-right">
                  <p className="font-semibold text-white">{awayTeam.shortName || awayTeam.name}</p>
                  <p className="text-2xl font-bold text-cyan-400">{awayScore}</p>
                </div>
              </div>

              {/* Result and Margin */}
              <div className="pt-3 border-t border-[#0f1419] space-y-1">
                {winner && (
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-white font-medium">{winner} won</span>
                    {margin && <span className="text-gray-400">by {margin}</span>}
                  </div>
                )}
                {motm && (
                  <p className="text-xs text-gray-400">Player of the Match: {motm}</p>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
