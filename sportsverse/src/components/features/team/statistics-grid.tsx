interface Team {
  matchesPlayed?: number | string
  matches?: number | string
  wins?: number | string
  losses?: number | string
  winPercentage?: number | string
  runsFor?: number | string
  runsAgainst?: number | string
  netRunRate?: number | string
  averageScore?: number | string
}

interface StatisticsGridProps {
  team: Team | null | undefined
  isLoading?: boolean
}

export function StatisticsGrid({ team, isLoading }: StatisticsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-lg h-32 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!team) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No statistics available.</p>
      </div>
    )
  }

  const stats = [
    { label: 'Matches Played', value: team.matchesPlayed || team.matches },
    { label: 'Wins', value: team.wins },
    { label: 'Losses', value: team.losses },
    { label: 'Win Percentage', value: team.winPercentage },
    { label: 'Runs For', value: team.runsFor },
    { label: 'Runs Against', value: team.runsAgainst },
    { label: 'Net Run Rate', value: team.netRunRate },
    { label: 'Average Score', value: team.averageScore },
  ]

  const availableStats = stats.filter((stat) => stat.value !== undefined && stat.value !== null)

  if (availableStats.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No team statistics available at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {availableStats.map((stat) => (
        <div key={stat.label} className="bg-[#1a1f2e] rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
          <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
