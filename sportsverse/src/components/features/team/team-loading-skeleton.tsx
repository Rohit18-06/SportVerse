export function TeamLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Header Skeleton */}
      <div className="sticky top-16 z-40 bg-gradient-to-b from-[#080B14] to-[#0F1419] border-b border-[#1a1f2e] pt-4 pb-6">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#1a1f2e] rounded-lg animate-pulse" />
              <div className="flex-1">
                <div className="h-8 bg-[#1a1f2e] rounded w-48 mb-3 animate-pulse" />
                <div className="h-4 bg-[#1a1f2e] rounded w-24 animate-pulse" />
              </div>
            </div>
            <div className="bg-[#1a1f2e] px-4 py-3 rounded-lg h-16 w-40 animate-pulse" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#1a1f2e] rounded-lg p-4 h-20 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-[#080B14] border-b border-[#1a1f2e]">
        <div className="container-max flex gap-4 py-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-[#1a1f2e] rounded w-20 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-max py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#1a1f2e] rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
