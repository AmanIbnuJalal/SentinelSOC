from datetime import datetime

from pydantic import BaseModel, ConfigDict


class IndicatorCreate(BaseModel):
    value: str
    type: str
    source: str
    raw_data: str | None = None


class IndicatorResponse(BaseModel):
    id: int
    value: str
    type: str
    source: str
    first_seen: datetime
    last_seen: datetime
    risk_score: int
    country: str | None
    region: str | None
    isp: str | None
    sources: str | None
    raw_data: str | None

    model_config = ConfigDict(from_attributes=True)
