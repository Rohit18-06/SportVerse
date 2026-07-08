"""Series model"""
from sqlalchemy import Column, Integer, String, DateTime, Date
from sqlalchemy.sql import func
from app.database.database import Base


class Series(Base):
    """Series model for cricket series/tournaments."""
    __tablename__ = "series"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    format = Column(String(20), nullable=False)  # T20, ODI, Test
    status = Column(String(20), nullable=False)  # upcoming, live, completed
    season = Column(String(20), nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    logo_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    def __repr__(self) -> str:
        return f"<Series {self.name}>"
