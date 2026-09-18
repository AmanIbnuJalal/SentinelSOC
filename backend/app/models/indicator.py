from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database import Base


class Indicator(Base):
    __tablename__ = "indicators"

    id = Column(Integer, primary_key=True, index=True)

    value = Column(String(500), nullable=False, index=True)

    type = Column(String(20), nullable=False, index=True)

    source = Column(String(100), nullable=False)

    first_seen = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    last_seen = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    risk_score = Column(Integer, default=0, nullable=False)

    country = Column(String(100), nullable=True)

    region = Column(String(100), nullable=True)

    isp = Column(String(255), nullable=True)

    sources = Column(Text, nullable=True)

    raw_data = Column(Text, nullable=True)
