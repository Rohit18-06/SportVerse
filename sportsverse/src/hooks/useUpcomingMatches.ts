import { useQuery } from '@tanstack/react-query'
import { getUpcomingMatches } from '@/services/api/cricket'

/**
 * Hook to fetch upcoming cricket matches
 * Automatically refreshes every minute
 * Caches data for 5 minutes
 */
export function useUpcomingMatches(days: number = 7) {
  return useQuery({
    queryKey: ['upcoming-matches', days],
    queryFn: () => getUpcomingMatches(days),
    staleTime: 5 * 60000, // 5 minutes
    refetchInterval: 60000, // Refetch every minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
