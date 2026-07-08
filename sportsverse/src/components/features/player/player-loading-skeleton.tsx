'use client'

export function PlayerLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Header Skeleton */}
      <div className="sticky top-16 z-40 bg-gradient-to-b from-[#080B14] to-[#0F1419] border-b border-[#1a1f2e] pt-4 pb-6">
        <div className="container-max">
          {/* Main Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            {/* Photo and Info */}
            <div className="flex items-center gap-4">
              {/* Photo skeleton */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-[#1a1f2e] animate-pulse" />
              <div className="flex-1">
                <div className="h-8 md:h-10 bg-[#1a1f2e] rounded w-48 mb-3 animate-pulse" />
                <div className="h-4 bg-[#1a1f2e] rounded w-32 mb-2 animate-pulse" />
                <div className="h-5 bg-[#1a1f2e] rounded w-24 animate-pulse" />
              </div>
            </div>

            {/* Jersey and Age skeleton */}
            <div className="flex gap-4">
              <div className="bg-[#1a1f2e] rounded-lg px-6 py-3 w-24 h-20 animate-pulse" />
              <div className="bg-[#1a1f2e] rounded-lg px-6 py-3 w-24 h-20 animate-pulse" />
            </div>
          </div>

          {/* Stats Grid skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#1a1f2e] rounded-lg p-3 h-20 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-[#080B14] border-b border-[#1a1f2e]">
        <div className="container-max">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="px-4 py-4 h-12 bg-[#1a1f2e] rounded animate-pulse flex-1" />
            ))}
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-max py-8 md:py-12 pb-16">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#1a1f2e] rounded-lg h-32 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
