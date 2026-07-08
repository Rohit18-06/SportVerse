import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { QueryProvider } from '@/lib/providers/query-provider'
import { ThemeProvider } from '@/lib/providers/theme-provider'
import { TopNav } from '@/components/layout/top-nav'
import { StickyTabs } from '@/components/layout/sticky-tabs'

export const metadata: Metadata = {
  title: 'SportsVerse - Live Sports Scores & News',
  description:
    'Follow live cricket scores, upcoming matches, results, standings, and latest sports news. Premium sports app for cricket fans.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect fill="%23080B14" width="256" height="256"/><circle cx="128" cy="128" r="100" fill="%2300D4FF"/><text x="128" y="145" font-size="80" font-weight="bold" fill="%23080B14" text-anchor="middle" font-family="sans-serif">S</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <div className="min-h-dvh flex flex-col bg-[#080B14]">
              {/* Top navigation - sticky */}
              <TopNav />

              {/* Secondary navigation tabs - sticky below header */}
              <StickyTabs />

              {/* Main content area */}
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
