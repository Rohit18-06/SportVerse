import { useQuery } from '@tanstack/react-query'
import { getTeam, getTeamSquad, getTeamFixtures, getTeamResults, getTeamNews } from '@/services/api/cricket'

export function useTeam(teamId: string) {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: () => getTeam(teamId),
    enabled: !!teamId,
    staleTime: 60000,
    gcTime: 600000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useTeamSquad(teamId: string) {
  return useQuery({
    queryKey: ['team', teamId, 'squad'],
    queryFn: () => getTeamSquad(teamId),
    enabled: !!teamId,
    staleTime: 60000,
    gcTime: 600000,
    retry: 3,
  })
}

export function useTeamFixtures(teamId: string) {
  return useQuery({
    queryKey: ['team', teamId, 'fixtures'],
    queryFn: () => getTeamFixtures(teamId),
    enabled: !!teamId,
    staleTime: 30000,
    refetchInterval: 30000,
    gcTime: 600000,
    retry: 3,
  })
}

export function useTeamResults(teamId: string) {
  return useQuery({
    queryKey: ['team', teamId, 'results'],
    queryFn: () => getTeamResults(teamId),
    enabled: !!teamId,
    staleTime: 60000,
    gcTime: 600000,
    retry: 3,
  })
}

export function useTeamNews(teamId: string) {
  return useQuery({
    queryKey: ['team', teamId, 'news'],
    queryFn: () => getTeamNews(teamId),
    enabled: !!teamId,
    staleTime: 120000,
    gcTime: 600000,
    retry: 2,
  })
}
