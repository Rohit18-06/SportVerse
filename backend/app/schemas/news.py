"""News schemas"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class NewsBase(BaseModel):
    """Base news schema"""
    title: str = Field(..., min_length=1, max_length=500)
    description: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = Field(None, max_length=255)
    source: str = Field(..., max_length=100)
    image_url: Optional[str] = Field(None, max_length=500)
    url: Optional[str] = Field(None, max_length=500)
    published_at: Optional[datetime] = None


class NewsSchema(NewsBase):
    """News response schema"""
    id: int
    external_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "external_id": "news_123",
                "title": "India wins against Australia",
                "description": "India defeated Australia in a thrilling T20 match",
                "author": "Cricket Reporter",
                "source": "Cricbuzz",
                "image_url": "https://example.com/news.jpg",
                "url": "https://example.com/news/123",
                "published_at": "2026-07-05T10:30:00",
                "created_at": "2026-07-05T10:30:00",
            }
        }


class NewsInDB(NewsSchema):
    """News schema for database operations"""
    pass
