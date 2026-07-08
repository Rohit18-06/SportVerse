'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StickyTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function StickySectionTabs({ activeTab, onTabChange }: StickyTabsProps): ReactNode {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'commentary', label: 'Commentary' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'players', label: 'Players' },
  ]

  return (
    <div className="sticky top-[calc(var(--header-height,64px)+80px)] md:top-[calc(var(--header-height,80px)+80px)] z-30 bg-[#0A0D16]/95 backdrop-blur-md border-b border-white/5">
      <div className="container-max">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'px-4 md:px-6 py-4 text-sm font-medium uppercase tracking-widest transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'text-cyan-primary border-b-2 border-cyan-primary'
                  : 'text-text-secondary hover:text-white border-b-2 border-transparent'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
