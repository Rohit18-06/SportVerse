"""WebSocket handlers for match updates"""
import asyncio
import json
from typing import Dict, Set
from fastapi import WebSocket, WebSocketDisconnect
from datetime import datetime
from app.services.cricket_service import CricketService


class MatchUpdateManager:
    """Manages WebSocket connections for match updates."""

    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        self.service = CricketService()

    async def connect(self, match_id: str, websocket: WebSocket):
        """Connect a new WebSocket client to a match."""
        await websocket.accept()
        if match_id not in self.active_connections:
            self.active_connections[match_id] = set()
        self.active_connections[match_id].add(websocket)
        print(f"✓ Client connected to match {match_id}")

    def disconnect(self, match_id: str, websocket: WebSocket):
        """Disconnect a WebSocket client."""
        if match_id in self.active_connections:
            self.active_connections[match_id].discard(websocket)
            if not self.active_connections[match_id]:
                del self.active_connections[match_id]
        print(f"✓ Client disconnected from match {match_id}")

    async def broadcast_to_match(self, match_id: str, message: dict):
        """Broadcast a message to all clients connected to a match."""
        if match_id not in self.active_connections:
            return

        message["timestamp"] = datetime.utcnow().isoformat()
        disconnected = []

        for websocket in self.active_connections[match_id]:
            try:
                await websocket.send_json(message)
            except Exception as e:
                print(f"Error sending message: {e}")
                disconnected.append(websocket)

        # Clean up disconnected clients
        for websocket in disconnected:
            self.disconnect(match_id, websocket)

    async def send_match_updates(self, match_id: str, interval: int = 10):
        """Send periodic match updates to all connected clients."""
        while match_id in self.active_connections:
            try:
                # Fetch latest match data
                match = await self.service.get_match_details(match_id)

                if match:
                    message = {
                        "type": "match_update",
                        "data": match,
                    }
                    await self.broadcast_to_match(match_id, message)

                await asyncio.sleep(interval)
            except Exception as e:
                print(f"Error fetching match updates: {e}")
                await asyncio.sleep(interval)


# Global instance
match_manager = MatchUpdateManager()
