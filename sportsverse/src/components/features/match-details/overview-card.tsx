'use client'

import { ReactNode } from 'react'
import type { HighlightlyMatch } from '@/services/api/cricket'

interface OverviewCardProps {
  match: HighlightlyMatch
}

export function OverviewCard({ match }: OverviewCardProps): ReactNode {
  const isLive = match.state.description.toLowerCase().includes('in play')

  return (
    <div className="space-y-6">
      {/* Match Summary */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-4">Match Summary</h3>
        <p className="text-text-secondary mb-4 leading-relaxed">
          {match.state.description || `${match.homeTeam.name} vs ${match.awayTeam.name} - ${match.format} Match`}
        </p>
        {match.state.report && (
          <p className="text-sm text-text-tertiary leading-relaxed">
            {match.state.report}
          </p>
        )}
      </div>

      {/* Toss Information */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-4">Toss</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Winner</span>
            <span className="text-white font-semibold">TBD</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Decision</span>
            <span className="text-white font-semibold">TBD</span>
          </div>
        </div>
      </div>

      {/* Current Batters */}
      {isLive && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-white mb-4">Current Batters</h3>
          <div className="space-y-4">
            <div className="border-l-2 border-cyan-primary/50 pl-4">
              <p className="text-text-secondary text-sm mb-1">Striker</p>
              <p className="text-white font-semibold">N/A</p>
            </div>
            <div className="border-l-2 border-cyan-primary/50 pl-4">
              <p className="text-text-secondary text-sm mb-1">Non-Striker</p>
              <p className="text-white font-semibold">N/A</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Bowler */}
      {isLive && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-white mb-4">Current Bowler</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Name</span>
              <span className="text-white font-semibold">N/A</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Overs</span>
              <span className="text-white font-semibold">N/A</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Runs Conceded</span>
              <span className="text-white font-semibold">N/A</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Wickets</span>
              <span className="text-white font-semibold">N/A</span>
            </div>
          </div>
        </div>
      )}

      {/* Partnership */}
      {isLive && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-white mb-4">Partnership</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Runs</span>
              <span className="text-white font-semibold">N/A</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Balls</span>
              <span className="text-white font-semibold">N/A</span>
            </div>
          </div>
        </div>
      )}

      {/* Last Over */}
      {isLive && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-white mb-4">Last Over</h3>
          <div className="space-y-3">
            <p className="text-text-secondary text-sm">No data available</p>
          </div>
        </div>
      )}
    </div>
  )
}
