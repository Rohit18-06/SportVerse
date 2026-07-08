'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTournament } from '@/hooks/useTournament'
import { TournamentHeader } from '@/components/features/tournament/tournament-header'
import { TournamentTabs } from '@/components/features/tournament/tournament-tabs'
import { TournamentOverview } from '@/components/features/tournament/tournament-overview'
import { FixturesList } from '@/components/features/tournament/fixtures-list'
import { ResultsList } from '@/components/features/tournament/results-list'
import { PointsTable } from '@/components/features/tournament/points-table'
import { TeamGrid } from '@/components/features/tournament/team-grid'
import { TournamentNews } from '@/components/features/tournament/tournament-news'
import { TournamentLoadingSkeleton } from '@/components/features/tournament/tournament-loading-skeleton'
import { TournamentErrorState } from '@/components/features/tournament/tournament-error-state'

export default function TournamentPage(): ReactNode {
  const params = useParams()
  const tournamentId = params.tournamentId as string
  
  const { data: tournament, isLoading, error } = useTournament(tournamentId)
  const [activeTab, setActiveTab] = useState('overview')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show loading after mount to prevent hydration mismatch
  if (mounted && isLoading) {
    return <TournamentLoadingSkeleton />
  }

  // Error state
  if (mounted && (error || !tournament)) {
    return <TournamentErrorState statusCode={404} message="Tournament not found or could not be loaded." />
  }

  // Don't render until mounted to match server
  if (!mounted) {
    return null
  }

  // Render tab content
  const renderTabContent = () => {
    const tournamentData = tournament as unknown as Record<string, unknown>
    switch (activeTab) {
      case 'overview':
        return <TournamentOverview tournamentId={tournamentId} tournament={tournamentData as TournamentType} />
      case 'fixtures':
        return <FixturesList tournamentId={tournamentId} />
      case 'results':
        return <ResultsList tournamentId={tournamentId} />
      case 'standings':
        return <PointsTable tournamentId={tournamentId} />
      case 'teams':
        return <TeamGrid tournamentId={tournamentId} />
      case 'news':
        return <TournamentNews tournamentId={tournamentId} />
      default:
        return <TournamentOverview tournamentId={tournamentId} tournament={tournamentData as TournamentType} />
    }
  }

  type TournamentType = {
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

  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Tournament Header */}
      <TournamentHeader tournament={tournament as unknown as TournamentType} />

      {/* Sticky Tabs Navigation */}
      <TournamentTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="container-max py-8 md:py-12 pb-16">
        {renderTabContent()}
      </div>
    </div>
  )
}
