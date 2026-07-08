'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { AlertCircle, Home } from 'lucide-react'

interface MatchErrorStateProps {
  statusCode?: number
  message?: string
}

export function MatchErrorState({ statusCode = 404, message }: MatchErrorStateProps): ReactNode {
  const isNotFound = statusCode === 404
  const title = isNotFound ? 'Match Not Found' : 'Unable to Load Match'
  const description = message || (isNotFound 
    ? 'The match you\'re looking for doesn\'t exist or has been removed.'
    : 'Something went wrong while loading the match details. Please try again.')

  return (
    <div className="min-h-screen bg-[#080B14] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {title}
        </h1>

        {/* Error Description */}
        <p className="text-text-secondary mb-8 leading-relaxed">
          {description}
        </p>

        {/* Status Code */}
        {statusCode && (
          <p className="text-sm text-text-tertiary mb-8">
            Error: {statusCode}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-primary text-black font-semibold rounded-lg hover:bg-cyan-primary/90 transition-colors"
          >
            <Home size={18} />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
