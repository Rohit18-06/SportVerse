'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface TournamentHeaderProps {
  tournament: {
    id: string
    name: string
    format?: string
    status?: string
    season?: string
    startDate?: string
    endDate?: string
    logo?: string
    country?: string
  }
}

export function TournamentHeader({ tournament }: TournamentHeaderProps): ReactNode {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBD'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return 'TBD'
    }
  }

  const getStatusLabel = (status?: string) => {
    if (!status) return 'TBD'
    const statusMap: Record<string, string> = {
      live: 'ONGOING',
      upcoming: 'UPCOMING',
      completed: 'COMPLETED',
      abandoned: 'ABANDONED',
    }
    return statusMap[status.toLowerCase()] || status.toUpperCase()
  }

  const getStatusColor = (status?: string) => {
    if (!status) return 'text-text-secondary'
    const colorMap: Record<string, string> = {
      live: 'text-cyan-primary',
      ongoing: 'text-cyan-primary',
      upcoming: 'text-text-secondary',
      completed: 'text-green-500',
    }
    return colorMap[status.toLowerCase()] || 'text-text-secondary'
  }

  return (
    <div className="bg-[#0A0D16] border-b border-white/5 sticky top-16 z-40 md:top-20">
      <div className="container-max">
        {/* Back button and status */}
        <div className="flex items-center justify-between h-16 md:h-20 py-4 md:py-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </Link>

          <div className={`text-sm font-bold uppercase tracking-widest ${getStatusColor(tournament.status)}`}>
            {getStatusLabel(tournament.status)}
          </div>
        </div>

        {/* Tournament info */}
        <div className="py-6 md:py-8">
          <div className="flex items-start gap-4 md:gap-6 mb-6">
            {/* Logo placeholder */}
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-cyan-primary/20 to-cyan-primary/5 flex-shrink-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-cyan-primary">T</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {tournament.name}
              </h1>
              <p className="text-text-secondary text-sm md:text-base mb-4">
                {tournament.format || 'Format TBD'} • {tournament.season || 'Season TBD'}
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {tournament.startDate && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-1">
                      Start Date
                    </p>
                    <p className="text-sm md:text-base font-medium text-white">
                      {formatDate(tournament.startDate)}
                    </p>
                  </div>
                )}
                {tournament.endDate && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-1">
                      End Date
                    </p>
                    <p className="text-sm md:text-base font-medium text-white">
                      {formatDate(tournament.endDate)}
                    </p>
                  </div>
                )}
                {tournament.country && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-1">
                      Country
                    </p>
                    <p className="text-sm md:text-base font-medium text-white">
                      {tournament.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
