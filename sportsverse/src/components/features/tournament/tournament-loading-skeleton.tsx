'use client'

import { ReactNode } from 'react'

export function TournamentLoadingSkeleton(): ReactNode {
  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Header skeleton */}
      <div className="bg-[#0A0D16] border-b border-white/5">
        <div className="container-max py-6 md:py-8">
          <div className="flex gap-4 mb-6">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-xl animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-8 bg-white/10 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-white/10 rounded w-1/4 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-6 bg-white/10 rounded w-24 animate-pulse" />
                <div className="h-6 bg-white/10 rounded w-24 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="sticky top-16 z-30 bg-[#0A0D16] border-b border-white/5 md:top-20">
        <div className="container-max flex gap-4 py-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-6 bg-white/10 rounded w-20 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container-max py-8 md:py-12 space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <div className="h-6 bg-white/10 rounded w-1/3 animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded animate-pulse" />
              <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-white/10 rounded w-4/6 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
