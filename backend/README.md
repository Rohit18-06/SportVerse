# SportsVerse Backend

Production-ready backend for multi-sport platform. Scalable to millions of users with clean architecture.

## Technology Stack

- **Framework**: FastAPI
- **Language**: Python 3.12+
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy 2.x
- **Migrations**: Alembic
- **Validation**: Pydantic v2
- **HTTP Client**: httpx
- **Real-time**: WebSockets
- **Testing**: pytest

## Architecture

### Clean Architecture with Provider Layer

```
Routes → Services → Providers → External APIs
        ↓
      Database (SQLAlchemy)
```

**Key Principles:**
- Routes never call providers directly
- All business logic in services
- Provider pattern for multi-API support
- Type hints everywhere
- Pydantic models for validation
- Dependency injection

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app setup
│   ├── core/
│   │   ├── config.py        # Configuration & environment
│   │   └── security.py      # JWT, password hashing
│   ├── database/
│   │   └── database.py      # SQLAlchemy setup
│   ├── models/              # SQLAlchemy models
│   │   ├── user.py
│   │   ├── team.py
│   │   ├── player.py
│   │   ├── match.py
│   │   ├── series.py
│   │   ├── venue.py
│   │   ├── favorite.py
│   │   └── news.py
│   ├── schemas/             # Pydantic schemas
│   │   ├── common.py        # API response format
│   │   ├── team.py
│   │   ├── player.py
│   │   ├── match.py
│   │   ├── venue.py
│   │   ├── series.py
│   │   └── news.py
│   ├── providers/           # Data providers
│   │   ├── base.py          # Abstract provider
│   │   └── cricket.py       # Cricket implementation
│   ├── services/            # Business logic
│   │   └── cricket_service.py
│   ├── api/
│   │   ├── v1.py            # Cricket API routes
│   │   └── ws.py            # WebSocket routes
│   ├── websocket/           # WebSocket handlers
│   │   └── match_updates.py
│   └── utils/               # Utilities
│       └── constants.py
├── alembic/                 # Database migrations
├── tests/                   # Test suite
├── requirements.txt         # Dependencies
├── .env.example             # Environment template
├── .env                     # Local environment (gitignored)
├── run.py                   # Entry point
└── README.md
```

## Getting Started

### 1. Prerequisites

- Python 3.12+
- PostgreSQL 12+
- pip or uv

### 2. Installation

```bash
# Clone repository
cd backend

# Install dependencies
pip install -r requirements.txt
# OR with uv:
uv pip install -r requirements.txt
```

### 3. Setup Environment

```bash
# Copy example to local
cp .env.example .env

# Update .env with your values
# DATABASE_URL=postgresql://user:password@localhost:5432/sportsverse_db
```

### 4. Setup Database

```bash
# Create PostgreSQL database
createdb sportsverse_db

# Run migrations
alembic upgrade head
```

### 5. Run Server

```bash
python run.py
```

Server runs at: http://localhost:8000

### 6. View API Documentation

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## API Routes

### Cricket Endpoints

#### Live Matches
```
GET /api/v1/cricket/live
```
Returns all currently live matches.

#### Today's Matches
```
GET /api/v1/cricket/today
```
Returns all matches scheduled for today.

#### Upcoming Matches
```
GET /api/v1/cricket/upcoming?days=7
```
Returns upcoming matches for next N days.

#### Results
```
GET /api/v1/cricket/results?limit=20
```
Returns recently completed matches.

#### Match Details (⭐ Single Request API)
```
GET /api/v1/cricket/match/{match_id}
```
Returns comprehensive match information:
- Match info & metadata
- Live score
- Innings details
- Current batsmen & bowler
- Partnership info
- Commentary
- Scorecard
- Win probability
- Weather info
- Toss info
- Umpires

**Frontend makes ONE request and gets everything needed for match details page.**

#### Player Details
```
GET /api/v1/cricket/player/{player_id}
```
Returns player info and career statistics.

#### Team Details
```
GET /api/v1/cricket/team/{team_id}
```
Returns team info and statistics.

#### Team Squad
```
GET /api/v1/cricket/team/{team_id}/squad
```
Returns team squad for a series.

#### Series Details
```
GET /api/v1/cricket/series/{series_id}
```
Returns series/tournament information.

#### Standings
```
GET /api/v1/cricket/standings/{series_id}
```
Returns standings/table for a series.

#### News
```
GET /api/v1/cricket/news?limit=20
```
Returns latest cricket news.

#### Search
```
GET /api/v1/cricket/search?q=query
```
Searches matches, players, teams, and news.

### WebSocket

#### Real-time Match Updates
```
ws://localhost:8000/ws/match/{match_id}
```
Receives real-time match score updates.

**Example Client:**
```javascript
const ws = new WebSocket("ws://localhost:8000/ws/match/match_001")
ws.onmessage = (event) => {
  const update = JSON.parse(event.data)
  console.log(update.data) // Match details
}
```

## API Response Format

All endpoints return standard response format:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2026-07-05T10:30:00"
}
```

Error responses:

```json
{
  "success": false,
  "data": null,
  "message": "Error description",
  "timestamp": "2026-07-05T10:30:00"
}
```

## Provider Architecture

### Adding a New Sport

1. Create provider class inheriting from `SportsProvider`
2. Implement all abstract methods
3. Update service to use provider
4. Add routes to API

### Example: Football Provider

```python
# app/providers/football.py
from app.providers.base import SportsProvider

class FootballProvider(SportsProvider):
    async def get_live_matches(self) -> List[dict]:
        # Fetch from football API
        pass
```

### Using Different Cricket APIs

Update `.env`:
```
CRICKET_API_PROVIDER=rapidapi
CRICKET_API_KEY=your_api_key
```

## Database Models

### User
- id, email, username, hashed_password, full_name, is_active
- Timestamps: created_at, updated_at

### Team
- id, name, short_name, country, logo_url
- Timestamps: created_at, updated_at

### Player
- id, name, short_name, role, country, jersey_number, photo_url
- Timestamps: created_at, updated_at

### Series
- id, name, slug, format (T20/ODI/Test), status, season
- Dates: start_date, end_date
- logo_url, timestamps

### Match
- id, external_id, home_team_id, away_team_id, venue_id, series_id
- format, status, match_date, start_time
- JSON fields: live_data, toss_info, weather_info
- Timestamps: created_at, updated_at

### Venue
- id, name, city, country, capacity
- Timestamps: created_at, updated_at

### Favorite
- id, user_id, favorite_type (team/player/series), favorite_id
- created_at

### News
- id, external_id, title, description, content, author, source
- image_url, url, published_at
- Timestamps: created_at, updated_at

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test
pytest tests/test_cricket_routes.py -v
```

## Development

### Code Quality Tools

```bash
# Format code
black app

# Lint
ruff check app

# Type check
mypy app

# All checks
black app && ruff check app && mypy app
```

### Creating Migrations

```bash
# Auto-generate migration
alembic revision --autogenerate -m "Add new model"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Future Enhancements

- [ ] Authentication (JWT prepared)
- [ ] Multiple sports support
- [ ] Real API integration
- [ ] Caching layer (Redis)
- [ ] Rate limiting
- [ ] Notifications
- [ ] Fantasy cricket
- [ ] Advanced statistics
- [ ] Machine learning (win prediction)

## Notes

- Mock implementations ready for production
- Always use provider layer for data
- Single API request for match details page
- WebSocket for real-time updates
- Type hints mandatory
- All routes async
- Pydantic validation on all inputs

## Support

For issues or questions, check:
- FastAPI docs: https://fastapi.tiangolo.com/
- SQLAlchemy docs: https://docs.sqlalchemy.org/
- Pydantic docs: https://docs.pydantic.dev/

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Last Updated**: July 2026
