'use client'

import { ReactNode } from 'react'
import type { HighlightlyMatch } from '@/services/api/cricket'

interface PlayersSectionProps {
  match: HighlightlyMatch
}

export function PlayersSection({ match }: PlayersSectionProps): ReactNode {
  return (
    <div className="space-y-8">
      {/* Home Team Players */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6">{match.homeTeam.name} Squad</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-sm text-text-secondary mb-1">Captain</p>
            <p className="text-white font-semibold">N/A</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-sm text-text-secondary mb-1">Wicket Keeper</p>
            <p className="text-white font-semibold">N/A</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-text-secondary text-sm mb-3">Playing 11</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <div key={i} className="text-text-tertiary text-sm">
                {i}. Player not available
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Away Team Players */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6">{match.awayTeam.name} Squad</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-sm text-text-secondary mb-1">Captain</p>
            <p className="text-white font-semibold">N/A</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4">
            <p className="text-sm text-text-secondary mb-1">Wicket Keeper</p>
            <p className="text-white font-semibold">N/A</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-text-secondary text-sm mb-3">Playing 11</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <div key={i} className="text-text-tertiary text-sm">
                {i}. Player not available
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
