import { ReactNode } from 'react'
import { SectionHeader } from '@/components/common/section-header'

interface Standing {
  rank: number
  teamName: string
  shortName: string
  played: number
  won: number
  lost: number
  nrr: string
  points: number
}

// Mock standings data
const mockStandings: Standing[] = [
  {
    rank: 1,
    teamName: 'India',
    shortName: 'IND',
    played: 5,
    won: 5,
    lost: 0,
    nrr: '+8.45',
    points: 10,
  },
  {
    rank: 2,
    teamName: 'South Africa',
    shortName: 'SA',
    played: 5,
    won: 4,
    lost: 1,
    nrr: '+5.23',
    points: 8,
  },
  {
    rank: 3,
    teamName: 'Australia',
    shortName: 'AUS',
    played: 5,
    won: 3,
    lost: 2,
    nrr: '+2.10',
    points: 6,
  },
  {
    rank: 4,
    teamName: 'England',
    shortName: 'ENG',
    played: 5,
    won: 3,
    lost: 2,
    nrr: '-0.45',
    points: 6,
  },
  {
    rank: 5,
    teamName: 'Pakistan',
    shortName: 'PAK',
    played: 5,
    won: 2,
    lost: 3,
    nrr: '-3.20',
    points: 4,
  },
  {
    rank: 6,
    teamName: 'New Zealand',
    shortName: 'NZ',
    played: 5,
    won: 1,
    lost: 4,
    nrr: '-5.60',
    points: 2,
  },
]

export function StandingsTable(): ReactNode {
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader
        title="Standings"
        subtitle="ICC World Cup 2026"
        action={{ label: 'Full standings', href: '/standings' }}
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Team
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  P
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  W
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  L
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  NRR
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-xs font-semibold text-cyan-primary uppercase tracking-wider">
                  Pts
                </th>
              </tr>
            </thead>
            <tbody>
              {mockStandings.map((team, index) => (
                <tr
                  key={team.shortName}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    index === mockStandings.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-text-tertiary text-sm font-medium w-6 text-center">
                        {team.rank}
                      </span>
                      <div>
                        <div className="text-sm md:text-base font-medium text-white">
                          {team.teamName}
                        </div>
                        <div className="text-xs text-text-tertiary">{team.shortName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center text-sm text-text-secondary">
                    {team.played}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center text-sm text-white font-medium">
                    {team.won}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center text-sm text-text-secondary">
                    {team.lost}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center text-sm font-medium text-text-secondary">
                    {team.nrr}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center text-sm font-bold text-cyan-primary">
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
