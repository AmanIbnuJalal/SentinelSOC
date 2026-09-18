import json
import re
from datetime import datetime, timezone


def detect_indicator_type(value: str) -> str:
    """
    Detect whether an indicator is an IP, Domain, or Hash.
    """

    value = value.strip()

    # IPv4 detection
    ipv4_pattern = r"^(?:\d{1,3}\.){3}\d{1,3}$"

    if re.match(ipv4_pattern, value):
        return "IP"

    # Hash detection
    if re.match(r"^[a-fA-F0-9]{32}$", value):
        return "Hash"

    if re.match(r"^[a-fA-F0-9]{40}$", value):
        return "Hash"

    if re.match(r"^[a-fA-F0-9]{64}$", value):
        return "Hash"

    # Otherwise treat it as a domain
    return "Domain"


def normalize_indicator(
    value: str,
    source: str,
    raw_data=None
) -> dict:
    """
    Convert raw indicator information into the
    standard SentinelSOC format.
    """

    value = value.strip()

    indicator_type = detect_indicator_type(value)

    return {
        "value": value,
        "type": indicator_type,
        "source": source,
        "timestamp": datetime.now(timezone.utc),
        "raw_data": raw_data
    }
