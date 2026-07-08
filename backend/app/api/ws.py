"""WebSocket routes"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.match_updates import match_manager
import asyncio

router = APIRouter(
    tags=["websocket"],
)


@router.websocket("/ws/match/{match_id}")
async def websocket_match_updates(websocket: WebSocket, match_id: str):
    """
    WebSocket endpoint for real-time match updates.
    
    Usage:
    ```
    ws = new WebSocket("ws://localhost:8000/ws/match/match_001")
    ws.onmessage = (event) => {
        console.log(JSON.parse(event.data))
    }
    ```
    """
    await match_manager.connect(match_id, websocket)

    # Start sending updates
    update_task = asyncio.create_task(match_manager.send_match_updates(match_id))

    try:
        while True:
            # Keep connection alive and listen for incoming messages
            data = await websocket.receive_text()
            # Optional: handle client messages (e.g., commands)
            if data == "ping":
                await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        match_manager.disconnect(match_id, websocket)
        update_task.cancel()
        print(f"✓ WebSocket disconnected from match {match_id}")
    except Exception as e:
        print(f"WebSocket error: {e}")
        match_manager.disconnect(match_id, websocket)
        update_task.cancel()
