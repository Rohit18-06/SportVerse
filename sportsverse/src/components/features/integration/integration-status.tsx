'use client'

import { ReactNode, useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'

interface EndpointStatus {
  name: string
  endpoint: string
  status: 'checking' | 'ok' | 'error'
  responseTime?: number
  error?: string
}

export function IntegrationStatus(): ReactNode {
  const [statuses, setStatuses] = useState<EndpointStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkEndpoints = async () => {
      const endpoints: Omit<EndpointStatus, 'status' | 'responseTime' | 'error'>[] = [
        { name: 'Live Matches', endpoint: '/api/v1/cricket/live' },
        { name: 'Series Details', endpoint: '/api/v1/cricket/series/ipl' },
        { name: 'Series Matches', endpoint: '/api/v1/cricket/series/ipl/matches' },
        { name: 'Standings', endpoint: '/api/v1/cricket/standings/ipl' },
        { name: 'Today Matches', endpoint: '/api/v1/cricket/today' },
        { name: 'Upcoming Matches', endpoint: '/api/v1/cricket/upcoming' },
        { name: 'Results', endpoint: '/api/v1/cricket/results' },
        { name: 'News', endpoint: '/api/v1/cricket/news' },
      ]

      const results: EndpointStatus[] = []

      for (const ep of endpoints) {
        const startTime = Date.now()
        try {
          const response = await fetch(`http://localhost:8000${ep.endpoint}`, {
            cache: 'no-store',
          })
          const responseTime = Date.now() - startTime

          results.push({
            ...ep,
            status: response.ok ? 'ok' : 'error',
            responseTime,
            error: response.ok ? undefined : `HTTP ${response.status}`,
          })
        } catch (error) {
          results.push({
            ...ep,
            status: 'error',
            error: String(error),
          })
        }
      }

      setStatuses(results)
      setIsLoading(false)
    }

    checkEndpoints()
  }, [])

  const passed = statuses.filter((s) => s.status === 'ok').length
  const failed = statuses.filter((s) => s.status === 'error').length
  const total = statuses.length

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-center gap-3 text-text-secondary">
          <Loader className="w-5 h-5 animate-spin" />
          <span>Testing backend-frontend connection...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <h3 className="text-lg font-bold text-white">API Integration Status</h3>
        <div className="text-sm">
          <span className="text-cyan-primary font-semibold">{passed}</span>
          <span className="text-text-secondary">/</span>
          <span className="text-text-secondary">{total}</span>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="space-y-3">
        {statuses.map((status) => (
          <div key={status.endpoint} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3 flex-1">
              {status.status === 'ok' && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
              {status.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{status.name}</p>
                <p className="text-xs text-text-tertiary truncate">{status.endpoint}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-4">
              {status.responseTime && (
                <span className="text-xs text-text-secondary whitespace-nowrap">
                  {status.responseTime}ms
                </span>
              )}
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  status.status === 'ok'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {status.status === 'ok' ? 'OK' : 'ERROR'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-sm text-text-secondary">
          {failed === 0 ? (
            <>
              <span className="text-green-400 font-semibold">✓ All systems operational</span>
              <span className="text-text-tertiary ml-2">Backend and frontend are connected successfully.</span>
            </>
          ) : (
            <>
              <span className="text-red-400 font-semibold">⚠ {failed} endpoint(s) failed</span>
              <span className="text-text-tertiary ml-2">Check backend logs for more details.</span>
            </>
          )}
        </p>
        <div className="mt-3 text-xs text-text-tertiary space-y-1">
          <p>Frontend: http://localhost:3000</p>
          <p>Backend: http://localhost:8000</p>
          <p>API Base: {process.env.NEXT_PUBLIC_API_URL}</p>
        </div>
      </div>
    </div>
  )
}
