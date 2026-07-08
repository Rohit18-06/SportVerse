"""Application constants"""

# Cricket formats
CRICKET_FORMATS = ["T20", "T20I", "ODI", "Test"]

# Match statuses
MATCH_STATUS = ["upcoming", "live", "completed", "abandoned"]

# Player roles
PLAYER_ROLES = ["batsman", "bowler", "all-rounder", "wicket-keeper"]

# Default pagination
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100

# Cache TTL in seconds
CACHE_TTL_LIVE_MATCHES = 30
CACHE_TTL_UPCOMING_MATCHES = 300
CACHE_TTL_RESULTS = 600
CACHE_TTL_NEWS = 1800
CACHE_TTL_PLAYER = 3600
CACHE_TTL_TEAM = 3600

# WebSocket
WS_HEARTBEAT_INTERVAL = 30  # seconds
