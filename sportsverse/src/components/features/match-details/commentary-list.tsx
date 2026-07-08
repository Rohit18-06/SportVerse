'use client'

import { ReactNode } from 'react'
import type { HighlightlyMatch } from '@/services/api/cricket'

interface CommentaryListProps {
  match: HighlightlyMatch
}

export function CommentaryList({ match }: CommentaryListProps): ReactNode {
  const isLive = match.state.description.toLowerCase().includes('in play')
  
  return (
    <div>
      {isLive ? (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-text-secondary text-lg">Live commentary is not available for this match.</p>
          <p className="text-text-tertiary text-sm mt-2">Check back soon as the match progresses.</p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-text-secondary text-lg">Commentary will be available once the match starts.</p>
        </div>
      )}
    </div>
  )
}
