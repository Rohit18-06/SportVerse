interface NewsItem {
  title?: string
  headline?: string
  summary?: string
  description?: string
  content?: string
  date?: string
  publishedAt?: string
  source?: string
}

interface TeamNewsProps {
  news: NewsItem[]
  isLoading?: boolean
}

export function TeamNews({ news, isLoading }: TeamNewsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-lg h-32 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!news || news.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No team news available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {news.map((item, index) => {
        const title = item.title || item.headline
        const summary = item.summary || item.description || item.content
        const date = item.date || item.publishedAt
        const source = item.source || 'Cricket News'

        return (
          <div key={index} className="bg-[#1a1f2e] rounded-lg p-4 hover:bg-[#242b3d] transition-colors cursor-pointer">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-semibold text-white flex-1 line-clamp-2">{title}</h3>
              {date && (
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(date).toLocaleDateString()}
                </span>
              )}
            </div>

            {summary && (
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{summary}</p>
            )}

            <p className="text-xs text-cyan-400">{source}</p>
          </div>
        )
      })}
    </div>
  )
}
