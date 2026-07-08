"""Cricket service - handles business logic for cricket operations"""
from typing import Optional, List
from app.providers.base import SportsProvider
from app.providers.cricket import CricketProvider
from app.providers.highlightly import HighlightlyProvider
from app.core.config import settings


class CricketService:
    """
    Service layer for cricket operations.
    Calls provider for data, implements business logic.
    All routes should use this service.
    """

    def __init__(self, provider: Optional[SportsProvider] = None):
        """
        Initialize with provider.
        
        If no provider is passed, uses configuration to determine:
        - highlightly: HighlightlyProvider (real data)
        - mock: CricketProvider (mock data)
        """
        if provider:
            self.provider = provider
        elif settings.CRICKET_API_KEY:
            # If API key is configured, use Highlightly
            self.provider = HighlightlyProvider()
        else:
            # Default to mock
            self.provider = CricketProvider()

    async def get_live_matches(self) -> List[dict]:
        """Get all live matches."""
        try:
            matches = await self.provider.get_live_matches()
            return matches
        except Exception as e:
            print(f"Error fetching live matches: {e}")
            return []

    async def get_today_matches(self) -> List[dict]:
        """Get all matches happening today."""
        try:
            matches = await self.provider.get_today_matches()
            return matches
        except Exception as e:
            print(f"Error fetching today's matches: {e}")
            return []

    async def get_upcoming_matches(self, days: int = 7) -> List[dict]:
        """Get upcoming matches for next N days."""
        try:
            matches = await self.provider.get_upcoming_matches(days=days)
            return matches
        except Exception as e:
            print(f"Error fetching upcoming matches: {e}")
            return []

    async def get_results(self, limit: int = 20) -> List[dict]:
        """Get recent completed matches."""
        try:
            matches = await self.provider.get_results(limit=limit)
            return matches
        except Exception as e:
            print(f"Error fetching results: {e}")
            return []

    async def get_match_details(self, match_id: str) -> Optional[dict]:
        """Get detailed information about a specific match.
        
        Returns RAW Highlightly format (not normalized) so frontend gets full data:
        - statistics with innings batting/bowling tables
        - squad information
        - predictions
        - all venue/league/forecast details
        
        Normalization is only for list views (cards). Match details need full data.
        """
        try:
            match = await self.provider.get_match_raw(match_id)
            if not match:
                return None

            # Enrich with commentary and scorecard if provider has these methods
            commentary = await self.provider.get_match_commentary(match_id)
            if commentary:
                match["commentary"] = commentary
            
            # Note: scorecard is already in statistics field from Highlightly
            # No need to fetch separately

            return match
        except Exception as e:
            print(f"Error fetching match details for {match_id}: {e}")
            return None

    async def get_player(self, player_id: str) -> Optional[dict]:
        """Get player details and statistics."""
        try:
            player = await self.provider.get_player(player_id)
            return player
        except Exception as e:
            print(f"Error fetching player {player_id}: {e}")
            return None

    async def get_player_career(self, player_id: str) -> Optional[dict]:
        """Get player career statistics."""
        try:
            player = await self.provider.get_player(player_id)
            if not player:
                return None
            # Career stats are typically in the player object
            return player.get("stats", {}) or player
        except Exception as e:
            print(f"Error fetching player career for {player_id}: {e}")
            return None

    async def get_player_matches(self, player_id: str) -> List[dict]:
        """Get recent matches for a player."""
        try:
            # Get recent matches and filter for player
            results = await self.provider.get_results(limit=50)
            upcoming = await self.provider.get_upcoming_matches(days=30)
            all_matches = results + upcoming
            
            # Filter matches containing the player
            player_matches = [
                m for m in all_matches
                if player_id.lower() in str(m).lower()
            ]
            return player_matches[:10]
        except Exception as e:
            print(f"Error fetching player matches for {player_id}: {e}")
            return []

    async def get_player_statistics(self, player_id: str) -> Optional[dict]:
        """Get player statistics."""
        try:
            player = await self.provider.get_player(player_id)
            if not player:
                return None
            return player.get("stats", {}) or {}
        except Exception as e:
            print(f"Error fetching player statistics for {player_id}: {e}")
            return None

    async def get_player_news(self, player_id: str) -> List[dict]:
        """Get news for a player."""
        try:
            news = await self.provider.get_news(limit=50)
            
            # Filter for player
            player_news = [
                n for n in news
                if player_id.lower() in str(n).lower()
            ]
            return player_news[:10]
        except Exception as e:
            print(f"Error fetching player news for {player_id}: {e}")
            return []

    async def get_team(self, team_id: str) -> Optional[dict]:
        """Get team details and statistics."""
        try:
            team = await self.provider.get_team(team_id)
            return team
        except Exception as e:
            print(f"Error fetching team {team_id}: {e}")
            return None

    async def get_team_squad(self, team_id: str) -> List[dict]:
        """Get team squad for a series."""
        try:
            squad = await self.provider.get_team_squad(team_id)
            return squad
        except Exception as e:
            print(f"Error fetching team squad for {team_id}: {e}")
            return []

    async def get_team_fixtures(self, team_id: str) -> List[dict]:
        """Get upcoming matches for a team."""
        try:
            matches = await self.provider.get_live_matches()
            upcoming = await self.provider.get_upcoming_matches(days=30)
            all_matches = matches + upcoming
            
            # Filter for team
            team_matches = [
                m for m in all_matches
                if (m.get("homeTeam", {}).get("id") == team_id or 
                    m.get("homeTeam", {}).get("name") == team_id or
                    m.get("awayTeam", {}).get("id") == team_id or
                    m.get("awayTeam", {}).get("name") == team_id)
            ]
            return team_matches[:10]
        except Exception as e:
            print(f"Error fetching team fixtures for {team_id}: {e}")
            return []

    async def get_team_results(self, team_id: str) -> List[dict]:
        """Get recent results for a team."""
        try:
            results = await self.provider.get_results(limit=50)
            
            # Filter for team
            team_results = [
                m for m in results
                if (m.get("homeTeam", {}).get("id") == team_id or 
                    m.get("homeTeam", {}).get("name") == team_id or
                    m.get("awayTeam", {}).get("id") == team_id or
                    m.get("awayTeam", {}).get("name") == team_id)
            ]
            return team_results[:10]
        except Exception as e:
            print(f"Error fetching team results for {team_id}: {e}")
            return []

    async def get_team_news(self, team_id: str) -> List[dict]:
        """Get news for a team."""
        try:
            news = await self.provider.get_news(limit=50)
            
            # Filter for team
            team_news = [
                n for n in news
                if team_id.lower() in str(n).lower()
            ]
            return team_news[:10]
        except Exception as e:
            print(f"Error fetching team news for {team_id}: {e}")
            return []

    async def get_series(self, series_id: str) -> Optional[dict]:
        """Get series/tournament details."""
        try:
            series = await self.provider.get_series(series_id)
            return series
        except Exception as e:
            print(f"Error fetching series {series_id}: {e}")
            return None

    async def get_standings(self, series_id: str) -> List[dict]:
        """Get standings/table for a series."""
        try:
            standings = await self.provider.get_standings(series_id)
            return standings
        except Exception as e:
            print(f"Error fetching standings for {series_id}: {e}")
            return []

    async def get_series_matches(self, series_id: str, status: str = "all") -> List[dict]:
        """Get matches for a series/tournament. Status: all, upcoming, completed, live."""
        try:
            matches = await self.provider.get_series_matches(series_id, status)
            return matches
        except Exception as e:
            print(f"Error fetching series matches for {series_id}: {e}")
            return []

    async def get_news(self, limit: int = 20) -> List[dict]:
        """Get cricket news."""
        try:
            news = await self.provider.get_news(limit=limit)
            return news
        except Exception as e:
            print(f"Error fetching news: {e}")
            return []

    async def search(self, query: str) -> dict:
        """Search for matches, players, teams, news."""
        try:
            if not query or len(query) < 2:
                return {"matches": [], "players": [], "teams": [], "news": []}

            results = await self.provider.search(query)
            return results
        except Exception as e:
            print(f"Error searching for '{query}': {e}")
            return {"matches": [], "players": [], "teams": [], "news": []}

    async def health_check(self) -> bool:
        """Check if provider is accessible."""
        try:
            return await self.provider.health_check()
        except Exception as e:
            print(f"Health check failed: {e}")
            return False
