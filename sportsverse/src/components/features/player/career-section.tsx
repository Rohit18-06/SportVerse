interface CareerSectionProps {
  career: {
    matches?: number | string
    innings?: number | string
    runs?: number | string
    average?: number | string
    strikeRate?: number | string
    highestScore?: number | string
    fifties?: number | string
    centuries?: number | string
    wickets?: number | string
    economy?: number | string
    bestBowling?: string
    catches?: number | string
  }
  isLoading?: boolean
}

export function CareerSection({ career, isLoading }: CareerSectionProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!career) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No career statistics available.</p>
      </div>
    )
  }

  const stats = [
    { label: 'Matches', value: career.matches },
    { label: 'Innings', value: career.innings },
    { label: 'Runs', value: career.runs },
    { label: 'Average', value: career.average },
    { label: 'Strike Rate', value: career.strikeRate },
    { label: 'Highest Score', value: career.highestScore },
    { label: '50s', value: career.fifties },
    { label: '100s', value: career.centuries },
    { label: 'Wickets', value: career.wickets },
    { label: 'Economy', value: career.economy },
    { label: 'Best Bowling', value: career.bestBowling },
    { label: 'Catches', value: career.catches },
  ]

  const availableStats = stats.filter((stat) => stat.value !== undefined && stat.value !== null && stat.value !== '')

  if (availableStats.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No career statistics available at this time.</p>
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
