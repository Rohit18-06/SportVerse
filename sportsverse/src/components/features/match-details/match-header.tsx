'use client'

import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { formatFullDate } from '@/lib/date-format'
import type { HighlightlyMatch } from '@/services/api/cricket'

interface MatchHeaderProps {
  match: HighlightlyMatch
}

export function MatchHeader({ match }: MatchHeaderProps): ReactNode {
  // Normalize state.description to our status format
  const normalizeStatus = (description: string): 'live' | 'upcoming' | 'completed' | 'abandoned' => {
    const lower = description.toLowerCase()
    if (lower.includes('live') || lower.includes('in play')) return 'live'
    if (lower.includes('finished') || lower.includes('completed')) return 'completed'
    if (lower.includes('abandoned') || lower.includes('cancelled')) return 'abandoned'
    if (lower.includes('stumps') || lower.includes('lunch') || lower.includes('tea') || lower.includes('innings break')) return 'live'
    return 'upcoming'
  }

  const status = normalizeStatus(match.state.description)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-cyan-400'
      case 'completed':
        return 'text-green-400'
      case 'abandoned':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusLabel = (description: string) => {
    const lower = description.toLowerCase()
    if (lower.includes('stumps')) return 'STUMPS'
    if (lower.includes('lunch')) return 'LUNCH BREAK'
    if (lower.includes('tea')) return 'TEA BREAK'
    if (lower.includes('innings break')) return 'INNINGS BREAK'
    if (lower.includes('live') || lower.includes('in play')) return 'LIVE'
    if (lower.includes('finished') || lower.includes('completed')) return 'FINISHED'
    if (lower.includes('abandoned')) return 'ABANDONED'
    return description.toUpperCase()
  }

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return 'TBD'
    try {
      const date = new Date(dateString)
      return formatFullDate(date)
    } catch {
      return 'TBD'
    }
  }

  return (
    <div className="bg-[#0A0D16] border-b border-white/5 sticky top-16 z-40 md:top-20">
      <div className="container-max">
        {/* Back button and status row */}
        <div className="flex items-center justify-between h-16 md:h-20 py-4 md:py-6">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </Link>

          <div className="flex items-center gap-4">
            {(status === 'live') && (
              <>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                </span>
              </>
            )}
            <span className={`text-sm font-bold uppercase tracking-widest ${getStatusColor(status)}`}>
              {getStatusLabel(match.state.description)}
            </span>
          </div>
        </div>

        {/* Match info: Tournament, Format, Venue, Date */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-t border-white/5 pt-6">
          {/* Tournament */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
              Tournament
            </div>
            <div className="text-sm md:text-base font-medium text-white truncate">
              {match.league?.name || 'N/A'}
            </div>
          </div>

          {/* Format */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
              Format
            </div>
            <div className="text-sm md:text-base font-medium text-white">
              {match.format || 'N/A'}
            </div>
          </div>

          {/* Venue */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
              Venue
            </div>
            <div className="text-sm md:text-base font-medium text-white truncate">
              {match.venue?.name ?? match.venue?.city ?? 'TBD'}
            </div>
          </div>

          {/* Date & Time */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
              Date & Time
            </div>
            <div className="text-sm md:text-base font-medium text-white truncate">
              {formatDateDisplay(match.startTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
