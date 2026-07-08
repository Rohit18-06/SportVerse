import { useQuery } from '@tanstack/react-query'
import { getPlayer, getPlayerCareer, getPlayerMatches, getPlayerStatistics, getPlayerNews } from '@/services/api/cricket'

export function usePlayer(playerId: string) {
  return useQuery({
    queryKey: ['player', playerId],
    queryFn: () => getPlayer(playerId),
    enabled: !!playerId,
    staleTime: 60000,
    gcTime: 600000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function usePlayerCareer(playerId: string) {
  return useQuery({
    queryKey: ['player', playerId, 'career'],
    queryFn: () => getPlayerCareer(playerId),
    enabled: !!playerId,
    staleTime: 120000,
    gcTime: 600000,
    retry: 2,
  })
}

export function usePlayerMatches(playerId: string) {
  return useQuery({
    queryKey: ['player', playerId, 'matches'],
    queryFn: () => getPlayerMatches(playerId),
    enabled: !!playerId,
    staleTime: 60000,
    gcTime: 600000,
    retry: 2,
  })
}

export function usePlayerStatistics(playerId: string) {
  return useQuery({
    queryKey: ['player', playerId, 'statistics'],
    queryFn: () => getPlayerStatistics(playerId),
    enabled: !!playerId,
    staleTime: 120000,
    gcTime: 600000,
    retry: 2,
  })
}

export function usePlayerNews(playerId: string) {
  return useQuery({
    queryKey: ['player', playerId, 'news'],
    queryFn: () => getPlayerNews(playerId),
    enabled: !!playerId,
    staleTime: 120000,
    gcTime: 600000,
    retry: 1,
  })
}
