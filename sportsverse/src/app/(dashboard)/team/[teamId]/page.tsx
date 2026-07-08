'use client'

import { ReactNode, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTeam, useTeamSquad, useTeamFixtures, useTeamResults, useTeamNews } from '@/hooks/useTeam'
import { TeamHeader } from '@/components/features/team/team-header'
import { TeamTabs } from '@/components/features/team/team-tabs'
import { SquadGrid } from '@/components/features/team/squad-grid'
import { FixturesList } from '@/components/features/team/fixtures-list'
import { ResultsList } from '@/components/features/team/results-list'
import { StatisticsGrid } from '@/components/features/team/statistics-grid'
import { TeamNews } from '@/components/features/team/team-news'
import { TeamLoadingSkeleton } from '@/components/features/team/team-loading-skeleton'
import { TeamErrorState } from '@/components/features/team/team-error-state'

export default function TeamPage(): ReactNode {
  const params = useParams()
  const teamId = params.teamId as string

  const { data: team, isLoading: teamLoading, error: teamError } = useTeam(teamId)
  const { data: squad = [], isLoading: squadLoading } = useTeamSquad(teamId)
  const { data: fixtures = [], isLoading: fixturesLoading } = useTeamFixtures(teamId)
  const { data: results = [], isLoading: resultsLoading } = useTeamResults(teamId)
  const { data: news = [], isLoading: newsLoading } = useTeamNews(teamId)

  const [activeTab, setActiveTab] = useState('overview')

  // Loading state
  if (teamLoading) {
    return <TeamLoadingSkeleton />
  }

  // Error state - team not found
  if (teamError || !team) {
    return <TeamErrorState statusCode={404} message="Team not found or could not be loaded." />
  }

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-[#1a1f2e] rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Team Overview</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(team as any)?.description && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">About</p>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <p className="text-white">{(team as any).description}</p>
                  </div>
                )}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(team as any)?.homeGround && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Home Ground</p>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <p className="text-white">{(team as any).homeGround}</p>
                  </div>
                )}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(team as any)?.founded && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Founded</p>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <p className="text-white">{(team as any).founded}</p>
                  </div>
                )}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(team as any)?.country && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Country</p>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <p className="text-white">{(team as any).country}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Next Match */}
            {fixtures && fixtures.length > 0 && (
              <div className="bg-[#1a1f2e] rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Next Match</h3>
                <FixturesList fixtures={[fixtures[0]]} />
              </div>
            )}
          </div>
        )
      case 'squad':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <SquadGrid squad={squad as any} isLoading={squadLoading} />
      case 'fixtures':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <FixturesList fixtures={fixtures as any} isLoading={fixturesLoading} />
      case 'results':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <ResultsList results={results as any} isLoading={resultsLoading} />
      case 'statistics':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <StatisticsGrid team={team as any} isLoading={teamLoading} />
      case 'news':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <TeamNews news={news as any} isLoading={newsLoading} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Team Header */}
      <TeamHeader team={team} />

      {/* Sticky Tabs */}
      <TeamTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="container-max py-8 md:py-12 pb-16">
        {renderTabContent()}
      </div>
    </div>
  )
}
