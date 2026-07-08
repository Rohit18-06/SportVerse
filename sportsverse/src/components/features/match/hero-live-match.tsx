'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useHeroMatch } from '@/hooks/useLiveMatches'
import { formatDateTime } from '@/lib/date-format'
import type { Match } from '@/services/api/cricket'

interface HeroLiveMatchProps {
  match?: Match
}

export function HeroLiveMatch({ match: providedMatch }: HeroLiveMatchProps): ReactNode {
  const { match: liveMatch, error } = useHeroMatch()
  
  // Use provided match if available, otherwise use fetched match
  const match = providedMatch || liveMatch
  
  // Show error state
  if (error || !match) {
    return (
      <div className="card p-6 md:p-8 mb-8 md:mb-12">
        <div className="text-center py-12">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            {error ? 'Unable to load live matches' : 'No live matches currently'}
          </h3>
          <p className="text-text-secondary">
            {error 
              ? 'There was an error fetching the data. Please try refreshing the page.'
              : 'Check back soon for live cricket matches.'}
          </p>
        </div>
      </div>
    )
  }

  const liveData = match.liveData
  
  // Extract scores from liveData
  const homeScore = liveData?.homeTeam?.score || '0'
  const awayScore = liveData?.awayTeam?.score || '0'
  const description = liveData?.description || match.status
  
  // Parse score format "123/4" to get runs and wickets
  const parseScore = (scoreStr?: string) => {
    if (!scoreStr) return { runs: 0, wickets: 0 }
    const [runs, wickets] = scoreStr.split('/').map(Number)
    return { runs: runs || 0, wickets: wickets || 0 }
  }
  
  const homeScoreParsed = parseScore(homeScore)
  const awayScoreParsed = parseScore(awayScore)

  return (
    <Link href={`/match/${match.id}`}>
      <div className="card p-6 md:p-8 mb-8 md:mb-12 cursor-pointer group relative overflow-hidden">
        {/* 1. MATCH CONTEXT ROW - Status, Format, Venue */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {description?.toLowerCase().includes('live') && <span className="live-indicator" />}
            <span className="text-xs md:text-sm font-semibold text-text-secondary uppercase tracking-widest">
              {match.format} • {match.venue?.city || 'TBD'}
            </span>
          </div>
          <span className="text-xs md:text-sm text-text-tertiary font-medium">
            {match.venue?.name || match.league?.name || 'Venue TBD'}
          </span>
        </div>

        {/* 2. MAIN SCOREBOARD - Teams and Scores */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Home Team */}
          <div>
            <div className="text-text-secondary text-xs uppercase tracking-widest mb-2 font-semibold">
              {match.status === 'live' ? 'Batting' : 'Home'}
            </div>
            <div className="mb-3">
              <div className="text-sm md:text-base text-white font-semibold mb-1">
                {match.homeTeam.name}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {homeScoreParsed.runs}
                </span>
                <span className="text-lg md:text-xl text-text-secondary">
                  /{homeScoreParsed.wickets}
                </span>
              </div>
            </div>
          </div>

          {/* Away Team */}
          <div>
            <div className="text-text-secondary text-xs uppercase tracking-widest mb-2 font-semibold">
              {match.status === 'live' ? 'Target' : 'Away'}
            </div>
            <div className="mb-3">
              <div className="text-sm md:text-base text-white font-semibold mb-1">
                {match.awayTeam.name}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {awayScoreParsed.runs}
                </span>
                <span className="text-lg md:text-xl text-text-secondary">
                  /{awayScoreParsed.wickets}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MATCH STATUS */}
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
            Match Status
          </div>
          <div className="text-sm md:text-base text-white">
            {description || `Status: ${match.status}`}
          </div>
          {liveData?.report && (
            <div className="text-xs text-text-secondary mt-2">
              {liveData.report}
            </div>
          )}
        </div>

        {/* 4. LEAGUE & VENUE INFO */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {match.league && (
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1 font-semibold">
                Series
              </div>
              <div className="text-sm font-semibold text-white">
                {match.league.name}
              </div>
            </div>
          )}
          {match.venue && (
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1 font-semibold">
                Venue
              </div>
              <div className="text-sm font-semibold text-white">
                {match.venue.city || match.venue.name || 'TBD'}
              </div>
            </div>
          )}
        </div>

        {/* 5. MATCH TIME */}
        {match.startTime && (
          <div className="text-xs text-text-secondary">
            <span className="font-semibold">Start Time:</span> {formatDateTime(new Date(match.startTime))}
          </div>
        )}

        {/* Hover effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-primary/0 to-cyan-primary/0 group-hover:from-cyan-primary/5 group-hover:to-cyan-primary/5 transition-all duration-300 pointer-events-none" />
      </div>
    </Link>
  )
}
