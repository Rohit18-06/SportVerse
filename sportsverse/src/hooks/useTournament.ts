import { useQuery } from '@tanstack/react-query'
import { getSeries, getSeriesMatches, getStandings, getNews } from '@/services/api/cricket'

/**
 * Hook to fetch tournament/series details by ID
 */
export function useTournament(tournamentId: string) {
  return useQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: () => getSeries(tournamentId),
    enabled: !!tournamentId,
    staleTime: 60000, // 1 minute
    retry: 2,
  })
}

/**
 * Hook to fetch tournament fixtures (all matches)
 */
export function useTournamentFixtures(tournamentId: string, status: string = 'upcoming') {
  return useQuery({
    queryKey: ['tournament-fixtures', tournamentId, status],
    queryFn: () => getSeriesMatches(tournamentId, status),
    enabled: !!tournamentId,
    staleTime: 30000, // 30 seconds
    refetchInterval: 15000, // Refetch every 15 seconds
    retry: 2,
  })
}

/**
 * Hook to fetch tournament results (completed matches)
 */
export function useTournamentResults(tournamentId: string) {
  return useQuery({
    queryKey: ['tournament-results', tournamentId],
    queryFn: () => getSeriesMatches(tournamentId, 'completed'),
    enabled: !!tournamentId,
    staleTime: 30000,
    retry: 2,
  })
}

/**
 * Hook to fetch tournament standings/points table
 */
export function useTournamentStandings(tournamentId: string) {
  return useQuery({
    queryKey: ['tournament-standings', tournamentId],
    queryFn: () => getStandings(tournamentId),
    enabled: !!tournamentId,
    staleTime: 60000, // 1 minute
    retry: 2,
  })
}

/**
 * Hook to fetch tournament teams
 * Derived from standings or matches
 */
export function useTournamentTeams(tournamentId: string) {
  const { data: standings } = useTournamentStandings(tournamentId)

  type TeamType = Record<string, unknown>
  const teams: TeamType[] = standings?.map((team: unknown) => {
    const t = team as TeamType
    return {
      id: t.teamId || (t.team as Record<string, unknown>)?.id,
      name: t.teamName || (t.team as Record<string, unknown>)?.name || t.team,
      logo: t.logo || 'https://via.placeholder.com/64',
      country: t.country || 'TBD',
    }
  }) || []

  return { data: teams }
}

/**
 * Hook to fetch tournament news
 */
export function useTournamentNews(tournamentId: string) {
  return useQuery({
    queryKey: ['tournament-news', tournamentId],
    queryFn: () => getNews(10),
    enabled: !!tournamentId,
    staleTime: 300000, // 5 minutes
    retry: 1,
  })
}
