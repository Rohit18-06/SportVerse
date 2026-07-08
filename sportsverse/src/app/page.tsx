import { ReactNode } from 'react'
import { HeroLiveMatch } from '@/components/features/match/hero-live-match'
import { LiveMatchesGrid } from '@/components/features/match/live-matches-grid'
import { UpcomingMatches } from '@/components/features/match/upcoming-matches'
import { RecentResults } from '@/components/features/match/recent-results'
import { StandingsTable } from '@/components/features/standings/standings-table'
import { NewsSection } from '@/components/features/news/news-section'

export default function HomePage(): ReactNode {
  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Main content container with max-width and centering */}
      <div className="container-max py-8 md:py-12">
        {/* Hero Live Match - The centerpiece */}
        <HeroLiveMatch />

        {/* Live Matches Grid */}
        <LiveMatchesGrid />

        {/* Upcoming Matches */}
        <UpcomingMatches />

        {/* Recent Results */}
        <RecentResults />

        {/* Standings */}
        <StandingsTable />

        {/* News Section */}
        <NewsSection />

        {/* Footer padding */}
        <div className="h-12 md:h-16" />
      </div>
    </div>
  )
}
