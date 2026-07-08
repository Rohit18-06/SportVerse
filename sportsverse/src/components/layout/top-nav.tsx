'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Search, Bell, User } from 'lucide-react'
import { useUiStore } from '@/store/ui.store'
import { cn } from '@/lib/utils'

export function TopNav(): ReactNode {
  const showNotifications = useUiStore((state) => state.showNotifications)
  const setShowNotifications = useUiStore((state) => state.setShowNotifications)

  return (
    <header className="sticky top-0 z-50 bg-[#0A0D16]/95 backdrop-blur-md border-b border-white/5 safe-area-inset-top">
      <div className="container-max">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 focus-visible:outline-offset-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan-primary to-cyan-primary/60 flex items-center justify-center">
                <span className="font-display font-bold text-lg md:text-xl text-white">S</span>
              </div>
              <span className="hidden sm:inline font-display font-bold text-lg md:text-xl text-white">
                SportsVerse
              </span>
            </div>
          </Link>

          {/* Sport selector and search - center on desktop, hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center max-w-md">
            <select
              className="bg-white/5 text-white/80 rounded-lg px-3 py-1 text-sm font-medium hover:bg-white/10 transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-primary/50"
              defaultValue="cricket"
            >
              <option value="cricket">Cricket</option>
              <option value="football" disabled>
                Football
              </option>
              <option value="basketball" disabled>
                Basketball
              </option>
            </select>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search button */}
            <button
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Notifications button */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn(
                'p-2 rounded-lg transition-colors relative',
                showNotifications
                  ? 'bg-cyan-primary/20 text-cyan-primary'
                  : 'hover:bg-white/5 text-text-secondary hover:text-text-primary'
              )}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {/* Notification badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile button */}
            <button
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
              aria-label="Profile"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
