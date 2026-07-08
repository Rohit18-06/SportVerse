#!/usr/bin/env python
"""
Run the SportsVerse backend server.
Usage: python run.py
"""
import uvicorn
import sys
from app.core.config import settings

if __name__ == "__main__":
    print("=" * 60)
    print("🚀 SportsVerse Backend")
    print("=" * 60)
    print(f"Environment: {settings.ENVIRONMENT}")
    print(f"Host: {settings.HOST}")
    print(f"Port: {settings.PORT}")
    print(f"Debug: {settings.DEBUG}")
    print("=" * 60)
    print("📚 API Docs: http://localhost:8000/api/docs")
    print("📖 ReDoc: http://localhost:8000/api/redoc")
    print("=" * 60)

    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info",
    )
