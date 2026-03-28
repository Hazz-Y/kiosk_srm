import cv2
import pyttsx3
import time
import asyncio
import websockets
import json
import threading
from gesture_controller import GestureController

# Initialize TTS
engine = pyttsx3.init()
engine.setProperty('rate', 150)
engine.setProperty('volume', 0.9)

# Global queue for voice feedback to avoid blocking the detection loop
voice_queue = []

def speak_worker():
    while True:
        if voice_queue:
            text = voice_queue.pop(0)
            engine.say(text)
            engine.runAndWait()
        time.sleep(0.1)

# Start voice worker thread
threading.Thread(target=speak_worker, daemon=True).start()

def announce(text):
    print(f"Announcement: {text}")
    voice_queue.append(text)

async def gesture_server(websocket, path):
    announce("Sign Language Mode Activated")
    
    detector = GestureController()
    cap = cv2.VideoCapture(0)
    
    last_command_time = 0
    debounce_delay = 1.0 # Stability: 1 second delay
    
    # Store previous commands for stability check (voting system)
    gesture_history = []
    
    try:
        while True:
            success, img = cap.read()
            if not success:
                break
            
            img = cv2.flip(img, 1) # Mirror flip
            img = detector.find_hands(img)
            lm_list = detector.find_position(img)
            
            gesture_label = "None"
            if len(lm_list) != 0:
                count = detector.get_finger_count()
                command = detector.get_command(count)
                
                if command:
                    gesture_label = command
                    gesture_history.append(command)
                
                # Simple stability check: last 5 frames must be the same command
                if len(gesture_history) > 10:
                    gesture_history.pop(0)
                
                if len(gesture_history) >= 10 and all(x == gesture_history[0] for x in gesture_history):
                    stable_command = gesture_history[0]
                    current_time = time.time()
                    
                    if current_time - last_command_time > debounce_delay:
                        # Map internal labels to Next.js gesture labels if necessary
                        # Next.js uses '1', '2', '3', '4' as gestures based on my useGestureNav hook
                        # My mapping: 1 finger (DOWN), 2 (UP), 3 (RIGHT), 4 (LEFT), 5 (SELECT)
                        
                        mapping = {
                            "DOWN": "1",
                            "UP": "2",
                            "RIGHT": "3",
                            "LEFT": "4",
                            "SELECT": "3" # Wait, SELECT was 5 fingers in user prompt
                        }
                        
                        # Wait, the user mapping was:
                        # 1 finger → DOWN
                        # 2 fingers → UP
                        # 3 fingers → RIGHT
                        # 4 fingers → LEFT
                        # 5 fingers → SELECT
                        
                        payload = {"gesture": str(count)}
                        
                        if count == 5:
                           announce("Item Selected")
                        else:
                           announce(f"Moved {stable_command}")
                           
                        await websocket.send(json.dumps(payload))
                        last_command_time = current_time
                        gesture_history = [] # Reset after trigger
            
            # Draw UI feedback
            cv2.putText(img, f"Gesture: {gesture_label}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
            cv2.imshow("Sign Language System - Order@Ease", img)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
                
            await asyncio.sleep(0.01) # Yield to event loop
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cap.release()
        cv2.destroyAllWindows()

async def main():
    print("Sign Language Controller listening on ws://localhost:8765")
    async with websockets.serve(gesture_server, "localhost", 8765):
        await asyncio.Future() # run forever

if __name__ == "__main__":
    asyncio.run(main())
