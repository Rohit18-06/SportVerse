'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Today', href: '/' },
  { label: 'Live', href: '/live' },
  { label: 'Upcoming', href: '/upcoming' },
  { label: 'Results', href: '/finished' },
  { label: 'Standings', href: '/standings' },
  { label: 'News', href: '/news' },
]

export function StickyTabs(): ReactNode {
  const pathname = usePathname()

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-[#080B14]/80 backdrop-blur-md border-b border-white/5">
      <div className="container-max">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'py-4 px-1 text-sm md:text-base font-medium whitespace-nowrap relative transition-colors',
                  isActive ? 'text-white' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {tab.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-primary rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
