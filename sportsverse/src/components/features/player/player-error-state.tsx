import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

interface PlayerErrorStateProps {
  statusCode?: number
  message?: string
}

export function PlayerErrorState({
  statusCode = 404,
  message = 'Player not found or could not be loaded.',
}: PlayerErrorStateProps) {
  return (
    <div className="min-h-screen bg-[#080B14] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-[#1a1f2e] rounded-full">
            <AlertCircle className="w-12 h-12 text-cyan-400" />
          </div>
        </div>

        {/* Status Code */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">{statusCode}</h1>

        {/* Message */}
        <p className="text-gray-400 mb-6">{message}</p>

        {/* Additional Context */}
        {statusCode === 404 && (
          <p className="text-sm text-gray-500 mb-8">
            The player you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        )}

        {statusCode === 500 && (
          <p className="text-sm text-gray-500 mb-8">
            Something went wrong on our end. Please try again later.
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-[#1a1f2e] hover:bg-[#242b3d] text-white font-semibold rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
