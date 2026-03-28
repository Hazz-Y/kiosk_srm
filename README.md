# Order@Ease 🍽️🤟

**Order@Ease** is a futuristic, touchless campus food ordering kiosk system designed for SRM University. It combines a premium Next.js frontend with an AI-powered hand gesture and sign language recognition backend. This allows students to smoothly navigate menus, add items to their cart, and checkout—all without touching the screen.

🔗 **Live Deployment**: [https://orderatease.vercel.app](https://orderatease.vercel.app)  
👥 **Contributors**: [Hazz-Y](https://github.com/Hazz-Y) & [SamriddhiGanguly05](https://github.com/SamriddhiGanguly05)

---

## 🚀 Features

- **Touchless Navigation**: Use hand gestures (1 to 5 fingers) to explore the UI, scroll, and select items.
- **Sign Language Integration**: Real-time sign language and gesture detection via a dedicated Python CV backend that streams data directly to the web app.
- **Live Camera Preview**: Mini floating MJPEG stream showing your gestures directly in the web UI.
- **Premium UI/UX**: Built with Next.js and styled for a modern, sleek, "dark-mode first" aesthetic inspired by leading food delivery apps.
- **Smart Cart & Wallet**: SRM-Coin ecosystem with simulated payments and an intuitive checkout flow.
- *(Coming Soon)* Backend services via NestJS + PostgreSQL + Prisma.

---

## 📁 Repository Structure

```
kiosk_srm/
├── cv_backend.py              # Gesture Detection Backend (OpenCV + MediaPipe)
├── gesture_controller.py      # Core Hand Tracking & Finger Count Logic
├── server.js                  # Razorpay & Legacy Frontend Server
├── veats-campus/              # Main App Directory
│   ├── frontend/              # Next.js UI (Runs on port 3001)
│   ├── backend/               # NestJS Database layer (WIP)
│   ├── mobile/                # Flutter mobile app stub
│   └── infra/                 # Docker Compose & Infra config
└── sparc_temp/                # ML Models & Utilities (Excluded from Git)
```

---

## 🛠️ How to Run

### 1. Start the Order@Ease Web UI
The frontend is built with Next.js and relies on standard React hooks to capture gesture navigation.
```bash
cd veats-campus/frontend
npm install
npm run dev -p 3001
# The UI will be available at http://localhost:3001
```

### 2. Start the AI Gesture Backend
The Computer Vision backend uses OpenCV and MediaPipe to detect finger counts and broadcast them via WebSockets, while simultaneously serving an MJPEG stream for the live preview.
```bash
# Return to the root directory
cd ../../
pip install -r sparc_temp/requirements.txt # Make sure dependencies are installed
python cv_backend.py
# The WebSocket server runs on ws://localhost:8765
# The MJPEG Stream runs on http://localhost:8766
```

### 3. Usage
- Go to `http://localhost:3001`.
- Click the **🤟 Toggle** in the bottom-right corner to activate Sign Language Mode.
- Use your hand:
  - **1 Finger (☝️)**: Move Cursor Down
  - **2 Fingers (✌️)**: Move Cursor Up
  - **3 Fingers (🤟)**: Move Cursor Right (Next)
  - **4 Fingers (🖖)**: Move Cursor Left (Prev)
  - **5 Fingers (🖐️)**: Select/Click Item

---

## 🔧 Technologies Used

- **Frontend**: Next.js, React, CSS Modules / Vanilla CSS
- **Backend (CV)**: Python, OpenCV, MediaPipe, Websockets, BaseHTTPServer
- **Backend (API)**: Node.js, Express, Razorpay
- **Design**: Premium Glassmorphism, Micro-animations

---

*Built for SRM Campus* ✨
