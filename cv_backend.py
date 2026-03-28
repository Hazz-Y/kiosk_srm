import sys
import os
import cv2
import json
import asyncio
import websockets
import time
import threading
import base64
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

# Add the cloned SPARC repo to Python path
SPARC_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sparc_temp')
sys.path.append(SPARC_PATH)

# ── Gesture Detection Imports ──
try:
    from gesture_controller import GestureController
except ImportError as e:
    print(f"[Error] Failed to import GestureController: {e}")
    sys.exit(1)

# ── Shared State ──
latest_frame = None
frame_lock = threading.Lock()
detector = GestureController()

# ── MJPEG HTTP Stream Server (port 8766) ──
class MJPEGHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/stream':
            self.send_response(200)
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=frame')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.end_headers()
            try:
                while True:
                    with frame_lock:
                        frame = latest_frame
                    if frame is not None:
                        _, jpeg = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 65])
                        data = jpeg.tobytes()
                        self.wfile.write(b'--frame\r\n')
                        self.wfile.write(b'Content-Type: image/jpeg\r\n')
                        self.wfile.write(f'Content-Length: {len(data)}\r\n'.encode())
                        self.wfile.write(b'\r\n')
                        self.wfile.write(data)
                        self.wfile.write(b'\r\n')
                    time.sleep(0.05)  # ~20fps for stream
            except (BrokenPipeError, ConnectionResetError):
                pass
        elif self.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok'}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress HTTP logs

def start_mjpeg_server():
    server = ThreadingHTTPServer(('0.0.0.0', 8766), MJPEGHandler)
    print("📷 MJPEG Stream available at http://localhost:8766/stream")
    server.serve_forever()

# ── WebSocket Gesture Server (port 8765) ──
async def gesture_server(websocket, path):
    global latest_frame
    print("🤟 UI Client Connected.")
    
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    cap.set(cv2.CAP_PROP_FPS, 30)
    
    last_command_time = 0
    cooldown = 0.6  # Faster response  
    gesture_history = []
    stability_threshold = 5  # Reduced from 10 for snappier feel
    
    try:
        while True:
            success, img = cap.read()
            if not success:
                await asyncio.sleep(0.05)
                continue
            
            img = cv2.flip(img, 1)  # Mirror
            
            # Run hand detection
            img_annotated = detector.find_hands(img.copy())
            lm_list = detector.find_position(img_annotated)
            
            gesture_label = None
            finger_count = 0
            
            if len(lm_list) != 0:
                count = detector.get_finger_count()
                command = detector.get_command(count)
                finger_count = count or 0
                
                if command:
                    gesture_label = command
                    gesture_history.append(str(count))
                else:
                    gesture_history.append(None)
                    
                if len(gesture_history) > stability_threshold + 2:
                    gesture_history.pop(0)
                    
                # Check stability — last N frames must agree
                recent = gesture_history[-stability_threshold:]
                if (len(recent) >= stability_threshold and 
                    all(x is not None and x == recent[0] for x in recent)):
                    
                    stable_gesture = recent[0]
                    current_time = time.time()
                    
                    if current_time - last_command_time > cooldown:
                        payload = {
                            'gesture': stable_gesture,
                            'label': gesture_label,
                            'confidence': 1.0,
                            'fingers': finger_count
                        }
                        await websocket.send(json.dumps(payload))
                        print(f"  ► Sent gesture: {stable_gesture} ({gesture_label})")
                        last_command_time = current_time
                        gesture_history.clear()
            else:
                gesture_history.append(None)
                if len(gesture_history) > stability_threshold + 2:
                    gesture_history.pop(0)
            
            # Draw overlay on annotated frame for the preview
            if gesture_label:
                cv2.putText(img_annotated, f"{finger_count} - {gesture_label}", 
                           (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 100), 2)
            
            # Update shared frame for MJPEG stream
            with frame_lock:
                latest_frame = img_annotated
                
            await asyncio.sleep(0.025)  # ~40fps processing
            
    except websockets.exceptions.ConnectionClosed:
        print("UI Client Disconnected.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cap.release()

async def main():
    # Start MJPEG server in background thread
    mjpeg_thread = threading.Thread(target=start_mjpeg_server, daemon=True)
    mjpeg_thread.start()
    
    print("🤟 WebSocket Server on ws://localhost:8765")
    async with websockets.serve(gesture_server, "localhost", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
