"""Common API response schemas"""
from typing import Any, Generic, TypeVar, Optional
from pydantic import BaseModel, Field
from datetime import datetime

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    """Standard API response format for all endpoints."""
    success: bool = Field(True, description="Whether the request was successful")
    data: Optional[T] = Field(None, description="Response data")
    message: Optional[str] = Field(None, description="Response message or error description")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Response timestamp")

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": {},
                "message": "Success",
                "timestamp": "2026-07-05T10:30:00",
            }
        }


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated response with metadata."""
    success: bool = True
    data: list[T]
    total: int
    page: int
    page_size: int
    total_pages: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": [],
                "total": 100,
                "page": 1,
                "page_size": 20,
                "total_pages": 5,
                "timestamp": "2026-07-05T10:30:00",
            }
        }
