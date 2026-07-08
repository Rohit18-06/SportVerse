import { Trophy, Globe, User } from 'lucide-react'

interface TeamHeaderProps {
  team: {
    logo?: string
    teamLogo?: string
    name?: string
    teamName?: string
    country?: string
    ranking?: number | string
    iccRanking?: number | string
    captain?: string
    captainName?: string
    coach?: string
    coachName?: string
    founded?: string | number
    homeGround?: string
  }
}

export function TeamHeader({ team }: TeamHeaderProps) {
  const logo = team?.logo || team?.teamLogo
  const name = team?.name || team?.teamName || 'Team'
  const country = team?.country || 'N/A'
  const ranking = team?.ranking || team?.iccRanking || null
  const captain = team?.captain || team?.captainName || null
  const coach = team?.coach || team?.coachName || null

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-b from-[#080B14] to-[#0F1419] border-b border-[#1a1f2e] pt-4 pb-6">
      <div className="container-max">
        {/* Main Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          {/* Logo and Name */}
          <div className="flex items-center gap-4">
            {logo && (
              <img
                src={logo}
                alt={name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/128?text=Team'
                }}
              />
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{name}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="w-5 h-5" />
                <span>{country}</span>
              </div>
            </div>
          </div>

          {/* Ranking */}
          {ranking && (
            <div className="flex items-center gap-3 bg-[#1a1f2e] px-4 py-3 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">ICC Ranking</p>
                <p className="text-2xl font-bold text-white">#{ranking}</p>
              </div>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {captain && (
            <div className="bg-[#1a1f2e] rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Captain</p>
              <p className="font-semibold text-white flex items-center gap-2">
                <User className="w-4 h-4" />
                {captain}
              </p>
            </div>
          )}

          {coach && (
            <div className="bg-[#1a1f2e] rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Coach</p>
              <p className="font-semibold text-white flex items-center gap-2">
                <User className="w-4 h-4" />
                {coach}
              </p>
            </div>
          )}

          {team?.founded && (
            <div className="bg-[#1a1f2e] rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Founded</p>
              <p className="font-semibold text-white">{team.founded}</p>
            </div>
          )}

          {team?.homeGround && (
            <div className="bg-[#1a1f2e] rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Home Ground</p>
              <p className="font-semibold text-white">{team.homeGround}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
