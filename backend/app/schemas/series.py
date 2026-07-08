"""Series schemas"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class SeriesBase(BaseModel):
    """Base series schema"""
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=100)
    format: str = Field(..., pattern="^(T20|ODI|Test)$")
    status: str = Field(..., pattern="^(upcoming|live|completed)$")
    season: Optional[str] = Field(None, max_length=20)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    logo_url: Optional[str] = Field(None, max_length=500)


class SeriesSchema(SeriesBase):
    """Series response schema"""
    id: int
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "ICC T20 World Cup",
                "slug": "icc-t20-wc-2026",
                "format": "T20",
                "status": "upcoming",
                "season": "2026",
                "start_date": "2026-06-01",
                "end_date": "2026-07-15",
                "logo_url": "https://example.com/wc.png",
            }
        }


class SeriesInDB(SeriesSchema):
    """Series schema for database operations"""
    pass
