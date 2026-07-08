'use client'

import { ReactNode } from 'react'
import type { HighlightlyMatch } from '@/services/api/cricket'

interface ScorecardTableProps {
  match: HighlightlyMatch
}

export function ScorecardTable({ match }: ScorecardTableProps): ReactNode {
  return (
    <div className="space-y-8">
      {/* Batting Table */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 overflow-x-auto">
        <h3 className="text-lg font-bold text-white mb-6">
          {match.homeTeam.name} Batting
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                Batsman
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                Runs
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                Balls
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                4s
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                6s
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                SR
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 text-white">No data available</td>
              <td colSpan={5} className="py-4 px-4 text-center text-text-secondary text-sm">
                Scorecard data will appear once the match starts
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bowling Table */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 overflow-x-auto">
        <h3 className="text-lg font-bold text-white mb-6">
          {match.awayTeam.name} Bowling
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                Bowler
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                Overs
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                Runs
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                Wickets
              </th>
              <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                Econ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 text-white">No data available</td>
              <td colSpan={4} className="py-4 px-4 text-center text-text-secondary text-sm">
                Scorecard data will appear once the match starts
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Extras */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6">Extras</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Byes', value: '0' },
            { label: 'Leg Byes', value: '0' },
            { label: 'Wides', value: '0' },
            { label: 'No Balls', value: '0' },
          ].map((extra) => (
            <div key={extra.label} className="border border-white/10 rounded-lg p-4">
              <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-2">
                {extra.label}
              </p>
              <p className="text-2xl font-bold text-white">{extra.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fall of Wickets */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6">Fall of Wickets</h3>
        <div className="space-y-3">
          <p className="text-text-secondary">
            Wicket data will appear once the match starts
          </p>
        </div>
      </div>
    </div>
  )
}
