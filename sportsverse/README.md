# SportsVerse

Premium multi-sport live platform inspired by Flashscore, Sofascore, and ESPN.

## Project Status: Phase 1 - Application Shell

This is the initial setup phase focusing on:
- ✅ Project structure and configuration
- ✅ Design tokens and styling
- ✅ Application shell (header, sidebar, layout)
- ✅ State management setup
- ⏳ Cricket feature implementation (next)

## Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query (data fetching)
- Zustand (UI state)
- Framer Motion (animations)

**Design:**
- SportsVerse Design System v2
- Glassmorphism with stadium theme
- Responsive 12-column grid
- Sport-specific color system

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── (dashboard)/             # Dashboard routes
│   │   ├── live/
│   │   ├── upcoming/
│   │   ├── finished/
│   │   ├── search/
│   │   ├── favorites/
│   │   └── settings/
│   └── layout.tsx               # Root layout
├── components/
│   ├── layout/                  # Layout components
│   ├── features/                # Feature-specific components
│   └── common/                  # Reusable components
├── lib/
│   ├── providers/               # Context providers
│   ├── sports/                  # Sport-specific logic
│   └── utils.ts                 # Utility functions
├── hooks/                       # Custom React hooks
├── services/                    # API services
├── store/                       # Zustand stores
├── styles/                      # Global styles & tokens
└── types/                       # TypeScript types
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

### Linting & Formatting

```bash
npm run lint
npm run lint:fix
npm run format
```

## Design System

All UI follows the SportsVerse Design System v2:

- **Colors:** Stadium Black, Electric Cyan, Victory Gold, Live Crimson, Pitch Frost
- **Typography:** Inter (display/body), IBM Plex Mono (numbers/scores)
- **Glass:** Three-level elevation system with CSS variables
- **Animations:** Digit-flip score updates, live pulse, reduced-motion support
- **Spacing:** 8px base unit scale
- **Grid:** Responsive 4-column (mobile) / 8-column (tablet) / 12-column (desktop)

See `/src/styles/design-tokens.ts` for complete token definitions.

## Key Features (Roadmap)

### Phase 1: Cricket MVP
- [ ] Live matches display
- [ ] Match details page
- [ ] Scorecard with live updates
- [ ] Commentary system
- [ ] Player profiles
- [ ] Tournament standings
- [ ] Favorites system
- [ ] Search functionality

### Phase 2: Multi-Sport
- [ ] Football support
- [ ] Basketball support
- [ ] Tennis support
- [ ] Formula 1 support
- [ ] More sports...

### Phase 3: Advanced Features
- [ ] User authentication
- [ ] Push notifications
- [ ] Real-time WebSocket updates
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

## Code Standards

- **TypeScript:** Strict mode, no `any` types
- **Components:** Functional, server-first with client boundaries
- **Accessibility:** WCAG AA, keyboard navigation, screen readers
- **Performance:** Memoization, code splitting, image optimization
- **Testing:** TBD

## Architecture Principles

1. **Modular:** Feature-based folder structure
2. **Reusable:** Components, hooks, utilities
3. **Type-safe:** Strict TypeScript throughout
4. **Accessible:** WCAG AA compliance
5. **Performant:** Optimized for mobile
6. **Scalable:** Easy to add new sports

## Contributing

- Follow TypeScript strict mode
- Use design tokens for all styling
- Test responsiveness across devices
- Run linter before commits
- Write clear commit messages

## License

Private - SportsVerse Project

---

**Next Task:** Implement Cricket features (live matches, match details, scorecard)
