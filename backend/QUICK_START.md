# 🚀 Quick Start - SportsVerse Backend

## 5-Minute Setup

### 1️⃣ Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2️⃣ Setup Database

**Option A: PostgreSQL (Recommended)**
```bash
# Create database
createdb sportsverse_db

# Update .env
# DATABASE_URL=postgresql://postgres:password@localhost:5432/sportsverse_db
```

**Option B: SQLite (Testing)**
```bash
# Update .env
# DATABASE_URL=sqlite:///./sportsverse.db
```

### 3️⃣ Run Server
```bash
python run.py
```

✅ Server running at: http://localhost:8000

### 4️⃣ View API Docs
- **Interactive**: http://localhost:8000/api/docs
- **Reference**: http://localhost:8000/api/redoc
- **Health**: http://localhost:8000/health

---

## 📝 API Examples

### Get Live Matches
```bash
curl http://localhost:8000/api/v1/cricket/live
```

### Get Match Details
```bash
curl http://localhost:8000/api/v1/cricket/match/match_001
```

### Get News
```bash
curl http://localhost:8000/api/v1/cricket/news?limit=10
```

### Search
```bash
curl "http://localhost:8000/api/v1/cricket/search?q=india"
```

---

## 🔌 Connect Frontend

### Update Frontend .env
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Use Backend in Frontend
```typescript
// src/services/cricket-api.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function getLiveMatches() {
  const response = await fetch(`${API_URL}/api/v1/cricket/live`)
  const result = await response.json()
  return result.data // Get actual data
}
```

---

## 🧪 Test Everything Works

```bash
# Health check
curl http://localhost:8000/health

# Live matches
curl http://localhost:8000/api/v1/cricket/live

# Match details
curl http://localhost:8000/api/v1/cricket/match/match_001

# News
curl http://localhost:8000/api/v1/cricket/news
```

All should return:
```json
{
  "success": true,
  "data": {...},
  "message": "...",
  "timestamp": "..."
}
```

---

## 📱 WebSocket (Real-time Updates)

```javascript
// Browser console
const ws = new WebSocket("ws://localhost:8000/ws/match/match_001")
ws.onmessage = (event) => {
  const update = JSON.parse(event.data)
  console.log(update.data) // Match details
}
```

---

## 🔧 Configuration

Update `.env` to customize:

```env
# Server
HOST=0.0.0.0
PORT=8000
DEBUG=true

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/sportsverse_db

# CORS (for frontend)
CORS_ORIGINS=["http://localhost:3000"]

# Cricket API (when ready)
CRICKET_API_PROVIDER=mock
CRICKET_API_KEY=
```

---

## 📚 Project Files

Key files to understand:

1. **app/main.py** - FastAPI application
2. **app/api/v1.py** - All endpoints
3. **app/services/cricket_service.py** - Business logic
4. **app/providers/cricket.py** - Mock data provider
5. **app/models/** - Database models

---

## ✨ What's Working

✅ All 11 endpoints operational  
✅ Mock cricket data available  
✅ WebSocket real-time updates  
✅ Standard response format  
✅ Error handling  
✅ API documentation (Swagger)  

---

## 🎯 Next Steps

1. **Connect Frontend** - Update API URL and test
2. **Setup Database** - Run Alembic migrations
3. **Real API** - Add cricket API credentials
4. **Deploy** - Docker containerization

---

## 🆘 Troubleshooting

**Port 8000 in use?**
```bash
python run.py --port 8001
```

**Database connection error?**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Create database: `createdb sportsverse_db`

**CORS errors?**
- Add frontend URL to CORS_ORIGINS in .env
- Example: `CORS_ORIGINS=["http://localhost:3000"]`

**Module not found?**
```bash
pip install -r requirements.txt
```

---

## 📖 Full Documentation

See `README.md` for complete API reference.

---

**Ready to go!** 🚀
