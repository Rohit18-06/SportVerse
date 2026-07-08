"""Match schemas"""
from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime
from app.schemas.team import TeamSchema
from app.schemas.venue import VenueSchema
from app.schemas.series import SeriesSchema


class MatchBase(BaseModel):
    """Base match schema"""
    format: str = Field(..., pattern="^(T20|ODI|Test)$")
    status: str = Field(..., pattern="^(upcoming|live|completed)$")


class MatchSchema(MatchBase):
    """Match response schema - minimal info for lists"""
    id: int
    external_id: str
    home_team_id: int
    away_team_id: int
    venue_id: Optional[int] = None
    series_id: Optional[int] = None
    match_date: datetime
    start_time: Optional[datetime] = None
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "external_id": "match_123",
                "home_team_id": 1,
                "away_team_id": 2,
                "venue_id": 1,
                "series_id": 1,
                "format": "T20",
                "status": "live",
                "match_date": "2026-07-05T10:30:00",
                "start_time": "2026-07-05T10:30:00",
            }
        }


class MatchDetailSchema(BaseModel):
    """Match detail response schema - comprehensive info for match detail page"""
    id: int
    external_id: str
    format: str
    status: str
    match_date: datetime
    start_time: Optional[datetime] = None
    
    # Team and venue info
    home_team: Optional[dict] = None
    away_team: Optional[dict] = None
    venue: Optional[VenueSchema] = None
    series: Optional[SeriesSchema] = None
    
    # Live match data - all fields needed by frontend
    live_data: Optional[dict] = Field(None, description="Current match score and statistics")
    toss_info: Optional[dict] = Field(None, description="Toss information")
    weather_info: Optional[dict] = Field(None, description="Weather information")
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "external_id": "match_123",
                "format": "T20",
                "status": "live",
                "match_date": "2026-07-05T10:30:00",
                "start_time": "2026-07-05T10:30:00",
                "home_team": {"id": 1, "name": "India", "short_name": "IND"},
                "away_team": {"id": 2, "name": "Australia", "short_name": "AUS"},
                "venue": {"id": 1, "name": "Eden Gardens", "city": "Kolkata", "country": "India"},
                "series": {"id": 1, "name": "Test Series", "slug": "test-series"},
                "live_data": {
                    "batting": {"runs": 150, "wickets": 3, "overs": 15},
                    "bowling": {},
                    "partnership": {"runs": 50, "balls": 35},
                },
                "toss_info": {"winner": "India", "decision": "bat"},
                "weather_info": {"condition": "sunny", "temperature": 28},
            }
        }


class MatchInDB(MatchSchema):
    """Match schema for database operations"""
    pass
