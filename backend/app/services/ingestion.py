import json

from sqlalchemy.orm import Session

from app.services.normalizer import normalize_indicator
from app.services.processor import process_indicator


def ingest_sample_feed(
    db: Session,
    feed_data: list[dict]
) -> int:
    """
    Process indicators from a sample threat-intelligence feed.

    Returns the number of indicators processed.
    """

    processed_count = 0

    for item in feed_data:
        value = item.get("value")
        source = item.get("source", "Sample Feed")
        raw_data = item.get("raw_data")

        if not value:
            continue

        normalized = normalize_indicator(
            value=value,
            source=source,
            raw_data=raw_data
        )

        process_indicator(
            db=db,
            normalized_indicator=normalized,
            flagged=True,
            total_queryable_sources=1
        )

        processed_count += 1

    return processed_count


def load_sample_feed(file_path: str) -> list[dict]:
    """
    Load threat indicators from a JSON file.
    """

    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)
