"""Favorite model"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.database import Base


class Favorite(Base):
    """Favorite model for user favorites (teams, players, matches)."""
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    favorite_type = Column(String(50), nullable=False)  # team, player, series
    favorite_id = Column(Integer, nullable=False)  # ID of the favorited entity
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self) -> str:
        return f"<Favorite {self.favorite_type}:{self.favorite_id}>"
