"""Abstract Sports Provider base class"""
from abc import ABC, abstractmethod
from typing import Any, Optional, List


class SportsProvider(ABC):
    """
    Abstract base class for sports data providers.
    
    All sports data must come through a provider.
    Never hardcode API logic inside routes.
    """

    @abstractmethod
    async def get_live_matches(self) -> List[dict]:
        """Get all live matches."""
        pass

    @abstractmethod
    async def get_today_matches(self) -> List[dict]:
        """Get all matches happening today."""
        pass

    @abstractmethod
    async def get_upcoming_matches(self, days: int = 7) -> List[dict]:
        """Get upcoming matches for next N days."""
        pass

    @abstractmethod
    async def get_results(self, limit: int = 20) -> List[dict]:
        """Get recent completed matches."""
        pass

    @abstractmethod
    async def get_match(self, match_id: str) -> Optional[dict]:
        """Get detailed information about a specific match."""
        pass

    @abstractmethod
    async def get_match_commentary(self, match_id: str) -> List[dict]:
        """Get commentary for a match."""
        pass

    @abstractmethod
    async def get_match_scorecard(self, match_id: str) -> Optional[dict]:
        """Get scorecard for a match."""
        pass

    @abstractmethod
    async def get_player(self, player_id: str) -> Optional[dict]:
        """Get player details and statistics."""
        pass

    @abstractmethod
    async def get_team(self, team_id: str) -> Optional[dict]:
        """Get team details and statistics."""
        pass

    @abstractmethod
    async def get_team_squad(self, team_id: str) -> List[dict]:
        """Get team squad for a series."""
        pass

    @abstractmethod
    async def get_series(self, series_id: str) -> Optional[dict]:
        """Get series/tournament details."""
        pass

    @abstractmethod
    async def get_standings(self, series_id: str) -> List[dict]:
        """Get standings/table for a series."""
        pass

    @abstractmethod
    async def get_series_matches(self, series_id: str, status: str = "all") -> List[dict]:
        """Get matches for a series/tournament. Status: all, upcoming, completed, live."""
        pass

    @abstractmethod
    async def get_news(self, limit: int = 20) -> List[dict]:
        """Get cricket news."""
        pass

    @abstractmethod
    async def search(self, query: str) -> dict:
        """Search for matches, players, teams, news."""
        pass

    @abstractmethod
    async def health_check(self) -> bool:
        """Check if provider is accessible."""
        pass
