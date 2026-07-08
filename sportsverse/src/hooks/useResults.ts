import { useQuery } from '@tanstack/react-query'
import { getResults } from '@/services/api/cricket'

/**
 * Hook to fetch completed cricket matches (results)
 * Automatically refreshes every 5 minutes
 * Caches data for 10 minutes
 */
export function useResults(limit: number = 20) {
  return useQuery({
    queryKey: ['results', limit],
    queryFn: () => getResults(limit),
    staleTime: 10 * 60000, // 10 minutes
    refetchInterval: 5 * 60000, // Refetch every 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
