import json
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.indicator import Indicator


def calculate_risk_score(
    flagged_sources: int,
    total_queryable_sources: int
) -> int:
    """
    Calculate risk score based on source consensus.

    Formula:
        Risk Score = (Flagged Sources / Total Sources) × 100
    """

    if total_queryable_sources <= 0:
        return 0

    score = (flagged_sources / total_queryable_sources) * 100

    return min(100, max(0, round(score)))


def merge_sources(
    existing_sources: str | None,
    new_source: str
) -> str:
    """
    Add a new source without creating duplicates.
    Sources are stored as a JSON list.
    """

    if existing_sources:
        try:
            sources = json.loads(existing_sources)
        except (json.JSONDecodeError, TypeError):
            sources = []
    else:
        sources = []

    if new_source not in sources:
        sources.append(new_source)

    return json.dumps(sources)


def process_indicator(
    db: Session,
    normalized_indicator: dict,
    flagged: bool = True,
    total_queryable_sources: int = 1
) -> Indicator:
    """
    Process a normalized indicator.

    If the indicator already exists:
        - update last_seen
        - merge the source
        - update risk score

    If it does not exist:
        - create a new database record
    """

    value = normalized_indicator["value"]
    indicator_type = normalized_indicator["type"]
    source = normalized_indicator["source"]

    # Check whether this indicator already exists
    existing = (
        db.query(Indicator)
        .filter(
            Indicator.value == value,
            Indicator.type == indicator_type
        )
        .first()
    )

    # Convert raw data to JSON text if necessary
    raw_data = normalized_indicator.get("raw_data")

    if raw_data is not None and not isinstance(raw_data, str):
        raw_data = json.dumps(raw_data)

    # Calculate risk score
    flagged_sources = 1 if flagged else 0

    risk_score = calculate_risk_score(
        flagged_sources,
        total_queryable_sources
    )

    if existing:
        # Update existing indicator
        existing.last_seen = datetime.now(timezone.utc)

        existing.sources = merge_sources(
            existing.sources,
            source
        )

        existing.risk_score = risk_score

        if raw_data is not None:
            existing.raw_data = raw_data

        db.commit()
        db.refresh(existing)

        return existing

    # Create new indicator
    new_indicator = Indicator(
        value=value,
        type=indicator_type,
        source=source,
        first_seen=datetime.now(timezone.utc),
        last_seen=datetime.now(timezone.utc),
        risk_score=risk_score,
        sources=json.dumps([source]),
        raw_data=raw_data
    )

    db.add(new_indicator)
    db.commit()
    db.refresh(new_indicator)

    return new_indicator
