'use client'

import { ReactNode } from 'react'
import { SectionHeader } from '@/components/common/section-header'
import { useCricketNews } from '@/hooks/useCricketNews'
import { isRealDataConfigured } from '@/services/cricket-api.service'

interface NewsItem {
  id: string
  headline: string
  excerpt: string
  timestamp: Date
  source: string
  category: string
}

// Mock news data for fallback
const mockNews: NewsItem[] = [
  {
    id: '1',
    headline: 'India clinches thrilling victory against Australia in World Cup semi-final',
    excerpt:
      'Rohit Sharma\'s brilliant 95 and Jasprit Bumrah\'s match-winning spell secure India\'s place in the final.',
    timestamp: new Date(Date.now() - 3600000),
    source: 'Cricket Today',
    category: 'World Cup',
  },
  {
    id: '2',
    headline: 'Virat Kohli breaks another world record with 50th international century',
    excerpt: 'The Indian batting maestro reaches a historic milestone with a stunning century against Pakistan.',
    timestamp: new Date(Date.now() - 7200000),
    source: 'ESPN Cricinfo',
    category: 'Records',
  },
  {
    id: '3',
    headline: 'Pakistan announces squad for upcoming T20 series',
    excerpt:
      'Babar Azam leads the squad with several young talents making their international debut.',
    timestamp: new Date(Date.now() - 10800000),
    source: 'PCB Official',
    category: 'Announcements',
  },
]

function formatTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export function NewsSection(): ReactNode {
  const { data: newsData = [] } = useCricketNews()
  
  // Use real data if configured, otherwise use mock data
  const showRealData = isRealDataConfigured()
  const news: unknown[] = showRealData && Array.isArray(newsData) && newsData.length > 0
    ? newsData.slice(0, 6)
    : mockNews

  if (news.length === 0) {
    return (
      <section className="mb-12 md:mb-16">
        <SectionHeader
          title="Trending Cricket News"
          subtitle="Latest updates and stories"
          action={{ label: 'Read all', href: '/news' }}
        />
        <div className="text-center py-8 text-text-secondary">
          No cricket news currently available.
        </div>
      </section>
    )
  }

  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader
        title="Trending Cricket News"
        subtitle="Latest updates and stories"
        action={{ label: 'Read all', href: '/news' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {Array.isArray(news) && news.map((article) => {
          // Support both API response formats  
          const articleData = article as Record<string, unknown>
          const headline = (articleData?.headline || articleData?.title || 'Cricket News') as string
          const excerpt = (articleData?.excerpt || articleData?.description || '') as string
          const source = (articleData?.source || 'Cricket News') as string
          const timestamp = articleData?.timestamp ? new Date(articleData.timestamp as string | number) : new Date()
          const category = (articleData?.category || 'News') as string
          const id = (articleData?.id || Math.random().toString()) as string

          return (
            <a
              key={id}
              href="#"
              className="card p-4 md:p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-cyan-primary/15 text-cyan-primary rounded-full text-xs font-semibold uppercase tracking-wide">
                  {category}
                </span>
                <span className="text-xs text-text-tertiary">{formatTime(timestamp)}</span>
              </div>

              {/* Headline */}
              <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-primary transition-colors">
                {headline}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {excerpt}
              </p>

              {/* Source */}
              <div className="text-xs text-text-tertiary font-medium">{source}</div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-primary/0 to-cyan-primary/0 group-hover:from-cyan-primary/5 group-hover:to-cyan-primary/5 transition-all duration-300 pointer-events-none" />
            </a>
          )
        })}
      </div>
    </section>
  )
}
