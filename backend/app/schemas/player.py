"""Player schemas"""
from pydantic import BaseModel, Field
from typing import Optional


class PlayerBase(BaseModel):
    """Base player schema"""
    name: str = Field(..., min_length=1, max_length=255)
    short_name: str = Field(..., min_length=1, max_length=50)
    role: Optional[str] = Field(None, max_length=50)  # batsman, bowler, all-rounder
    country: str = Field(..., min_length=1, max_length=100)
    jersey_number: Optional[int] = None
    photo_url: Optional[str] = Field(None, max_length=500)


class PlayerSchema(PlayerBase):
    """Player response schema"""
    id: int
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Virat Kohli",
                "short_name": "Kohli",
                "role": "batsman",
                "country": "India",
                "jersey_number": 18,
                "photo_url": "https://example.com/kohli.jpg",
            }
        }


class PlayerInDB(PlayerSchema):
    """Player schema for database operations"""
    pass
