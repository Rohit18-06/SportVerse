"""Team schemas"""
from pydantic import BaseModel, Field
from typing import Optional


class TeamBase(BaseModel):
    """Base team schema"""
    name: str = Field(..., min_length=1, max_length=255)
    short_name: str = Field(..., min_length=1, max_length=10)
    country: str = Field(..., min_length=1, max_length=100)
    logo_url: Optional[str] = Field(None, max_length=500)


class TeamSchema(TeamBase):
    """Team response schema"""
    id: int
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "India",
                "short_name": "IND",
                "country": "India",
                "logo_url": "https://example.com/india.png",
            }
        }


class TeamInDB(TeamSchema):
    """Team schema for database operations"""
    pass
