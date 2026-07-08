"""Cricket API routes v1"""
from fastapi import APIRouter, HTTPException, Query
from app.services.cricket_service import CricketService
from app.schemas.common import ApiResponse
from typing import Any

router = APIRouter(
    prefix="/api/v1/cricket",
    tags=["cricket"],
    responses={
        404: {"description": "Not found"},
        500: {"description": "Internal server error"},
    },
)

# Initialize service
service = CricketService()


# ========== MATCH ENDPOINTS ==========


@router.get(
    "/live",
    response_model=ApiResponse[list],
    summary="Get live matches",
    description="Returns all currently live matches",
)
async def get_live_matches():
    """Get all live matches."""
    matches = await service.get_live_matches()
    return ApiResponse(
        success=True,
        data=matches,
        message="Live matches retrieved successfully" if matches else "No live matches available",
    )


@router.get(
    "/today",
    response_model=ApiResponse[list],
    summary="Get today's matches",
    description="Returns all matches scheduled for today",
)
async def get_today_matches():
    """Get all matches happening today."""
    matches = await service.get_today_matches()
    return ApiResponse(
        success=True,
        data=matches,
        message="Today's matches retrieved successfully",
    )


@router.get(
    "/upcoming",
    response_model=ApiResponse[list],
    summary="Get upcoming matches",
    description="Returns upcoming matches for the next N days",
)
async def get_upcoming_matches(days: int = Query(7, ge=1, le=30)):
    """Get upcoming matches for next N days."""
    matches = await service.get_upcoming_matches(days=days)
    return ApiResponse(
        success=True,
        data=matches,
        message=f"Upcoming matches for next {days} days retrieved successfully",
    )


@router.get(
    "/results",
    response_model=ApiResponse[list],
    summary="Get recent results",
    description="Returns recently completed matches",
)
async def get_results(limit: int = Query(20, ge=1, le=100)):
    """Get recent completed matches."""
    matches = await service.get_results(limit=limit)
    return ApiResponse(
        success=True,
        data=matches,
        message="Results retrieved successfully",
    )


@router.get(
    "/match/{match_id}",
    response_model=ApiResponse[dict],
    summary="Get match details",
    description="Returns comprehensive match information including live score, commentary, and statistics",
)
async def get_match_details(match_id: str):
    """Get detailed information about a specific match.
    
    Returns the raw Highlightly API format with:
    - state (description, teams scores, report)
    - statistics (innings data with batting/bowling tables)
    - squad (player information)
    - predictions (if available)
    - venue, league, forecast details
    """
    # For test/demo: check if it's a test ID
    if match_id == "test-001" or match_id.startswith("test-"):
        # Return rich fixture data for testing components
        match = {
            "id": match_id,
            "startDate": "2026-07-07",
            "startTime": "2026-07-07T14:30:00Z",
            "endDate": "2026-07-07",
            "format": "T20",
            "dayType": "day",
            "country": {"code": "IN", "name": "India", "logo": ""},
            "homeTeam": {"id": 1, "name": "India", "abbreviation": "IND", "logo": ""},
            "awayTeam": {"id": 2, "name": "Pakistan", "abbreviation": "PAK", "logo": ""},
            "state": {
                "description": "Finished",
                "report": "India won by 5 wickets",
                "teams": {
                    "home": {"score": "165/4", "info": "20.0 Ov"},
                    "away": {"score": "164", "info": "20.0 Ov"}
                }
            },
            "league": {"id": 1, "name": "International T20", "season": 2026},
            "venue": {"name": "Lord's", "city": "London", "country": "England", "capacity": "30000"},
            "forecast": {"status": "Clear", "temperature": "22°C"},
            "predictions": None,
            "statistics": [
                {
                    "inningNumber": 1,
                    "team": {"id": 2, "name": "Pakistan", "abbreviation": "PAK", "logo": "", "byes": 1, "legByes": 2, "wides": 3, "noBalls": 1, "extras": 7},
                    "inningBatsmen": [
                        {
                            "player": {"id": "p1", "name": "Babar Azam", "battingStyles": ["Right-hand"], "bowlingStyles": [], "roles": ["Batsman", "Captain"]},
                            "runs": 52, "balls": 38, "fours": 6, "sixes": 1, "dismissalStatus": "c Dhawan b Bumrah", "battingStrikeRate": 136.84,
                            "dismissalFielders": [{"name": "Dhawan", "isKeeper": False}]
                        },
                        {
                            "player": {"id": "p2", "name": "Fakhar Zaman", "battingStyles": ["Left-hand"], "bowlingStyles": [], "roles": ["Batsman"]},
                            "runs": 45, "balls": 32, "fours": 5, "sixes": 1, "dismissalStatus": "b Bumrah", "battingStrikeRate": 140.62,
                            "dismissalFielders": []
                        }
                    ],
                    "inningBowlers": [
                        {
                            "player": {"name": "Jasprit Bumrah", "battingStyles": [], "bowlingStyles": ["Right-arm", "Fast"], "roles": ["Bowler"]},
                            "overs": 4, "wickets": 2, "concededRuns": 28, "economy": 7.0, "maidens": 0
                        }
                    ],
                    "fallOfWickets": [
                        {"order": 1, "runs": 52, "overs": 8.2, "dismissalBatsman": {"name": "Babar Azam"}}
                    ],
                    "inningPartnerships": [
                        {
                            "runs": 52, "balls": 38, "overs": 8.2,
                            "firstPlayer": {"id": "p1", "name": "Babar Azam"},
                            "secondPlayer": {"id": "p2", "name": "Fakhar Zaman"},
                            "firstPlayerRuns": 32, "firstPlayerBalls": 23,
                            "secondPlayerRuns": 20, "secondPlayerBalls": 15
                        }
                    ],
                    "fieldingSummary": {"catches": 5, "runOuts": 1, "stumpings": 0, "runsSaved": 12, "catchesDropped": 1}
                },
                {
                    "inningNumber": 2,
                    "team": {"id": 1, "name": "India", "abbreviation": "IND", "logo": "", "byes": 2, "legByes": 1, "wides": 2, "noBalls": 0, "extras": 5},
                    "inningBatsmen": [
                        {
                            "player": {"id": "p3", "name": "Rohit Sharma", "battingStyles": ["Right-hand"], "bowlingStyles": [], "roles": ["Batsman", "Captain"]},
                            "runs": 58, "balls": 42, "fours": 7, "sixes": 2, "dismissalStatus": "not out", "battingStrikeRate": 138.09,
                            "dismissalFielders": []
                        }
                    ],
                    "inningBowlers": [
                        {
                            "player": {"name": "Shaheen Shah Afridi", "battingStyles": [], "bowlingStyles": ["Left-arm", "Fast"], "roles": ["Bowler"]},
                            "overs": 4, "wickets": 1, "concededRuns": 35, "economy": 8.75, "maidens": 0
                        }
                    ],
                    "fallOfWickets": [],
                    "inningPartnerships": [],
                    "fieldingSummary": {"catches": 3, "runOuts": 0, "stumpings": 1, "runsSaved": 8, "catchesDropped": 0}
                }
            ],
            "squad": [
                {"team": {"id": 1, "name": "India", "abbreviation": "IND", "logo": ""}, "players": [{"name": "Rohit Sharma", "battingStyles": [], "bowlingStyles": [], "roles": []}]}
            ]
        }
    else:
        # Get match from Highlightly - returns RAW format, not normalized
        match = await service.get_match_details(match_id)
    
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    return ApiResponse(
        success=True,
        data=match,
        message="Match details retrieved successfully",
    )


# ========== PLAYER ENDPOINTS ==========


@router.get(
    "/player/{player_id}",
    response_model=ApiResponse[dict],
    summary="Get player details",
    description="Returns player information and career statistics",
)
async def get_player(player_id: str):
    """Get player details and statistics."""
    player = await service.get_player(player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    return ApiResponse(
        success=True,
        data=player,
        message="Player details retrieved successfully",
    )


@router.get(
    "/player/{player_id}/career",
    response_model=ApiResponse[dict],
    summary="Get player career statistics",
    description="Returns career statistics for a player",
)
async def get_player_career(player_id: str):
    """Get player career statistics."""
    career = await service.get_player_career(player_id)
    if not career:
        raise HTTPException(status_code=404, detail="Player career data not found")

    return ApiResponse(
        success=True,
        data=career,
        message="Player career statistics retrieved successfully",
    )


@router.get(
    "/player/{player_id}/matches",
    response_model=ApiResponse[list],
    summary="Get player recent matches",
    description="Returns recent matches featuring a player",
)
async def get_player_matches(player_id: str):
    """Get recent matches for a player."""
    matches = await service.get_player_matches(player_id)
    return ApiResponse(
        success=True,
        data=matches,
        message="Player matches retrieved successfully",
    )


@router.get(
    "/player/{player_id}/statistics",
    response_model=ApiResponse[dict],
    summary="Get player statistics",
    description="Returns statistics for a player",
)
async def get_player_statistics(player_id: str):
    """Get player statistics."""
    statistics = await service.get_player_statistics(player_id)
    if not statistics:
        raise HTTPException(status_code=404, detail="Player statistics not found")

    return ApiResponse(
        success=True,
        data=statistics,
        message="Player statistics retrieved successfully",
    )


@router.get(
    "/player/{player_id}/news",
    response_model=ApiResponse[list],
    summary="Get player news",
    description="Returns news related to a player",
)
async def get_player_news(player_id: str):
    """Get news for a player."""
    news = await service.get_player_news(player_id)
    return ApiResponse(
        success=True,
        data=news,
        message="Player news retrieved successfully",
    )


# ========== TEAM ENDPOINTS ==========


@router.get(
    "/team/{team_id}",
    response_model=ApiResponse[dict],
    summary="Get team details",
    description="Returns team information and statistics",
)
async def get_team(team_id: str):
    """Get team details and statistics."""
    team = await service.get_team(team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    return ApiResponse(
        success=True,
        data=team,
        message="Team details retrieved successfully",
    )


@router.get(
    "/team/{team_id}/squad",
    response_model=ApiResponse[list],
    summary="Get team squad",
    description="Returns the squad of a team for a series",
)
async def get_team_squad(team_id: str):
    """Get team squad for a series."""
    squad = await service.get_team_squad(team_id)
    return ApiResponse(
        success=True,
        data=squad,
        message="Team squad retrieved successfully",
    )


@router.get(
    "/team/{team_id}/fixtures",
    response_model=ApiResponse[list],
    summary="Get team fixtures",
    description="Returns upcoming matches for a team",
)
async def get_team_fixtures(team_id: str):
    """Get upcoming matches for a team."""
    fixtures = await service.get_team_fixtures(team_id)
    return ApiResponse(
        success=True,
        data=fixtures,
        message="Team fixtures retrieved successfully",
    )


@router.get(
    "/team/{team_id}/results",
    response_model=ApiResponse[list],
    summary="Get team results",
    description="Returns recently completed matches for a team",
)
async def get_team_results(team_id: str):
    """Get recent results for a team."""
    results = await service.get_team_results(team_id)
    return ApiResponse(
        success=True,
        data=results,
        message="Team results retrieved successfully",
    )


@router.get(
    "/team/{team_id}/news",
    response_model=ApiResponse[list],
    summary="Get team news",
    description="Returns news related to a team",
)
async def get_team_news(team_id: str):
    """Get news for a team."""
    news = await service.get_team_news(team_id)
    return ApiResponse(
        success=True,
        data=news,
        message="Team news retrieved successfully",
    )


# ========== SERIES ENDPOINTS ==========


@router.get(
    "/series/{series_id}",
    response_model=ApiResponse[dict],
    summary="Get series details",
    description="Returns series/tournament information",
)
async def get_series(series_id: str):
    """Get series/tournament details."""
    series = await service.get_series(series_id)
    if not series:
        raise HTTPException(status_code=404, detail="Series not found")

    return ApiResponse(
        success=True,
        data=series,
        message="Series details retrieved successfully",
    )


@router.get(
    "/standings/{series_id}",
    response_model=ApiResponse[list],
    summary="Get series standings",
    description="Returns the standings/table for a series",
)
async def get_standings(series_id: str):
    """Get standings/table for a series."""
    standings = await service.get_standings(series_id)
    if not standings:
        raise HTTPException(status_code=404, detail="Standings not found")

    return ApiResponse(
        success=True,
        data=standings,
        message="Standings retrieved successfully",
    )


@router.get(
    "/series/{series_id}/matches",
    response_model=ApiResponse[list],
    summary="Get series matches",
    description="Returns all matches for a series/tournament",
)
async def get_series_matches(series_id: str, status: str = Query("all")):
    """Get matches for a series/tournament."""
    matches = await service.get_series_matches(series_id, status)
    return ApiResponse(
        success=True,
        data=matches,
        message="Series matches retrieved successfully",
    )


# ========== NEWS ENDPOINT ==========


@router.get(
    "/news",
    response_model=ApiResponse[list],
    summary="Get cricket news",
    description="Returns latest cricket news",
)
async def get_news(limit: int = Query(20, ge=1, le=100)):
    """Get cricket news."""
    news = await service.get_news(limit=limit)
    return ApiResponse(
        success=True,
        data=news,
        message="News retrieved successfully",
    )


# ========== SEARCH ENDPOINT ==========


@router.get(
    "/search",
    response_model=ApiResponse[dict],
    summary="Search cricket data",
    description="Search for matches, players, teams, and news",
)
async def search(q: str = Query(..., min_length=2, max_length=100)):
    """Search for matches, players, teams, news."""
    results = await service.search(q)
    return ApiResponse(
        success=True,
        data=results,
        message="Search results retrieved successfully",
    )
