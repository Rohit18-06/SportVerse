import { formatDate } from '@/lib/date-format'
import { ExternalLink } from 'lucide-react'

interface NewsItem {
  id?: string
  title?: string
  description?: string
  content?: string
  image?: string
  thumbnail?: string
  source?: string
  url?: string
  publishDate?: string
  date?: string
}

interface PlayerNewsProps {
  news: NewsItem[]
  isLoading?: boolean
}

export function PlayerNews({ news, isLoading }: PlayerNewsProps) {
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
        <p className="text-gray-400">No player news available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {news.map((item) => {
        const newsId = item.id || item.title
        const title = item.title || 'News Update'
        const description = item.description || item.content || ''
        const image = item.image || item.thumbnail
        const date = item.publishDate || item.date
        const source = item.source || 'Sports News'

        return (
          <div key={newsId} className="bg-[#1a1f2e] rounded-lg overflow-hidden hover:bg-[#242b3d] transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-4 p-4">
              {/* Image */}
              {image && (
                <div className="flex-shrink-0 w-full md:w-48 h-40 bg-[#0f1419] rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/200x160?text=News'
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {description}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[#0f1419]">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">{source}</p>
                    {date && (
                      <p className="text-xs text-gray-600">{formatDate(new Date(date))}</p>
                    )}
                  </div>

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                    >
                      Read <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
