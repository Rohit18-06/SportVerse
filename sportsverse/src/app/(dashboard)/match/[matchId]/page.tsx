'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useMatchDetails } from '@/hooks/useMatchDetails'
import { MatchHeader } from '@/components/features/match-details/match-header'
import { HeroScoreboard } from '@/components/features/match-details/hero-scoreboard'
import { StickySectionTabs } from '@/components/features/match-details/sticky-section-tabs'
import { OverviewCard } from '@/components/features/match-details/overview-card'
import { ScorecardTable } from '@/components/features/match-details/scorecard-table'
import { CommentaryList } from '@/components/features/match-details/commentary-list'
import { StatisticsGrid } from '@/components/features/match-details/statistics-grid'
import { PlayersSection } from '@/components/features/match-details/players-section'
import { MatchLoadingSkeleton } from '@/components/features/match-details/match-loading-skeleton'
import { MatchErrorState } from '@/components/features/match-details/match-error-state'
import { EMPTY_STATES } from '@/constants/empty-states'

export default function MatchDetailsPage(): ReactNode {
  const params = useParams()
  const matchId = params.matchId as string

  const { data: match, isLoading, error } = useMatchDetails(matchId)
  const [activeTab, setActiveTab] = useState('overview')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show loading after mount to prevent hydration mismatch
  if (mounted && isLoading) {
    return <MatchLoadingSkeleton />
  }

  // Error state - match not found
  if (error || !match) {
    if (mounted) {
      return <MatchErrorState statusCode={404} message={EMPTY_STATES.MATCH_NOT_FOUND} />
    }
    return null
  }

  // Don't render until mounted to match server
  if (!mounted) {
    return null
  }

  // Render tab content
  const renderTabContent = () => {
    if (!match) return null
    
    switch (activeTab) {
      case 'overview':
        return <OverviewCard match={match} />
      case 'scorecard':
        return <ScorecardTable match={match} />
      case 'commentary':
        return <CommentaryList match={match} />
      case 'statistics':
        return <StatisticsGrid match={match} />
      case 'players':
        return <PlayersSection match={match} />
      default:
        return <OverviewCard match={match} />
    }
  }

  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Match Header - Sticky */}
      <MatchHeader match={match} />

      {/* Hero Scoreboard */}
      <HeroScoreboard match={match} />

      {/* Sticky Tabs Navigation */}
      <StickySectionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="container-max py-8 md:py-12 pb-16">
        {renderTabContent()}
      </div>
    </div>
  )
}
