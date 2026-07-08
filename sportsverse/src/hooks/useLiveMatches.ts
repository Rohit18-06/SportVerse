import { useQuery } from '@tanstack/react-query'
import { getLiveMatches } from '@/services/api/cricket'

/**
 * Hook to fetch live matches with React Query
 * Automatically refetches every 15 seconds
 */
export function useLiveMatches() {
  return useQuery({
    queryKey: ['live-matches'],
    queryFn: getLiveMatches,
    staleTime: 30000, // 30 seconds
    refetchInterval: 15000, // Refetch every 15 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

/**
 * Hook to fetch first live match (hero match)
 */
export function useHeroMatch() {
  const { data: matches, isLoading, error } = useLiveMatches()
  
  return {
    match: matches?.[0] || null,
    isLoading,
    error,
    matches,
  }
}
