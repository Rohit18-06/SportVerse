'use client'

import { ReactNode } from 'react'

export function MatchLoadingSkeleton(): ReactNode {
  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Header skeleton */}
      <div className="bg-[#0A0D16] border-b border-white/5">
        <div className="container-max py-6 md:py-8">
          <div className="space-y-4">
            <div className="h-6 bg-white/10 rounded w-1/4 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-white/10 rounded animate-pulse" />
                  <div className="h-6 bg-white/10 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scoreboard skeleton */}
      <div className="container-max py-8 md:py-12">
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="h-20 bg-white/10 rounded animate-pulse" />
              <div className="h-16 bg-white/10 rounded animate-pulse" />
              <div className="h-12 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <div className="h-4 bg-white/10 rounded animate-pulse" />
              <div className="h-8 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="sticky top-[80px] md:top-[100px] z-30 bg-[#0A0D16]/95 border-b border-white/5">
        <div className="container-max flex gap-6 py-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 bg-white/10 rounded w-20 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container-max py-8 md:py-12 space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
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
