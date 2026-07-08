'use client'

import { ReactNode } from 'react'
import { useTournamentStandings } from '@/hooks/useTournament'

interface PointsTableProps {
  tournamentId: string
}

export function PointsTable({ tournamentId }: PointsTableProps): ReactNode {
  const { data: standings = [], isLoading } = useTournamentStandings(tournamentId)

  if (isLoading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg h-96 animate-pulse" />
    )
  }

  if (!standings || standings.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <p className="text-text-secondary text-lg">No standings available yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
              Pos
            </th>
            <th className="text-left py-4 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
              Team
            </th>
            <th className="text-center py-4 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
              P
            </th>
            <th className="text-center py-4 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
              W
            </th>
            <th className="text-center py-4 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
              L
            </th>
            <th className="text-center py-4 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
              NR
            </th>
            <th className="text-center py-4 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
              NRR
            </th>
            <th className="text-right py-4 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
              Pts
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team: unknown, idx: number) => {
            const t = team as Record<string, unknown>
            const key = (t.teamId as string) || String(idx)
            return (
            <tr
              key={key}
              className="border-b border-white/10 hover:bg-white/5 transition-colors"
            >
              <td className="py-4 px-4 text-white font-semibold text-center">
                {String(t.position || idx + 1)}
              </td>
              <td className="py-4 px-4 text-white font-semibold">
                {String(t.teamName || t.team)}
              </td>
              <td className="py-4 px-4 text-center text-white">
                {String(t.played || t.matches || 0)}
              </td>
              <td className="py-4 px-4 text-center text-white">
                {String(t.won || t.wins || 0)}
              </td>
              <td className="py-4 px-4 text-center text-white">
                {String(t.lost || t.losses || 0)}
              </td>
              <td className="py-4 px-4 text-center text-white">
                {String(t.noResult || 0)}
              </td>
              <td className="py-4 px-4 text-center text-white">
                {t.netRunRate ? ((t.netRunRate as number) > 0 ? '+' : '') + (t.netRunRate as number).toFixed(2) : '-'}
              </td>
              <td className="py-4 px-4 text-right font-bold text-cyan-primary">
                {String(t.points || ((t.wins as number || 0) * 2))}
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
