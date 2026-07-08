"""Venue schemas"""
from pydantic import BaseModel, Field
from typing import Optional


class VenueBase(BaseModel):
    """Base venue schema"""
    name: str = Field(..., min_length=1, max_length=255)
    city: str = Field(..., min_length=1, max_length=100)
    country: str = Field(..., min_length=1, max_length=100)
    capacity: Optional[int] = None


class VenueSchema(VenueBase):
    """Venue response schema"""
    id: int
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Eden Gardens",
                "city": "Kolkata",
                "country": "India",
                "capacity": 66349,
            }
        }


class VenueInDB(VenueSchema):
    """Venue schema for database operations"""
    pass
