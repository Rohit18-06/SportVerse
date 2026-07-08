'use client'

import { ReactNode } from 'react'
import type { HighlightlyMatch } from '@/services/api/cricket'

interface HeroScoreboardProps {
  match: HighlightlyMatch
}

export function HeroScoreboard({ match }: HeroScoreboardProps): ReactNode {
  // Parse score format "123/9" 
  const parseScore = (scoreStr?: string) => {
    if (!scoreStr) return { runs: '0', wickets: '0' }
    const parts = scoreStr.split('/')
    return {
      runs: parts[0] || '0',
      wickets: parts[1] || '0',
    }
  }

  const homeScore = parseScore(match.state.teams.home.score)
  const awayScore = parseScore(match.state.teams.away.score)

  // Determine which team is batting
  const isHomeBatting = !!match.state.teams.home.info
  const isBothFinished = match.state.teams.home.score && match.state.teams.away.score

  // Get match result if finished
  const matchResult = match.state.report

  return (
    <div className="container-max py-8 md:py-12">
      {/* Main Scoreboard */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Home Team */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="text-center">
            {/* Team logo */}
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-500/5 flex items-center justify-center overflow-hidden">
              {match.homeTeam.logo ? (
                <img
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><text x=%2212%22 y=%2216%22 text-anchor=%22middle%22 font-size=%2714%22 font-weight=%22bold%22>' + match.homeTeam.abbreviation.charAt(0) + '</text></svg>'
                  }}
                />
              ) : (
                <span className="text-2xl md:text-3xl font-bold text-cyan-400">
                  {match.homeTeam.abbreviation.charAt(0)}
                </span>
              )}
            </div>

            {/* Team name */}
            <h2 className="text-lg md:text-xl font-bold text-white mb-1">
              {match.homeTeam.name}
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              {isHomeBatting ? 'BATTING' : isBothFinished ? 'FINISHED' : 'HOME TEAM'}
            </p>

            {/* Score */}
            <div className="mb-4">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {homeScore.runs}
                </span>
                <span className="text-2xl md:text-3xl text-gray-400">
                  /{homeScore.wickets}
                </span>
              </div>

              {/* Overs/Status */}
              {match.state.teams.home.info && (
                <div className="text-sm text-gray-400">
                  {match.state.teams.home.info}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="text-center">
            {/* Team logo */}
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-500/5 flex items-center justify-center overflow-hidden">
              {match.awayTeam.logo ? (
                <img
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><text x=%2712%22 y=%2716%22 text-anchor=%22middle%22 font-size=%2714%22 font-weight=%22bold%22>' + match.awayTeam.abbreviation.charAt(0) + '</text></svg>'
                  }}
                />
              ) : (
                <span className="text-2xl md:text-3xl font-bold text-cyan-400">
                  {match.awayTeam.abbreviation.charAt(0)}
                </span>
              )}
            </div>

            {/* Team name */}
            <h2 className="text-lg md:text-xl font-bold text-white mb-1">
              {match.awayTeam.name}
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              {!isHomeBatting && !isBothFinished ? 'BOWLING' : isBothFinished ? 'FINISHED' : 'AWAY TEAM'}
            </p>

            {/* Score */}
            <div className="mb-4">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {awayScore.runs}
                </span>
                <span className="text-2xl md:text-3xl text-gray-400">
                  /{awayScore.wickets}
                </span>
              </div>

              {/* Overs/Status */}
              {match.state.teams.away.info && (
                <div className="text-sm text-gray-400">
                  {match.state.teams.away.info}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Result (if finished) */}
      {matchResult && (
        <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6 text-center">
          <p className="text-lg font-semibold text-white">{matchResult}</p>
        </div>
      )}
    </div>
  )
}
