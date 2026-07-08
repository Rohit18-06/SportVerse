"""Player model"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.database import Base


class Player(Base):
    """Player model for cricket players."""
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    short_name = Column(String(50), nullable=False)
    role = Column(String(50), nullable=True)  # batsman, bowler, all-rounder, wicket-keeper
    country = Column(String(100), index=True, nullable=False)
    jersey_number = Column(Integer, nullable=True)
    photo_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    def __repr__(self) -> str:
        return f"<Player {self.name}>"
