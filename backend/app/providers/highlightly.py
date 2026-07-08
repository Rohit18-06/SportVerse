"""Highlightly Sports API provider - Real cricket data integration

Official Documentation: https://highlightly.net/cricket-api/documentation/
Base URL: https://cricket.highlightly.net
Authentication: x-rapidapi-key header (from Highlightly Dashboard)
Rate Limit: 100 requests/day on BASIC plan
"""
import httpx
import asyncio
from typing import Optional, List
from datetime import datetime, timedelta
from app.providers.base import SportsProvider
from app.core.config import settings


class HighlightlyProvider(SportsProvider):
    """
    Real cricket data provider using Highlightly native API.
    
    Authentication uses API key from Highlightly Dashboard in x-rapidapi-key header.
    All endpoints require HTTPS and return JSON responses.
    """

    BASE_URL = "https://cricket.highlightly.net"

    def __init__(self):
        self.api_key = settings.CRICKET_API_KEY
        self.timeout = 10.0
        self.headers = {
            "x-rapidapi-key": self.api_key,
        }

    async def _make_request(
        self, endpoint: str, params: dict = None, retries: int = 3
    ) -> Optional[dict]:
        """
        Make HTTP request to Highlightly API with retry logic.
        
        Args:
            endpoint: API endpoint path (e.g., '/matches')
            params: Query parameters
            retries: Number of retries on failure
            
        Returns:
            Response JSON or None on failure
        """
        url = f"{self.BASE_URL}{endpoint}"
        
        for attempt in range(retries):
            try:
                async with httpx.AsyncClient(
                    timeout=self.timeout,
                    headers=self.headers
                ) as client:
                    response = await client.get(url, params=params)
                    
                    # Handle different status codes
                    if response.status_code == 200:
                        return response.json()
                    elif response.status_code == 400:
                        print(f"❌ Highlightly API: Bad Request (400)")
                        print(f"   Check: Required parameters present? Valid date format?")
                        return None
                    elif response.status_code == 401:
                        print(f"❌ Highlightly API: Unauthorized (401) - Invalid API key")
                        return None
                    elif response.status_code == 403:
                        print(f"❌ Highlightly API: Forbidden (403) - Access denied")
                        return None
                    elif response.status_code == 404:
                        print(f"⚠️  Highlightly API: Not found (404) - {endpoint}")
                        return None
                    elif response.status_code == 429:
                        print(f"⚠️  Highlightly API: Rate limited (429). Attempt {attempt + 1}/{retries}")
                        if attempt < retries - 1:
                            await asyncio.sleep(2 ** attempt)  # Exponential backoff
                            continue
                        return None
                    elif response.status_code >= 500:
                        print(f"⚠️  Highlightly API: Server error ({response.status_code}). Attempt {attempt + 1}/{retries}")
                        if attempt < retries - 1:
                            await asyncio.sleep(1)
                            continue
                        return None
                    else:
                        print(f"❌ Highlightly API: HTTP {response.status_code}")
                        return None
                        
            except asyncio.TimeoutError:
                print(f"⚠️  Highlightly API: Timeout. Attempt {attempt + 1}/{retries}")
                if attempt < retries - 1:
                    await asyncio.sleep(1)
                    continue
            except Exception as e:
                print(f"⚠️  Highlightly API: {str(e)}. Attempt {attempt + 1}/{retries}")
                if attempt < retries - 1:
                    await asyncio.sleep(1)
                    continue
                    
        return None

    def _normalize_match(self, match_data: dict) -> dict:
        """
        Normalize Highlightly match response to SportsVerse format.
        """
        state = match_data.get("state", {})
        teams = state.get("teams", {})
        home_state = teams.get("home", {})
        away_state = teams.get("away", {})
        
        return {
            "id": match_data.get("id"),
            "external_id": match_data.get("id"),
            "homeTeam": {
                "id": match_data.get("homeTeam", {}).get("id"),
                "name": match_data.get("homeTeam", {}).get("name"),
                "shortName": match_data.get("homeTeam", {}).get("abbreviation"),
                "logo": match_data.get("homeTeam", {}).get("logo"),
            },
            "awayTeam": {
                "id": match_data.get("awayTeam", {}).get("id"),
                "name": match_data.get("awayTeam", {}).get("name"),
                "shortName": match_data.get("awayTeam", {}).get("abbreviation"),
                "logo": match_data.get("awayTeam", {}).get("logo"),
            },
            "status": self._normalize_status(state.get("description")),
            "format": match_data.get("format"),
            "venue": {
                "id": None,  # Highlightly doesn't provide venue in list view
                "name": None,
            },
            "league": {
                "id": match_data.get("league", {}).get("id"),
                "name": match_data.get("league", {}).get("name"),
            },
            "matchDate": match_data.get("startDate"),
            "startTime": match_data.get("startTime"),
            "liveData": {
                "homeTeam": {
                    "score": home_state.get("score"),
                    "info": home_state.get("info"),
                },
                "awayTeam": {
                    "score": away_state.get("score"),
                    "info": away_state.get("info"),
                },
                "description": state.get("description"),
                "report": state.get("report"),
            },
        }

    def _normalize_status(self, description: str) -> str:
        """
        Normalize Highlightly status to SportsVerse format.
        """
        if not description:
            return "upcoming"
            
        lower = description.lower()
        
        if lower in ["in play", "live"]:
            return "live"
        elif lower in ["finished", "completed"]:
            return "completed"
        elif lower in ["scheduled", "not started", "match delayed"]:
            return "upcoming"
        elif lower in ["postponed"]:
            return "upcoming"
        elif lower in ["cancelled", "abandoned"]:
            return "abandoned"
        elif lower in ["stumps", "lunch", "tea", "drinks", "timeout", "innings break"]:
            return "live"  # In-progress with break
        else:
            return "upcoming"

    async def get_live_matches(self) -> List[dict]:
        """Get all live matches."""
        today = datetime.utcnow().date().isoformat()
        data = await self._make_request(
            "/matches",
            params={"date": today, "limit": 100}
        )
        
        if not data or "data" not in data:
            return []
        
        matches = data.get("data", [])
        # Filter for live matches only
        live_matches = [
            self._normalize_match(m) for m in matches
            if m.get("state", {}).get("description", "").lower() in ["in play", "live"]
        ]
        return live_matches

    async def get_today_matches(self) -> List[dict]:
        """Get all matches happening today."""
        today = datetime.utcnow().date().isoformat()
        data = await self._make_request(
            "/matches",
            params={"date": today, "limit": 100}
        )
        
        if not data or "data" not in data:
            return []
        
        return [self._normalize_match(m) for m in data.get("data", [])]

    async def get_upcoming_matches(self, days: int = 7) -> List[dict]:
        """Get upcoming matches for next N days."""
        today = datetime.utcnow().date()
        all_matches = []
        
        # Fetch matches for each day
        for i in range(days):
            target_date = (today + timedelta(days=i)).isoformat()
            data = await self._make_request(
                "/matches",
                params={"date": target_date, "limit": 100}
            )
            
            if data and "data" in data:
                matches = data.get("data", [])
                for match in matches:
                    status_desc = match.get("state", {}).get("description", "").lower()
                    # Include only upcoming/scheduled matches, not finished/live
                    if status_desc not in ["finished", "in play", "live"]:
                        all_matches.append(self._normalize_match(match))
        
        return all_matches

    async def get_results(self, limit: int = 20) -> List[dict]:
        """Get recent completed matches."""
        # Get historical matches - go back up to 30 days to find completed matches
        all_matches = []
        today = datetime.utcnow().date()
        
        for i in range(min(30, limit)):
            target_date = (today - timedelta(days=i)).isoformat()
            data = await self._make_request(
                "/matches",
                params={"date": target_date, "limit": 100}
            )
            
            if data and "data" in data:
                matches = data.get("data", [])
                for match in matches:
                    status_desc = match.get("state", {}).get("description", "").lower()
                    if status_desc in ["finished", "completed"]:
                        all_matches.append(self._normalize_match(match))
                        if len(all_matches) >= limit:
                            return all_matches[:limit]
        
        return all_matches[:limit]

    async def get_match(self, match_id: str) -> Optional[dict]:
        """Get detailed information about a specific match - NORMALIZED.
        
        This is used for list views/cards and returns simplified format.
        Use get_match_raw() for full details needed by match detail pages.
        """
        data = await self._make_request(f"/matches/{match_id}")
        
        if not data:
            return None
        
        # Highlightly returns match data directly, not wrapped in 'data'
        match_data = data if isinstance(data, dict) and "id" in data else data.get("match")
        
        if not match_data:
            return None
        
        return self._normalize_match(match_data)

    async def get_match_raw(self, match_id: str) -> Optional[dict]:
        """Get detailed information about a specific match - RAW FORMAT.
        
        Returns the raw Highlightly API response with all details:
        - statistics (innings with batting/bowling tables)
        - squad
        - predictions
        - all state/venue/league/forecast info
        
        This is what match detail pages need for rich rendering.
        """
        data = await self._make_request(f"/matches/{match_id}")
        
        if not data:
            return None
        
        # Highlightly returns match data directly, not wrapped in 'data'
        match_data = data if isinstance(data, dict) and "id" in data else data.get("match")
        
        if not match_data:
            return None
        
        # Return completely raw - no normalization
        # Frontend expects this format: HighlightlyMatch type
        return match_data

    async def get_match_commentary(self, match_id: str) -> List[dict]:
        """Get commentary for a match - Not available in Highlightly API."""
        # Highlightly native API doesn't provide commentary endpoint
        return []

    async def get_match_scorecard(self, match_id: str) -> Optional[dict]:
        """Get scorecard for a match - Included in match detail."""
        match_data = await self.get_match(match_id)
        if not match_data:
            return None
        
        # Return live data as scorecard
        return match_data.get("liveData")

    async def get_player(self, player_id: str) -> Optional[dict]:
        """Get player details and statistics."""
        data = await self._make_request(f"/players/{player_id}")
        
        if not data:
            return None
        
        player = data if isinstance(data, dict) and "id" in data else data.get("player")
        
        if not player:
            return None
        
        return {
            "id": player.get("id"),
            "name": player.get("name"),
            "gender": player.get("gender"),
            "dateOfBirth": player.get("dateOfBirth"),
            "battingStyles": player.get("battingStyles", []),
            "bowlingStyles": player.get("bowlingStyles", []),
            "teams": player.get("teams", []),
        }

    async def get_team(self, team_id: str) -> Optional[dict]:
        """Get team details and statistics."""
        data = await self._make_request(f"/teams/{team_id}")
        
        if not data:
            return None
        
        team = data if isinstance(data, dict) and "id" in data else data.get("team")
        
        if not team:
            return None
        
        return {
            "id": team.get("id"),
            "name": team.get("name"),
            "abbreviation": team.get("abbreviation"),
            "logo": team.get("logo"),
        }

    async def get_team_squad(self, team_id: str) -> List[dict]:
        """Get team squad - Not directly available in Highlightly API."""
        # Would need to call /players with teamId filter
        data = await self._make_request(
            "/players",
            params={"teamId": team_id, "limit": 100}
        )
        
        if not data or "data" not in data:
            return []
        
        players = data.get("data", [])
        return [
            {
                "id": p.get("id"),
                "name": p.get("name"),
                "battingStyles": p.get("battingStyles", []),
                "bowlingStyles": p.get("bowlingStyles", []),
            }
            for p in players
        ]

    async def get_series(self, series_id: str) -> Optional[dict]:
        """Get series/tournament details."""
        # Highlightly API calls leagues "series"/tournaments
        data = await self._make_request(f"/leagues/{series_id}")
        
        if not data:
            return None
        
        series = data if isinstance(data, dict) and "id" in data else data.get("league")
        
        if not series:
            return None
        
        return {
            "id": series.get("id"),
            "name": series.get("name"),
            "country": series.get("country", {}).get("name"),
            "seasons": series.get("seasons", []),
        }

    async def get_standings(self, series_id: str) -> List[dict]:
        """Get standings/table for a series - Not available in native API."""
        # Highlightly native API doesn't provide standings endpoint
        return []

    async def get_series_matches(self, series_id: str, status: str = "all") -> List[dict]:
        """Get matches for a series/tournament."""
        # Use the mock provider's implementation for now
        # In production, this would call the Highlightly API or database
        try:
            matches = await self.get_upcoming_matches(days=30)
            series_matches = [m for m in matches if m.get("league", {}).get("id") == series_id or m.get("series", {}).get("id") == series_id]
            
            if status != "all":
                series_matches = [m for m in series_matches if m.get("status") == status]
            
            return series_matches if series_matches else matches[:6]
        except Exception as e:
            print(f"Error fetching series matches: {e}")
            return []

    async def get_news(self, limit: int = 20) -> List[dict]:
        """Get cricket news - Not available in Highlightly Cricket API."""
        # News is not part of the cricket API
        return []

    async def search(self, query: str) -> dict:
        """Search for matches, players, teams."""
        if not query or len(query) < 2:
            return {"matches": [], "players": [], "teams": [], "news": []}
        
        results = {
            "matches": [],
            "players": [],
            "teams": [],
            "news": [],
        }
        
        # Search teams by name
        teams_data = await self._make_request(
            "/teams",
            params={"name": query, "limit": 10}
        )
        if teams_data and "data" in teams_data:
            results["teams"] = teams_data.get("data", [])
        
        # Search players by name
        players_data = await self._make_request(
            "/players",
            params={"name": query, "limit": 10}
        )
        if players_data and "data" in players_data:
            results["players"] = players_data.get("data", [])
        
        # Search matches by league name
        matches_data = await self._make_request(
            "/matches",
            params={"leagueName": query, "limit": 10}
        )
        if matches_data and "data" in matches_data:
            results["matches"] = [
                self._normalize_match(m) for m in matches_data.get("data", [])
            ]
        
        return results

    async def health_check(self) -> bool:
        """Check if Highlightly API is accessible."""
        # Use a simple endpoint like countries that doesn't require parameters
        data = await self._make_request("/countries")
        return data is not None
