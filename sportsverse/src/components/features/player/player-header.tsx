interface PlayerHeaderProps {
  player: {
    photo?: string
    playerImage?: string
    name?: string
    playerName?: string
    country?: string
    team?: string
    role?: string
    playerRole?: string
    battingStyle?: string
    bowlingStyle?: string
    jerseyNumber?: number | string
    age?: number
  }
}

export function PlayerHeader({ player }: PlayerHeaderProps) {
  const name = player?.name || player?.playerName || 'Player'
  const country = player?.country || 'N/A'
  const team = player?.team || 'N/A'
  const role = player?.role || player?.playerRole || 'N/A'
  const batting = player?.battingStyle || 'N/A'
  const bowling = player?.bowlingStyle || 'N/A'
  const jersey = player?.jerseyNumber
  const age = player?.age
  const photo = player?.photo || player?.playerImage

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-b from-[#080B14] to-[#0F1419] border-b border-[#1a1f2e] pt-4 pb-6">
      <div className="container-max">
        {/* Main Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          {/* Photo and Info */}
          <div className="flex items-center gap-4">
            {photo && (
              <img
                src={photo}
                alt={name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/128?text=Player'
                }}
              />
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{name}</h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <span>{country}</span>
                {team !== 'N/A' && (
                  <>
                    <span>•</span>
                    <span>{team}</span>
                  </>
                )}
              </div>
              <div className="text-cyan-400 font-semibold">{role}</div>
            </div>
          </div>

          {/* Jersey and Age */}
          <div className="flex gap-4">
            {jersey && (
              <div className="bg-[#1a1f2e] rounded-lg px-6 py-3 text-center">
                <p className="text-sm text-gray-400 mb-1">Jersey</p>
                <p className="text-2xl font-bold text-white">#{jersey}</p>
              </div>
            )}
            {age && (
              <div className="bg-[#1a1f2e] rounded-lg px-6 py-3 text-center">
                <p className="text-sm text-gray-400 mb-1">Age</p>
                <p className="text-2xl font-bold text-white">{age}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {batting !== 'N/A' && (
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Batting</p>
              <p className="font-semibold text-white">{batting}</p>
            </div>
          )}
          {bowling !== 'N/A' && (
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Bowling</p>
              <p className="font-semibold text-white">{bowling}</p>
            </div>
          )}
          {team !== 'N/A' && (
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Team</p>
              <p className="font-semibold text-white">{team}</p>
            </div>
          )}
          {role !== 'N/A' && (
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Role</p>
              <p className="font-semibold text-white">{role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
