import { useQuery } from '@tanstack/react-query'
import { getCricketNews } from '@/services/api/cricket'

/**
 * Hook to fetch latest cricket news
 * Automatically refreshes every 15 minutes
 * Caches data for 5 minutes
 */
export function useCricketNews(limit: number = 20) {
  return useQuery<unknown[]>({
    queryKey: ['cricket-news', limit],
    queryFn: () => getCricketNews(limit),
    staleTime: 5 * 60000, // 5 minutes
    refetchInterval: 15 * 60000, // Refetch every 15 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
