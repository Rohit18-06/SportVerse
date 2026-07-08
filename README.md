# SportsVerse - Cricket Platform

A modern, full-stack cricket platform delivering live match updates, comprehensive player/team profiles, and in-depth statistics. Built with Next.js, React Query, and FastAPI.

**Live Demo:** https://sportsverse.vercel.app

---

## 📋 Features

### Match Details
- ✅ Live match scorecards with real-time updates
- ✅ Detailed innings statistics with batting/bowling tables
- ✅ Fall of wickets and partnership information
- ✅ Match header with venue, format, and time details
- ✅ Multi-tab navigation (Overview, Scorecard, Statistics, Players)

### Team Profiles
- 🏟️ Team overview with match history
- 🏟️ Squad listings and player cards
- 🏟️ Recent results and upcoming fixtures
- 🏟️ Team-specific news and updates

### Player Profiles
- 👤 Player statistics and career overview
- 👤 Recent match history
- 👤 Career achievements and records
- 👤 Player news and updates

### Tournament Management
- 🏆 Tournament overview and standings
- 🏆 Match fixtures and results
- 🏆 Team participation tracking
- 🏆 Live tournament updates

### Cricket Data Integration
- 🔗 Real-time data from Highlightly Cricket API
- 🔗 Comprehensive field mapping (50+ data points)
- 🔗 Live match updates with state tracking
- 🔗 Commentary and prediction support (when available)

---

## 🏗️ Architecture

### Frontend
- **Framework:** Next.js 15.5 with App Router
- **State Management:** React Query v5 (caching + auto-refetch)
- **Styling:** Tailwind CSS + custom design tokens
- **UI Components:** 50+ reusable components with loading/error states
- **Performance:** SSR, Code splitting, Image optimization

### Backend
- **Framework:** FastAPI (async Python)
- **Database:** SQLAlchemy ORM with Alembic migrations
- **API Provider:** Highlightly Cricket API (real data)
- **Architecture:** Service layer pattern with providers
- **WebSocket:** Real-time match updates

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### Frontend Setup

```bash
cd sportsverse
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Backend Setup

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
python run.py
```

Backend runs on `http://localhost:8000`

**API Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 📁 Project Structure

```
SportsVerse/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # 50+ React components
│   │   ├── hooks/              # Custom React Query hooks
│   │   ├── services/           # API integration layer
│   │   ├── lib/                # Utilities and providers
│   │   └── styles/             # Tailwind + design tokens
│   └── package.json
│
└── backend/                     # FastAPI application
    ├── app/
    │   ├── api/                # Route handlers
    │   ├── services/           # Business logic
    │   ├── providers/          # Data providers (Highlightly, Cricket)
    │   ├── models/             # SQLAlchemy models
    │   ├── schemas/            # Pydantic schemas
    │   └── core/               # Configuration, security
    ├── alembic/                # Database migrations
    ├── requirements.txt
    └── run.py
```

---

## 🔧 API Endpoints

### Match Endpoints
- `GET /api/v1/cricket/live` - Live matches
- `GET /api/v1/cricket/today` - Today's matches
- `GET /api/v1/cricket/upcoming?days=7` - Upcoming matches
- `GET /api/v1/cricket/results?limit=20` - Recent results
- `GET /api/v1/cricket/match/{match_id}` - Match details with statistics

### Player Endpoints
- `GET /api/v1/cricket/player/{player_id}` - Player details
- `GET /api/v1/cricket/player/{player_id}/career` - Career statistics
- `GET /api/v1/cricket/player/{player_id}/matches` - Player's recent matches
- `GET /api/v1/cricket/player/{player_id}/statistics` - Player statistics

### Team Endpoints
- `GET /api/v1/cricket/team/{team_id}` - Team details
- `GET /api/v1/cricket/team/{team_id}/squad` - Team squad
- `GET /api/v1/cricket/team/{team_id}/fixtures` - Upcoming fixtures
- `GET /api/v1/cricket/team/{team_id}/results` - Recent results

### Tournament Endpoints
- `GET /api/v1/cricket/series/{series_id}` - Tournament details
- `GET /api/v1/cricket/series/{series_id}/matches?status=all` - Tournament matches
- `GET /api/v1/cricket/standings/{series_id}` - Tournament standings

---

## 🔐 Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_CRICKET_API_PROVIDER=highlightly
CRICKET_API_KEY=your_api_key_here
ENABLE_REAL_CRICKET_DATA=true
```

### Backend (.env)
```env
ENVIRONMENT=development
HOST=0.0.0.0
PORT=8000
DEBUG=True
CRICKET_API_KEY=your_api_key_here
DATABASE_URL=sqlite:///./app.db
```

---

## 🛠️ Development

### Build Frontend
```bash
cd sportsverse
npm run build
npm run start
```

### Type Checking
```bash
cd sportsverse
npm run type-check
```

### Linting
```bash
cd sportsverse
npm run lint
```

### Backend Testing
```bash
cd backend
pytest
```

---

## 📊 Real Data Integration

The platform integrates with **Highlightly Cricket API** for real-time cricket data:

- ✅ Live match scores and state tracking
- ✅ Player performance statistics
- ✅ Team information and squad details
- ✅ Tournament standings and fixtures
- ✅ Comprehensive field mapping (50+ data points)

See `backend/FIELD_MAP.md` for complete API field documentation.

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
git push origin main
# Auto-deploys via Vercel GitHub integration
```

### Backend (Can deploy to Heroku, Railway, AWS)
```bash
# Example with Railway
railway up
```

---

## 🐛 Troubleshooting

### Frontend build fails
```bash
# Clear Next.js cache
rm -rf .next/
npm run build
```

### Backend API returns 404
```bash
# Verify CRICKET_API_KEY is set
python -c "from app.core.config import settings; print(settings.CRICKET_API_KEY)"

# Check Highlightly API status
python run.py  # View startup logs
```

### CORS errors
Backend CORS is configured for all origins in development. For production, update `app/core/config.py`:

```python
CORS_ORIGINS = ["https://yourdomain.com"]
```

---

## 📚 Documentation

- **Architecture:** See `sportsverse/ARCHITECTURE.md`
- **Backend Setup:** See `backend/README.md`
- **Frontend Setup:** See `sportsverse/README.md`
- **Field Mapping:** See `backend/FIELD_MAP.md`

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Authors

- Rohit - Full-stack development

---

## 🔗 Links

- **GitHub:** https://github.com/Rohit18-06/SportsVerse
- **API Docs:** http://localhost:8000/docs
- **Frontend:** http://localhost:3000

---

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Review documentation in `backend/` and `sportsverse/` directories
3. Open a new issue with detailed error logs

---

**Last Updated:** July 2026  
**Status:** Production Ready ✅
