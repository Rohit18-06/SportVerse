"""Match model"""
from sqlalchemy import Column, Integer, String, DateTime, Float, JSON, Date, ForeignKey
from sqlalchemy.sql import func
from app.database.database import Base


class Match(Base):
    """Match model for cricket matches."""
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String(100), unique=True, index=True, nullable=False)
    series_id = Column(Integer, ForeignKey("series.id"), nullable=True)
    home_team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    away_team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    venue_id = Column(Integer, ForeignKey("venues.id"), nullable=True)
    
    # Match details
    format = Column(String(20), nullable=False)  # T20, ODI, Test
    status = Column(String(20), nullable=False, index=True)  # upcoming, live, completed
    match_date = Column(DateTime(timezone=True), nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=True)
    
    # Live/Score data (JSON for flexibility with different API formats)
    live_data = Column(JSON, nullable=True)
    toss_info = Column(JSON, nullable=True)
    weather_info = Column(JSON, nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    def __repr__(self) -> str:
        return f"<Match {self.external_id}>"
