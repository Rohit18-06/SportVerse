'use client'

import { ReactNode } from 'react'
import { useTournamentNews } from '@/hooks/useTournament'

interface TournamentNewsProps {
  tournamentId: string
}

export function TournamentNews({ tournamentId }: TournamentNewsProps): ReactNode {
  const { data: news = [], isLoading } = useTournamentNews(tournamentId)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!news || news.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <p className="text-text-secondary text-lg">No tournament news available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {news.map((article: unknown, newsIdx: number) => {
        const a = article as Record<string, unknown>
        const key = (a.id as string) || String(newsIdx)
        return (
        <div
          key={key}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-4 md:p-6 hover:border-white/20 transition-colors"
        >
          <div className="flex gap-4">
            {/* Image */}
            <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-2xl">📰</span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">
                {String(a.title)}
              </h3>
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {String(a.description || 'No description available')}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-tertiary">
                  {String(a.source || 'Source unknown')}
                </span>
                <span className="text-xs text-text-tertiary">
                  {a.publishedAt
                    ? new Date(a.publishedAt as string).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Date unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
        )
      })}
    </div>
  )
}
