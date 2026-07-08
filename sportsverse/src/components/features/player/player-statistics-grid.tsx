interface Stats {
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
  fourWickets?: number | string
  fiveWickets?: number | string
  runsConceded?: number | string
  catches?: number | string
  stumpings?: number | string
  runOuts?: number | string
}

interface PlayerStatisticsGridProps {
  statistics: {
    batting?: Stats
    bowling?: Stats
    fielding?: Stats
  } | null
  isLoading?: boolean
}

export function PlayerStatisticsGrid({ statistics, isLoading }: PlayerStatisticsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!statistics) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No statistics available.</p>
      </div>
    )
  }

  const batting = statistics?.batting || {}
  const bowling = statistics?.bowling || {}
  const fielding = statistics?.fielding || {}

  const hasBatting = Object.keys(batting).some((key) => batting[key as keyof Stats] !== undefined && batting[key as keyof Stats] !== null)
  const hasBowling = Object.keys(bowling).some((key) => bowling[key as keyof Stats] !== undefined && bowling[key as keyof Stats] !== null)
  const hasFielding = Object.keys(fielding).some((key) => fielding[key as keyof Stats] !== undefined && fielding[key as keyof Stats] !== null)

  if (!hasBatting && !hasBowling && !hasFielding) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">No statistics available at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Batting Statistics */}
      {hasBatting && (
        <div className="bg-[#1a1f2e] rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-cyan-400 rounded"></span>
            Batting
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Matches', value: batting.matches },
              { label: 'Innings', value: batting.innings },
              { label: 'Runs', value: batting.runs },
              { label: 'Average', value: batting.average },
              { label: 'Strike Rate', value: batting.strikeRate },
              { label: 'Highest Score', value: batting.highestScore },
              { label: '50s', value: batting.fifties },
              { label: '100s', value: batting.centuries },
            ]
              .filter((stat) => stat.value !== undefined && stat.value !== null && stat.value !== '')
              .map((stat) => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className="text-white font-semibold">{stat.value}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Bowling Statistics */}
      {hasBowling && (
        <div className="bg-[#1a1f2e] rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-amber-400 rounded"></span>
            Bowling
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Matches', value: bowling.matches },
              { label: 'Innings', value: bowling.innings },
              { label: 'Wickets', value: bowling.wickets },
              { label: 'Runs Conceded', value: bowling.runsConceded },
              { label: 'Economy', value: bowling.economy },
              { label: 'Average', value: bowling.average },
              { label: 'Best Bowling', value: bowling.bestBowling },
              { label: '4 Wickets', value: bowling.fourWickets },
              { label: '5 Wickets', value: bowling.fiveWickets },
            ]
              .filter((stat) => stat.value !== undefined && stat.value !== null && stat.value !== '')
              .map((stat) => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className="text-white font-semibold">{stat.value}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Fielding Statistics */}
      {hasFielding && (
        <div className="bg-[#1a1f2e] rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-400 rounded"></span>
            Fielding
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Matches', value: fielding.matches },
              { label: 'Catches', value: fielding.catches },
              { label: 'Stumpings', value: fielding.stumpings },
              { label: 'Run Outs', value: fielding.runOuts },
            ]
              .filter((stat) => stat.value !== undefined && stat.value !== null && stat.value !== '')
              .map((stat) => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className="text-white font-semibold">{stat.value}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
