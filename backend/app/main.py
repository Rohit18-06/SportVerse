"""
SportsVerse Backend
Production-ready backend for multi-sport platform
Scalable to millions of users with clean architecture
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import (
    get_redoc_html,
    get_swagger_ui_html,
    get_swagger_ui_oauth2_redirect_html,
)
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1 import router as cricket_router
from app.api.ws import router as ws_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle - startup and shutdown."""
    # Startup
    print("=" * 60)
    print("🚀 SportsVerse Backend Starting")
    print("=" * 60)
    print(f"Environment: {settings.ENVIRONMENT}")
    print(f"Host: {settings.HOST}")
    print(f"Port: {settings.PORT}")
    print(f"Debug: {settings.DEBUG}")
    print("=" * 60)
    print("📚 API Docs: http://localhost:8000/docs")
    print("📖 ReDoc: http://localhost:8000/redoc")
    print("=" * 60)
    yield
    # Shutdown
    print("✓ SportsVerse Backend Shutting Down...")


# Create FastAPI app
app = FastAPI(
    title="SportsVerse API",
    description="Production-ready backend for multi-sport platform",
    version="1.0.0",
    docs_url=None,  # We'll serve custom docs
    redoc_url=None,  # We'll serve custom redoc
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(cricket_router)
app.include_router(ws_router)


# Custom Swagger UI
@app.get("/docs", include_in_schema=False)
async def get_swagger_ui():
    """Swagger UI documentation."""
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="SportsVerse API - Swagger UI",
        swagger_ui_parameters={"defaultModelsExpandDepth": 1},
    )


@app.get("/docs/oauth2-redirect", include_in_schema=False)
async def swagger_ui_redirect():
    """OAuth2 redirect for Swagger UI."""
    return get_swagger_ui_oauth2_redirect_html()


# Custom ReDoc
@app.get("/redoc", include_in_schema=False)
async def get_redoc():
    """ReDoc documentation."""
    return get_redoc_html(
        openapi_url="/openapi.json",
        title="SportsVerse API - ReDoc",
    )


# Root endpoint
@app.get("/")
async def root():
    """Welcome endpoint."""
    return {
        "service": "SportsVerse API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs",
        "redoc": "/redoc",
    }


# Health check
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
