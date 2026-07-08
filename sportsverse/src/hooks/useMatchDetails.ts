import { useQuery } from '@tanstack/react-query'
import { getMatchDetails } from '@/services/api/cricket'

/**
 * Hook to fetch match details by ID
 * Uses React Query for caching and auto-refetch
 */
export function useMatchDetails(matchId: string) {
  return useQuery({
    queryKey: ['match', matchId],
    queryFn: () => getMatchDetails(matchId),
    enabled: !!matchId,
    staleTime: 30000, // 30 seconds
    refetchInterval: 15000, // Refetch every 15 seconds for live updates
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
