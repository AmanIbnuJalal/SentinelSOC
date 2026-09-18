from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.indicator import IndicatorCreate, IndicatorResponse
from app.services.normalizer import normalize_indicator
from app.services.processor import process_indicator


router = APIRouter(
    prefix="/api/indicators",
    tags=["Indicators"]
)


@router.post("/", response_model=IndicatorResponse)
def create_indicator(
    indicator: IndicatorCreate,
    db: Session = Depends(get_db)
):
    # Step 1: Normalize the incoming indicator
    normalized = normalize_indicator(
        value=indicator.value,
        source=indicator.source,
        raw_data=indicator.raw_data
    )

    # Step 2: Process the indicator
    # This handles deduplication, source tracking,
    # and risk-score calculation.
    processed = process_indicator(
        db=db,
        normalized_indicator=normalized,
        flagged=True,
        total_queryable_sources=1
    )

    return processed


@router.get("/", response_model=list[IndicatorResponse])
def get_indicators(
    db: Session = Depends(get_db)
):
    from app.models.indicator import Indicator

    indicators = (
        db.query(Indicator)
        .order_by(Indicator.last_seen.desc())
        .all()
    )

    return indicators
