'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useTournamentResults } from '@/hooks/useTournament'

interface ResultsListProps {
  tournamentId: string
}

export function ResultsList({ tournamentId }: ResultsListProps): ReactNode {
  const { data: results = [], isLoading } = useTournamentResults(tournamentId)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <p className="text-text-secondary text-lg">No results available yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result: unknown, resultIdx: number) => {
        const r = result as Record<string, unknown>
        const key = (r.id as string) || String(resultIdx)
        return (
        <Link key={key} href={`/match/${r.id}`}>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-4 md:p-6 hover:border-white/20 transition-colors cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Teams & Score */}
              <div className="md:col-span-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">
                      {r.homeTeam && typeof r.homeTeam === 'object'
                        ? String((r.homeTeam as Record<string, unknown>).shortName || (r.homeTeam as Record<string, unknown>).name)
                        : 'TBD'}
                    </p>
                    <p className="text-sm font-bold text-white">
                      {r.liveData && typeof r.liveData === 'object'
                        ? String(((r.liveData as Record<string, unknown>).homeTeam as Record<string, unknown>)?.score)
                        : 'TBD'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">
                      {r.awayTeam && typeof r.awayTeam === 'object'
                        ? String((r.awayTeam as Record<string, unknown>).shortName || (r.awayTeam as Record<string, unknown>).name)
                        : 'TBD'}
                    </p>
                    <p className="text-sm font-bold text-white">
                      {r.liveData && typeof r.liveData === 'object'
                        ? String(((r.liveData as Record<string, unknown>).awayTeam as Record<string, unknown>)?.score)
                        : 'TBD'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="md:col-span-1 md:text-center">
                <p className="text-text-secondary text-sm">Result</p>
                <p className="text-white font-semibold text-sm">
                  {r.result && typeof r.result === 'object' ? String((r.result as Record<string, unknown>).winner) : 'TBD'}
                </p>
                <p className="text-xs text-text-tertiary">
                  {r.result && typeof r.result === 'object'
                    ? String((r.result as Record<string, unknown>).margin || '-') + ' ' + String((r.result as Record<string, unknown>).marginType || '')
                    : '-'}
                </p>
              </div>

              {/* Date */}
              <div className="md:col-span-1 md:text-right">
                <p className="text-sm text-text-secondary">
                  {r.startTime
                    ? new Date(r.startTime as string).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: '2-digit',
                      })
                    : 'Date TBD'}
                </p>
                <p className="text-xs text-text-tertiary">
                  {String(r.format || 'Match')}
                </p>
              </div>
            </div>

            {r.result && typeof r.result === 'object' && (r.result as Record<string, unknown>).playerOfTheMatch ? (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-text-tertiary">
                  Player of the Match: <span className="text-white font-semibold">{String((r.result as Record<string, unknown>).playerOfTheMatch)}</span>
                </p>
              </div>
            ) : null}
          </div>
        </Link>
        )
      })}
    </div>
  )
}
