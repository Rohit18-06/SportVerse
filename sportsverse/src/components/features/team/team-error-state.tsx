import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

interface TeamErrorStateProps {
  statusCode?: number
  message?: string
}

export function TeamErrorState({ statusCode = 404, message }: TeamErrorStateProps) {
  return (
    <div className="min-h-screen bg-[#080B14] flex items-center justify-center">
      <div className="container-max max-w-md mx-auto text-center py-12">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-red-500/10 p-4 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-4xl font-bold text-white mb-2">{statusCode}</h1>

        {/* Error Message */}
        <p className="text-lg text-gray-400 mb-8">
          {message || 'Team not found or could not be loaded.'}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-8">
          The team you&apos;re looking for might have been moved or doesn&apos;t exist.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
