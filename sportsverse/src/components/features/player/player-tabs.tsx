'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'

interface PlayerTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'career', label: 'Career' },
  { id: 'matches', label: 'Recent Matches' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'news', label: 'News' },
]

export function PlayerTabs({ activeTab, onTabChange }: PlayerTabsProps) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={clsx(
        'z-30 bg-[#080B14] border-b border-[#1a1f2e] transition-all duration-300',
        isSticky ? 'sticky top-16 shadow-lg' : ''
      )}
    >
      <div className="container-max">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                'px-4 py-4 font-medium whitespace-nowrap transition-all border-b-2',
                activeTab === tab.id
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
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
