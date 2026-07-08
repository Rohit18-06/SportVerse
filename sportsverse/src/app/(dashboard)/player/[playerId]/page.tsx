'use client'

import { ReactNode, useState } from 'react'
import { useParams } from 'next/navigation'
import { usePlayer, usePlayerCareer, usePlayerMatches, usePlayerStatistics, usePlayerNews } from '@/hooks/usePlayer'
import { PlayerHeader } from '@/components/features/player/player-header'
import { PlayerTabs } from '@/components/features/player/player-tabs'
import { CareerSection } from '@/components/features/player/career-section'
import { RecentMatches } from '@/components/features/player/recent-matches'
import { PlayerStatisticsGrid } from '@/components/features/player/player-statistics-grid'
import { PlayerNews } from '@/components/features/player/player-news'
import { PlayerLoadingSkeleton } from '@/components/features/player/player-loading-skeleton'
import { PlayerErrorState } from '@/components/features/player/player-error-state'

interface Player {
  id?: string
  name?: string
  playerName?: string
  country?: string
  team?: string
  role?: string
  playerRole?: string
  battingStyle?: string
  bowlingStyle?: string
  jerseyNumber?: number | string
  age?: number
  photo?: string
  playerImage?: string
  status?: string
  biography?: string
}

export default function PlayerPage(): ReactNode {
  const params = useParams()
  const playerId = params.playerId as string

  const { data: player, isLoading: playerLoading, error: playerError } = usePlayer(playerId)
  const { data: career, isLoading: careerLoading } = usePlayerCareer(playerId)
  const { data: matches = [], isLoading: matchesLoading } = usePlayerMatches(playerId)
  const { data: statistics, isLoading: statisticsLoading } = usePlayerStatistics(playerId)
  const { data: news = [], isLoading: newsLoading } = usePlayerNews(playerId)

  const [activeTab, setActiveTab] = useState('overview')

  // Loading state
  if (playerLoading) {
    return <PlayerLoadingSkeleton />
  }

  // Error state - player not found
  if (playerError || !player) {
    return <PlayerErrorState statusCode={404} message="Player not found or could not be loaded." />
  }

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Overview Info */}
            <div className="bg-[#1a1f2e] rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {(player as Player)?.team && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Current Team</p>
                    <p className="text-white">{(player as Player).team}</p>
                  </div>
                )}
                {(player as Player)?.role && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Playing Role</p>
                    <p className="text-white">{(player as Player).role}</p>
                  </div>
                )}
                {(player as Player)?.battingStyle && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Batting Style</p>
                    <p className="text-white">{(player as Player).battingStyle}</p>
                  </div>
                )}
                {(player as Player)?.bowlingStyle && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Bowling Style</p>
                    <p className="text-white">{(player as Player).bowlingStyle}</p>
                  </div>
                )}
                {(player as Player)?.status && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Status</p>
                    <p className="text-white">{(player as Player).status}</p>
                  </div>
                )}
              </div>

              {/* Bio */}
              {(player as Player)?.biography && (
                <div className="mt-6 pt-6 border-t border-[#0f1419]">
                  <p className="text-sm text-gray-400 mb-2">Biography</p>
                  <p className="text-gray-300 leading-relaxed">{(player as Player).biography}</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'career':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <CareerSection career={career as any} isLoading={careerLoading} />

      case 'matches':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <RecentMatches matches={matches as any[]} isLoading={matchesLoading} />

      case 'statistics':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <PlayerStatisticsGrid statistics={statistics as any} isLoading={statisticsLoading} />

      case 'news':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <PlayerNews news={news as any[]} isLoading={newsLoading} />

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Player Header */}
      <PlayerHeader player={player as Player} />

      {/* Sticky Tabs */}
      <PlayerTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="container-max py-8 md:py-12 pb-16">
        {renderTabContent()}
      </div>
    </div>
  )
}
