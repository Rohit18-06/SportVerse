# SportsVerse Architecture

## Overview

SportsVerse is a production-grade, multi-sport live platform built with Next.js 15, React 18, and TypeScript. The architecture prioritizes scalability, reusability, and clean code practices.

## Project Structure

```
sportsverse/
├── public/                           # Static assets
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Home page
│   │   ├── api/                     # API routes (future)
│   │   └── (dashboard)/             # Dashboard route group
│   │       ├── live/                # Live matches
│   │       ├── upcoming/            # Upcoming matches
│   │       ├── finished/            # Completed matches
│   │       ├── search/              # Search page
│   │       ├── favorites/           # Favorites
│   │       └── settings/            # User settings
│   ├── components/
│   │   ├── layout/                  # Layout components
│   │   │   ├── container.tsx        # Responsive container
│   │   │   ├── header.tsx           # Top header
│   │   │   └── sidebar.tsx          # Navigation sidebar
│   │   ├── features/                # Feature-specific components
│   │   │   ├── home/
│   │   │   ├── match/
│   │   │   └── search/
│   │   └── common/                  # Reusable UI components
│   ├── hooks/                       # Custom React hooks
│   ├── lib/
│   │   ├── providers/               # React context providers
│   │   │   ├── query-provider.tsx   # TanStack Query
│   │   │   └── theme-provider.tsx   # Theme management
│   │   ├── sports/                  # Sport provider abstraction
│   │   └── utils.ts                 # Utility functions
│   ├── services/                    # API service layer
│   ├── store/                       # Zustand state stores
│   │   └── ui.store.ts              # UI state management
│   ├── styles/
│   │   ├── globals.css              # Global styles
│   │   └── design-tokens.ts         # Design system tokens
│   └── types/                       # TypeScript definitions
├── .eslintrc.json                   # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies
```

## Core Design Principles

### 1. Modular Architecture
- **Feature-based organization**: Components grouped by feature (match, player, tournament)
- **Reusable components**: Common UI elements shared across features
- **Clear separation of concerns**: API logic, state management, UI rendering

### 2. Type Safety
- **Strict TypeScript**: No `any` types allowed
- **Comprehensive types**: Type definitions for all domain models
- **Runtime validation**: Schema validation for API responses

### 3. State Management
- **Zustand for UI state**: Theme, sidebar, modals, filters
- **TanStack Query for server state**: API responses, caching, synchronization
- **Server Components**: Default to React Server Components for performance

### 4. Performance
- **Code splitting**: Dynamic imports for routes and heavy components
- **Memoization**: `React.memo` for expensive components
- **Image optimization**: Next.js Image component with lazy loading
- **CSS-in-JS**: Tailwind for fast runtime styling

### 5. Accessibility
- **WCAG AA compliance**: Minimum contrast ratios, keyboard navigation
- **Screen reader support**: ARIA labels, semantic HTML
- **Focus management**: Visible focus indicators
- **Reduced motion**: Respects `prefers-reduced-motion` preference

## Design System Integration

### Colors
All colors come from `/src/styles/design-tokens.ts` and are available via Tailwind classes and CSS variables.

```typescript
// Stadium theme
--color-stadium-black: #0a0e27;
--color-stadium-navy: #0d1b3f;

// Accents
--color-cyan-primary: #00d9ff;      // Live indicator
--color-gold-primary: #ffd700;      // Achievements
--color-crimson-primary: #ff3b5c;   // Alerts
--color-pitch-frost: #e8f4f8;       // Text
--color-neutral-gray: #6b7280;      // Secondary
```

### Glass System
Three-level elevation system with CSS variables:

```css
/* Level 1: Navigation (4px blur, 0.06 opacity) */
--glass-blur-sm: 4px;
--glass-opacity-primary: 0.12;

/* Level 2: Content (16px blur, 0.12 opacity) */
--glass-blur-lg: 16px;

/* Level 3: Overlay (24px blur, 0.18 opacity) */
--glass-blur-xl: 24px;
--glass-opacity-overlay: 0.18;
```

### Typography
- **Display**: Inter 700 (headlines, scores)
- **Body**: Inter 400–500 (regular text)
- **Monospace**: IBM Plex Mono (scores, statistics)

### Spacing
8px base unit scale used throughout:
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
```

### Grid System
Responsive 12-column grid:
- **Mobile**: 4 columns, 8px gap, 16px margin
- **Tablet**: 8 columns, 12px gap, 24px margin
- **Desktop**: 12 columns, 16px gap, 32px margin

## Data Flow

### Server State (API Data)
```
[Component] 
    → useQuery() [TanStack Query]
    → [API Service] 
    → fetch() 
    → [Backend API]
    → [Cache + Return]
```

### UI State
```
[Component] 
    → useUiStore() [Zustand]
    → [UI Store]
    → setState()
```

### Server Components
```
[Page Component (Server)]
    → Fetch data directly
    → Pass to Client Components
    → Or use useQuery in Client Component
```

## Sports Provider Abstraction

Every sport implementation follows the same interface:

```typescript
interface SportsProvider {
  getMatches(): Promise<Match[]>
  getMatch(id: string): Promise<Match>
  getPlayer(id: string): Promise<Player>
  getTeam(id: string): Promise<Team>
  getStandings(tournamentId: string): Promise<Standing[]>
  getNews(): Promise<News[]>
  search(query: string): Promise<SearchResults>
}
```

This allows new sports to be added without modifying existing code.

## API Service Layer

Never import API endpoints directly into components. Always use service layer:

```typescript
// ✅ Good
import { useQuery } from '@tanstack/react-query'
import { matchService } from '@/services/match.service'

function MatchCard() {
  const { data } = useQuery({
    queryKey: ['matches'],
    queryFn: () => matchService.getLiveMatches(),
  })
}

// ❌ Bad - Direct fetch in component
function MatchCard() {
  const [matches, setMatches] = useState([])
  useEffect(() => {
    fetch('/api/matches').then(...)
  }, [])
}
```

## Component Patterns

### Server Components (Default)
```typescript
// src/app/page.tsx
export default function HomePage() {
  // Direct data fetching, no state, no browser APIs
  return <div>Server content</div>
}
```

### Client Components
```typescript
// src/components/features/home/live-card.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import type { CricketMatch } from '@/types'

export function LiveCard() {
  const { data } = useQuery({
    queryKey: ['live-matches'],
    queryFn: async () => {
      const res = await fetch('/api/matches/live')
      return res.json()
    },
  })

  return <div>{/* UI */}</div>
}
```

### Custom Hooks
```typescript
// src/hooks/useMatch.ts
import { useQuery } from '@tanstack/react-query'
import type { CricketMatch } from '@/types'

export function useMatch(matchId: string) {
  return useQuery({
    queryKey: ['match', matchId],
    queryFn: async () => {
      const res = await fetch(`/api/matches/${matchId}`)
      return res.json() as Promise<CricketMatch>
    },
  })
}
```

## Performance Optimizations

### 1. Code Splitting
```typescript
// Dynamic import for heavy components
const MatchDetail = dynamic(() => import('@/components/match-detail'), {
  loading: () => <Skeleton />,
})
```

### 2. Memoization
```typescript
const ScoreCard = React.memo(function ScoreCard({ match }: Props) {
  return <div>{match.score}</div>
})
```

### 3. Virtualization (for long lists)
```typescript
import { FixedSizeList } from 'react-window'

function CommentaryList({ comments }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={comments.length}
      itemSize={80}
    >
      {CommentaryRow}
    </FixedSizeList>
  )
}
```

### 4. Image Optimization
```typescript
import Image from 'next/image'

export function TeamLogo({ team }) {
  return (
    <Image
      src={team.logo}
      alt={team.name}
      width={48}
      height={48}
      priority={false}
    />
  )
}
```

## Testing Strategy (TBD)

- Unit tests: Jest + React Testing Library
- E2E tests: Playwright
- Accessibility tests: axe-core
- Visual regression: Percy or similar

## Deployment

### Prerequisites
- Docker
- Docker Compose
- GitHub Actions (CI/CD)

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Redis cache configured
- [ ] WebSocket server running
- [ ] SSL/TLS certificates installed
- [ ] Rate limiting configured
- [ ] Error tracking (Sentry) configured
- [ ] Analytics configured

## Git Workflow

```bash
# Feature branches
git checkout -b feat/match-details

# Commit messages
git commit -m "feat: add match details page"
git commit -m "fix: resolve score update animation"
git commit -m "refactor: extract match card component"
git commit -m "docs: update architecture guide"

# Push to remote
git push -u origin feat/match-details

# Create pull request
gh pr create --title "Add match details page" --body "..."
```

## Next Steps

1. **Implement Cricket Features**
   - Live match feed
   - Match details page
   - Scorecard with live updates
   - Commentary system

2. **Add Authentication**
   - JWT tokens
   - Google OAuth
   - GitHub OAuth
   - User preferences

3. **Implement Real-time Updates**
   - WebSocket connection
   - Live score updates
   - Commentary streaming
   - Notifications

4. **Add More Sports**
   - Football
   - Basketball
   - Tennis
   - Formula 1

5. **Performance & Analytics**
   - Performance monitoring
   - Error tracking
   - User analytics
   - A/B testing

---

**Last Updated:** July 4, 2026
**Maintainers:** SportsVerse Team
