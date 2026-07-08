import { PlayerCard } from './player-card'

interface Player {
  id?: string
  playerId?: string
  name?: string
}

interface SquadGridProps {
  squad: Player[]
  isLoading?: boolean
}

export function SquadGrid({ squad, isLoading }: SquadGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!squad || squad.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
        <p className="text-gray-400">Squad information not available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {squad.map((player) => (
        <PlayerCard key={player.id || player.playerId || player.name} player={player} />
      ))}
    </div>
  )
}
