'use client'

import { ReactNode } from 'react'
import type { HighlightlyMatch } from '@/services/api/cricket'

interface StatisticsGridProps {
  match: HighlightlyMatch
}

export function StatisticsGrid({ match }: StatisticsGridProps): ReactNode {
  const innings = match.statistics

  if (!innings || innings.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <p className="text-text-secondary text-lg">Statistics will be available once the match starts.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {innings.map((inning) => {
        const teamName = inning.team.name

        return (
          <div key={inning.inningNumber} className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-cyan-primary rounded-full" />
              <div>
                <h2 className="text-xl font-bold text-white">
                  {teamName}
                </h2>
                <p className="text-sm text-text-secondary">
                  Inning {inning.inningNumber}
                  {inning.team.extras > 0 && ` | Extras: ${inning.team.extras}`}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 overflow-x-auto">
              <h3 className="text-lg font-bold text-white mb-6">Batting</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Batsman
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Runs
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Balls
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      4s
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      6s
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      SR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inning.inningBatsmen.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-text-secondary text-sm">
                        No batting data available
                      </td>
                    </tr>
                  ) : (
                    inning.inningBatsmen.map((batsman, idx) => (
                      <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="text-white">{batsman.player.name}</span>
                            {batsman.dismissalStatus && (
                              <span className="text-xs text-text-tertiary mt-0.5">
                                {batsman.dismissalStatus}
                                {batsman.dismissalFielders.length > 0 && (
                                  <span>
                                    {' '}c {batsman.dismissalFielders.map((f) => f.name).join(', ')}
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-3 px-4 text-white font-semibold">
                          {batsman.runs}
                        </td>
                        <td className="text-center py-3 px-4 text-text-secondary">
                          {batsman.balls}
                        </td>
                        <td className="text-center py-3 px-4 text-text-secondary">
                          {batsman.fours}
                        </td>
                        <td className="text-center py-3 px-4 text-text-secondary">
                          {batsman.sixes}
                        </td>
                        <td className="text-center py-3 px-4 text-text-secondary">
                          {batsman.battingStrikeRate.toFixed(1)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 overflow-x-auto">
              <h3 className="text-lg font-bold text-white mb-6">Bowling</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Bowler
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Overs
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Maidens
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Runs
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Wickets
                    </th>
                    <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                      Econ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inning.inningBowlers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-text-secondary text-sm">
                        No bowling data available
                      </td>
                    </tr>
                  ) : (
                    inning.inningBowlers.map((bowler, idx) => (
                      <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-white">{bowler.player.name}</td>
                        <td className="text-center py-3 px-4 text-text-secondary">{bowler.overs}</td>
                        <td className="text-center py-3 px-4 text-text-secondary">{bowler.maidens}</td>
                        <td className="text-center py-3 px-4 text-text-secondary">{bowler.concededRuns}</td>
                        <td className="text-center py-3 px-4 text-white font-semibold">{bowler.wickets}</td>
                        <td className="text-center py-3 px-4 text-text-secondary">{bowler.economy.toFixed(1)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-6">Extras</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Byes', value: inning.team.byes },
                  { label: 'Leg Byes', value: inning.team.legByes },
                  { label: 'Wides', value: inning.team.wides },
                  { label: 'No Balls', value: inning.team.noBalls },
                  { label: 'Total Extras', value: inning.team.extras },
                ].map((extra) => (
                  <div key={extra.label} className="border border-white/10 rounded-lg p-4">
                    <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-2">
                      {extra.label}
                    </p>
                    <p className="text-2xl font-bold text-white">{extra.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {inning.fallOfWickets.length > 0 && (
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold text-white mb-6">Fall of Wickets</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                          Wicket
                        </th>
                        <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                          Runs
                        </th>
                        <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                          Over
                        </th>
                        <th className="text-left py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                          Batsman
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {inning.fallOfWickets.map((wicket) => (
                        <tr key={wicket.order} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-white">{wicket.order}</td>
                          <td className="text-center py-3 px-4 text-text-secondary">{wicket.runs}</td>
                          <td className="text-center py-3 px-4 text-text-secondary">{wicket.overs}</td>
                          <td className="py-3 px-4 text-text-secondary">{wicket.dismissalBatsman.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {inning.inningPartnerships.length > 0 && (
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold text-white mb-6">Partnerships</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                          Batters
                        </th>
                        <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                          Runs
                        </th>
                        <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                          Balls
                        </th>
                        <th className="text-center py-3 px-4 text-text-secondary font-semibold text-xs uppercase tracking-widest">
                          Overs
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {inning.inningPartnerships.map((partnership, idx) => (
                        <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span className="text-white">{partnership.firstPlayer.name}</span>
                              <span className="text-xs text-text-tertiary">
                                ({partnership.firstPlayerRuns} runs, {partnership.firstPlayerBalls} balls)
                              </span>
                              <span className="text-white mt-1">{partnership.secondPlayer.name}</span>
                              <span className="text-xs text-text-tertiary">
                                ({partnership.secondPlayerRuns} runs, {partnership.secondPlayerBalls} balls)
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4 text-white font-semibold">{partnership.runs}</td>
                          <td className="text-center py-3 px-4 text-text-secondary">{partnership.balls}</td>
                          <td className="text-center py-3 px-4 text-text-secondary">{partnership.overs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {inning.fieldingSummary && (
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold text-white mb-6">Fielding Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Catches', value: inning.fieldingSummary.catches },
                    { label: 'Run Outs', value: inning.fieldingSummary.runOuts },
                    { label: 'Stumpings', value: inning.fieldingSummary.stumpings },
                    { label: 'Drops', value: inning.fieldingSummary.catchesDropped },
                  ].map((field) => (
                    <div key={field.label} className="border border-white/10 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-2">
                        {field.label}
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {field.value !== null ? field.value : 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
