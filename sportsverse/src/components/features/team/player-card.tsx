import Link from 'next/link'
import { User } from 'lucide-react'

interface Player {
  id?: string
  playerId?: string
  name?: string
  playerName?: string
  role?: string
  playerRole?: string
  jerseyNumber?: number | string
  number?: number | string
  battingStyle?: string
  batStyle?: string
  bowlingStyle?: string
  bowlStyle?: string
  image?: string
  playerImage?: string
}

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
  const name = player?.name || player?.playerName || 'Unknown Player'
  const role = player?.role || player?.playerRole || 'N/A'
  const jerseyNumber = player?.jerseyNumber || player?.number
  const battingStyle = player?.battingStyle || player?.batStyle || 'N/A'
  const bowlingStyle = player?.bowlingStyle || player?.bowlStyle
  const image = player?.image || player?.playerImage
  const playerId = player?.id || player?.playerId

  return (
    <Link href={`/player/${playerId}`} className="group">
      <div className="bg-[#1a1f2e] rounded-lg overflow-hidden hover:bg-[#242b3d] transition-all duration-300">
        {/* Player Image */}
        <div className="relative aspect-square bg-[#0f1419] overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/200?text=Player'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-600" />
            </div>
          )}

          {/* Jersey Number */}
          {jerseyNumber && (
            <div className="absolute top-2 right-2 bg-cyan-500 text-white font-bold px-3 py-1 rounded-full text-sm">
              #{jerseyNumber}
            </div>
          )}
        </div>

        {/* Player Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white mb-1 truncate group-hover:text-cyan-400 transition-colors">
            {name}
          </h3>

          {/* Role */}
          <p className="text-sm text-cyan-400 mb-3 font-medium">{role}</p>

          {/* Batting and Bowling Styles */}
          <div className="space-y-2 text-xs text-gray-400">
            <div>
              <span className="text-gray-500">Batting:</span> {battingStyle}
            </div>
            {bowlingStyle && (
              <div>
                <span className="text-gray-500">Bowling:</span> {bowlingStyle}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
