// SignLangPreview — Small floating camera preview for sign language mode
import { useState, useEffect, useRef } from 'react';

interface SignLangPreviewProps {
    active: boolean;
    lastGesture: string | null;
    fingerCount: number | null;
}

export default function SignLangPreview({ active, lastGesture, fingerCount }: SignLangPreviewProps) {
    const [minimized, setMinimized] = useState(false);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const checkRef = useRef<NodeJS.Timeout | null>(null);

    // Check if MJPEG stream is alive
    useEffect(() => {
        if (!active) {
            setConnected(false);
            setError(false);
            return;
        }

        const check = async () => {
            try {
                const res = await fetch('http://localhost:8766/health', { signal: AbortSignal.timeout(2000) });
                if (res.ok) {
                    setConnected(true);
                    setError(false);
                } else {
                    setConnected(false);
                    setError(true);
                }
            } catch {
                setConnected(false);
                setError(true);
            }
        };

        check();
        checkRef.current = setInterval(check, 5000);
        return () => {
            if (checkRef.current) clearInterval(checkRef.current);
        };
    }, [active]);

    if (!active) return null;

    const gestureEmoji: Record<string, string> = {
        '1': '☝️', '2': '✌️', '3': '🤟', '4': '🖖', '5': '🖐️'
    };

    const gestureLabel: Record<string, string> = {
        '1': 'DOWN', '2': 'UP', '3': 'RIGHT', '4': 'LEFT', '5': 'SELECT'
    };

    return (
        <div className={`sign-preview-container ${minimized ? 'minimized' : ''}`}>
            {/* Header Bar */}
            <div className="sign-preview-header">
                <div className="sign-preview-status">
                    <span className={`status-dot ${connected ? 'live' : 'off'}`} />
                    <span className="status-text">{connected ? 'LIVE' : 'CONNECTING...'}</span>
                </div>
                <button
                    className="sign-preview-toggle"
                    onClick={() => setMinimized(!minimized)}
                    title={minimized ? 'Expand' : 'Minimize'}
                >
                    {minimized ? '⬆' : '⬇'}
                </button>
            </div>

            {/* Camera Feed */}
            {!minimized && (
                <div className="sign-preview-feed">
                    {connected ? (
                        <img
                            ref={imgRef}
                            src="http://localhost:8766/stream"
                            alt="Camera feed"
                            className="sign-preview-video"
                        />
                    ) : (
                        <div className="sign-preview-placeholder">
                            <div className="sign-preview-spinner" />
                            <span>{error ? 'Start cv_backend.py' : 'Connecting...'}</span>
                        </div>
                    )}

                    {/* Gesture Feedback Overlay */}
                    {lastGesture && (
                        <div className="sign-preview-gesture-overlay" key={lastGesture + Date.now()}>
                            <span className="gesture-emoji">
                                {gestureEmoji[lastGesture] || '✋'}
                            </span>
                            <span className="gesture-action">
                                {gestureLabel[lastGesture] || lastGesture}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Mini Gesture indicator when minimized */}
            {minimized && lastGesture && (
                <div className="sign-preview-mini-gesture">
                    {gestureEmoji[lastGesture] || '✋'} {gestureLabel[lastGesture] || lastGesture}
                </div>
            )}
        </div>
    );
}
