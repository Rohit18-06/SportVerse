"""Cricket data provider with mock implementations"""
from typing import Optional, List
from datetime import datetime, timedelta
from app.providers.base import SportsProvider


class CricketProvider(SportsProvider):
    """
    Cricket provider implementation.
    Uses mock data for now. Will integrate real APIs later.
    """

    def __init__(self):
        self.name = "Cricket Provider"
        self.version = "1.0.0"

    async def get_live_matches(self) -> List[dict]:
        """Get all live matches - mock implementation."""
        return [
            {
                "id": "match_001",
                "homeTeam": {
                    "id": "team_1",
                    "name": "England",
                    "shortName": "ENG",
                    "country": "England",
                    "logo": "https://via.placeholder.com/64",
                },
                "awayTeam": {
                    "id": "team_2",
                    "name": "India",
                    "shortName": "IND",
                    "country": "India",
                    "logo": "https://via.placeholder.com/64",
                },
                "status": "live",
                "format": "T20I",
                "venue": {
                    "id": "venue_1",
                    "name": "The Oval",
                    "city": "London",
                    "country": "England",
                },
                "series": {
                    "id": "series_1",
                    "name": "England Tour of India",
                    "slug": "england-tour-india-2026",
                },
                "matchDate": datetime.now().isoformat(),
                "startTime": datetime.now().isoformat(),
                "liveData": {
                    "batting": {
                        "runs": 152,
                        "wickets": 4,
                        "overs": 15,
                        "balls": 2,
                        "runRate": 10.1,
                    },
                    "bowling": {
                        "wickets": 4,
                        "runs": 152,
                    },
                    "partnership": {
                        "runs": 35,
                        "balls": 28,
                    },
                    "target": 180,
                    "requiredRunRate": 9.4,
                    "winProbability": {"team1": 42, "team2": 58},
                },
                "tossInfo": {
                    "winner": "India",
                    "decision": "bat",
                    "message": "India won the toss and chose to bat",
                },
            }
        ]

    async def get_today_matches(self) -> List[dict]:
        """Get all matches happening today - mock implementation."""
        return [
            {
                "id": "match_002",
                "homeTeam": {"id": "team_3", "name": "Pakistan", "shortName": "PAK"},
                "awayTeam": {"id": "team_4", "name": "Bangladesh", "shortName": "BAN"},
                "status": "upcoming",
                "format": "T20I",
                "matchDate": datetime.now().isoformat(),
                "startTime": (datetime.now() + timedelta(hours=3)).isoformat(),
            },
            {
                "id": "match_003",
                "homeTeam": {"id": "team_5", "name": "South Africa", "shortName": "SA"},
                "awayTeam": {"id": "team_6", "name": "West Indies", "shortName": "WI"},
                "status": "upcoming",
                "format": "ODI",
                "matchDate": datetime.now().isoformat(),
                "startTime": (datetime.now() + timedelta(hours=8)).isoformat(),
            },
        ]

    async def get_upcoming_matches(self, days: int = 7) -> List[dict]:
        """Get upcoming matches for next N days - mock implementation."""
        matches = []
        for i in range(min(days * 2, 14)):
            match_date = datetime.now() + timedelta(days=i // 2)
            matches.append(
                {
                    "id": f"match_upcoming_{i}",
                    "homeTeam": {
                        "id": f"team_{i}",
                        "name": f"Team A {i}",
                        "shortName": f"TA{i}",
                    },
                    "awayTeam": {
                        "id": f"team_{i+10}",
                        "name": f"Team B {i}",
                        "shortName": f"TB{i}",
                    },
                    "status": "upcoming",
                    "format": ["T20I", "ODI", "Test"][i % 3],
                    "matchDate": match_date.isoformat(),
                    "startTime": match_date.isoformat(),
                }
            )
        return matches

    async def get_results(self, limit: int = 20) -> List[dict]:
        """Get recent completed matches - mock implementation."""
        matches = []
        for i in range(min(limit, 20)):
            match_date = datetime.now() - timedelta(days=i + 1)
            matches.append(
                {
                    "id": f"match_result_{i}",
                    "homeTeam": {
                        "id": f"team_{i}",
                        "name": f"Team A {i}",
                        "shortName": f"TA{i}",
                    },
                    "awayTeam": {
                        "id": f"team_{i+10}",
                        "name": f"Team B {i}",
                        "shortName": f"TB{i}",
                    },
                    "status": "completed",
                    "format": ["T20I", "ODI", "Test"][i % 3],
                    "matchDate": match_date.isoformat(),
                    "startTime": match_date.isoformat(),
                    "result": {
                        "winnerTeamId": f"team_{i}",
                        "resultType": "wickets",
                        "margin": 5 + i,
                    },
                }
            )
        return matches

    async def get_match(self, match_id: str) -> Optional[dict]:
        """Get detailed information about a specific match - mock implementation."""
        return {
            "id": match_id,
            "homeTeam": {
                "id": "team_1",
                "name": "England",
                "shortName": "ENG",
                "country": "England",
                "logo": "https://via.placeholder.com/64",
            },
            "awayTeam": {
                "id": "team_2",
                "name": "India",
                "shortName": "IND",
                "country": "India",
                "logo": "https://via.placeholder.com/64",
            },
            "status": "live",
            "format": "T20I",
            "venue": {
                "id": "venue_1",
                "name": "The Oval",
                "city": "London",
                "country": "England",
                "capacity": 29000,
            },
            "series": {
                "id": "series_1",
                "name": "England Tour of India",
                "slug": "england-tour-india-2026",
                "format": "T20",
                "status": "live",
            },
            "matchDate": datetime.now().isoformat(),
            "startTime": datetime.now().isoformat(),
            "liveData": {
                "innings": [
                    {
                        "team": "India",
                        "runs": 152,
                        "wickets": 4,
                        "overs": 15.2,
                    }
                ],
                "currentBatsmen": [
                    {"name": "Player A", "runs": 45, "balls": 38},
                    {"name": "Player B", "runs": 32, "balls": 25},
                ],
                "currentBowler": {"name": "Bowler A", "wickets": 2, "runs": 28},
                "partnership": {"runs": 35, "balls": 28},
                "target": 180,
                "requiredRunRate": 9.4,
                "winProbability": {"team1": 42, "team2": 58},
                "lastOver": [1, 2, 0, 4, 1, 1],
            },
            "tossInfo": {
                "winner": "India",
                "decision": "bat",
                "message": "India won the toss and chose to bat",
            },
            "weatherInfo": {
                "condition": "Partly cloudy",
                "temperature": 18,
                "humidity": 65,
                "windSpeed": 12,
            },
        }

    async def get_match_commentary(self, match_id: str) -> List[dict]:
        """Get commentary for a match - mock implementation."""
        return [
            {
                "id": f"com_{i}",
                "over": 15,
                "ball": 2,
                "batter": "Player A",
                "bowler": "Bowler A",
                "runs": 1,
                "text": "Single to mid-off",
                "timestamp": datetime.now().isoformat(),
            }
            for i in range(10)
        ]

    async def get_match_scorecard(self, match_id: str) -> Optional[dict]:
        """Get scorecard for a match - mock implementation."""
        return {
            "id": match_id,
            "innings": [
                {
                    "team": "India",
                    "runs": 152,
                    "wickets": 4,
                    "overs": 15.2,
                    "batsmen": [
                        {"name": "Player A", "runs": 45, "balls": 38, "fours": 3, "sixes": 1},
                        {"name": "Player B", "runs": 32, "balls": 25, "fours": 2, "sixes": 1},
                    ],
                }
            ],
        }

    async def get_player(self, player_id: str) -> Optional[dict]:
        """Get player details and statistics - mock implementation."""
        return {
            "id": player_id,
            "name": "Virat Kohli",
            "shortName": "Kohli",
            "country": "India",
            "role": "batsman",
            "jerseyNumber": 18,
            "photoUrl": "https://via.placeholder.com/200",
            "stats": {
                "t20i": {"runs": 3000, "avg": 40.5, "matches": 80},
                "odi": {"runs": 13000, "avg": 57.5, "matches": 270},
            },
        }

    async def get_team(self, team_id: str) -> Optional[dict]:
        """Get team details and statistics - mock implementation."""
        return {
            "id": team_id,
            "name": "India",
            "shortName": "IND",
            "country": "India",
            "logo": "https://via.placeholder.com/64",
            "stats": {
                "t20i": {"matches": 100, "wins": 65, "losses": 35},
                "odi": {"matches": 500, "wins": 280, "losses": 220},
            },
        }

    async def get_team_squad(self, team_id: str) -> List[dict]:
        """Get team squad for a series - mock implementation."""
        return [
            {
                "id": f"player_{i}",
                "name": f"Player {i}",
                "role": ["batsman", "bowler", "all-rounder"][i % 3],
                "jerseyNumber": i + 1,
            }
            for i in range(15)
        ]

    async def get_series(self, series_id: str) -> Optional[dict]:
        """Get series/tournament details - mock implementation."""
        return {
            "id": series_id,
            "name": "ICC T20 World Cup",
            "slug": "icc-t20-wc-2026",
            "format": "T20",
            "status": "upcoming",
            "season": "2026",
            "startDate": "2026-06-01",
            "endDate": "2026-07-15",
            "logo": "https://via.placeholder.com/200",
        }

    async def get_standings(self, series_id: str) -> List[dict]:
        """Get standings/table for a series - mock implementation."""
        teams = ["India", "Pakistan", "Australia", "England"]
        return [
            {
                "position": i + 1,
                "team": team,
                "matches": 5,
                "wins": 5 - i,
                "losses": i,
                "points": (5 - i) * 2,
            }
            for i, team in enumerate(teams)
        ]

    async def get_series_matches(self, series_id: str, status: str = "all") -> List[dict]:
        """Get matches for a series/tournament."""
        all_matches = await self.get_upcoming_matches(days=30)
        
        # Filter by series if multiple are available
        series_matches = [m for m in all_matches if m.get("league", {}).get("id") == series_id or m.get("series", {}).get("id") == series_id]
        
        if status != "all":
            series_matches = [m for m in series_matches if m.get("status") == status]
        
        return series_matches if series_matches else all_matches[:6]

    async def get_news(self, limit: int = 20) -> List[dict]:
        """Get cricket news - mock implementation."""
        return [
            {
                "id": f"news_{i}",
                "title": f"Cricket News {i}: Breaking Story",
                "description": "Exciting developments in international cricket",
                "source": "Cricbuzz",
                "imageUrl": "https://via.placeholder.com/200",
                "url": f"https://example.com/news/{i}",
                "publishedAt": (datetime.now() - timedelta(hours=i)).isoformat(),
            }
            for i in range(min(limit, 20))
        ]

    async def search(self, query: str) -> dict:
        """Search for matches, players, teams, news - mock implementation."""
        return {
            "matches": [{"id": "m1", "homeTeam": "India", "awayTeam": "Pakistan"}],
            "players": [{"id": "p1", "name": "Virat Kohli"}],
            "teams": [{"id": "t1", "name": "India"}],
            "news": [{"id": "n1", "title": "India wins match"}],
        }

    async def health_check(self) -> bool:
        """Check if provider is accessible - mock always returns True."""
        return True
