import { useQuery } from '@tanstack/react-query'
import { getTodayMatches } from '@/services/api/cricket'

/**
 * Hook to fetch today's cricket matches
 * Automatically refreshes every 30 seconds
 * Caches data for 1 minute
 */
export function useTodayMatches() {
  return useQuery({
    queryKey: ['today-matches'],
    queryFn: getTodayMatches,
    staleTime: 60000, // 1 minute
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
