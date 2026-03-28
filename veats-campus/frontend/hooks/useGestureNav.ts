import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export interface GestureState {
    guideVisible: boolean;
    lastGesture: string | null;
    fingerCount: number | null;
    connected: boolean;
}

export function useGestureNav(enabled: boolean): GestureState {
    const router = useRouter();
    const cursorIndexRef = useRef(-1);
    const elementsRef = useRef<HTMLElement[]>([]);
    const [guideVisible, setGuideVisible] = useState(false);
    const [lastGesture, setLastGesture] = useState<string | null>(null);
    const [fingerCount, setFingerCount] = useState<number | null>(null);
    const [connected, setConnected] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const gestureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setGuideVisible(false);
        if (enabled) {
            timerRef.current = setTimeout(() => {
                setGuideVisible(true);
            }, 8000);
        }
    }, [enabled]);

    const getFocusableElements = useCallback(() => {
        const selectors = [
            'button:not(.sign-preview-toggle):not(.sign-lang-toggle)',
            'a[href]',
            '.vendor-card',
            '.item-card',
            '.nav-item',
            '.category-pill',
            '.add-btn',
            '.qty-btn'
        ].join(', ');

        const els = Array.from(document.querySelectorAll(selectors)) as HTMLElement[];
        return els.filter(el => {
            const style = window.getComputedStyle(el);
            return el.offsetParent !== null &&
                   style.display !== 'none' &&
                   style.visibility !== 'hidden' &&
                   !(el as HTMLButtonElement).disabled;
        });
    }, []);

    const clearHighlights = useCallback(() => {
        elementsRef.current.forEach(el => {
            el.classList.remove('gesture-highlight');
            el.style.boxShadow = '';
            el.style.transform = '';
            el.style.border = '';
            el.style.zIndex = '';
        });
    }, []);

    const highlightCursor = useCallback(() => {
        clearHighlights();
        const el = elementsRef.current[cursorIndexRef.current];
        if (el) {
            el.classList.add('gesture-highlight');
            el.style.boxShadow = '0 0 0 3px var(--accent, #e94560), 0 0 20px rgba(233, 69, 96, 0.4)';
            el.style.transform = 'scale(1.04)';
            el.style.transition = 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.zIndex = '50';
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Pulse animation
            el.animate([
                { boxShadow: '0 0 0 3px var(--accent, #e94560), 0 0 20px rgba(233, 69, 96, 0.4)' },
                { boxShadow: '0 0 0 5px var(--accent, #e94560), 0 0 30px rgba(233, 69, 96, 0.6)' },
                { boxShadow: '0 0 0 3px var(--accent, #e94560), 0 0 20px rgba(233, 69, 96, 0.4)' },
            ], { duration: 600, easing: 'ease-in-out' });
        }
    }, [clearHighlights]);

    const handleGesture = useCallback((gesture: string, fingers?: number) => {
        elementsRef.current = getFocusableElements();
        if (elementsRef.current.length === 0) return;

        // Update gesture display state
        setLastGesture(gesture);
        setFingerCount(fingers ?? null);
        
        // Clear previous timeout & set new one (gesture label auto-hides after 1.5s)
        if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
        gestureTimeoutRef.current = setTimeout(() => {
            setLastGesture(null);
            setFingerCount(null);
        }, 1500);

        if (gesture === '1') {
            // 1 finger -> DOWN
            cursorIndexRef.current = (cursorIndexRef.current + 1) % elementsRef.current.length;
            highlightCursor();
        } else if (gesture === '2') {
            // 2 fingers -> UP
            cursorIndexRef.current = (cursorIndexRef.current - 1 + elementsRef.current.length) % elementsRef.current.length;
            highlightCursor();
        } else if (gesture === '3') {
            // 3 fingers -> RIGHT / NEXT
            cursorIndexRef.current = Math.min(cursorIndexRef.current + 3, elementsRef.current.length - 1);
            highlightCursor();
        } else if (gesture === '4') {
            // 4 fingers -> LEFT / PREV
            cursorIndexRef.current = Math.max(cursorIndexRef.current - 3, 0);
            highlightCursor();
        } else if (gesture === '5') {
            // 5 fingers -> SELECT
            const el = elementsRef.current[cursorIndexRef.current];
            if (el) {
                // Visual feedback: flash green
                el.animate([
                    { boxShadow: '0 0 0 3px #3ab757, 0 0 30px rgba(58, 183, 87, 0.5)', transform: 'scale(1.08)' },
                    { boxShadow: '0 0 0 0px #3ab757, 0 0 0px rgba(58, 183, 87, 0)', transform: 'scale(1)' },
                ], { duration: 400, easing: 'ease-out' });
                
                // Small delay so user sees feedback
                setTimeout(() => {
                    el.click();
                    // Re-scan after navigation
                    setTimeout(() => {
                        elementsRef.current = getFocusableElements();
                        cursorIndexRef.current = -1;
                        clearHighlights();
                    }, 600);
                }, 200);
            }
        } else if (/^[A-Z]$/.test(gesture)) {
            const letter = gesture.toUpperCase();
            const matchIndex = elementsRef.current.findIndex(el => {
                const text = el.textContent || '';
                return text.trim().toUpperCase().startsWith(letter);
            });
            if (matchIndex !== -1) {
                cursorIndexRef.current = matchIndex;
                highlightCursor();
            }
        }
    }, [getFocusableElements, highlightCursor, clearHighlights]);

    useEffect(() => {
        if (!enabled) {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
            setGuideVisible(false);
            setConnected(false);
            setLastGesture(null);
            setFingerCount(null);
            clearHighlights();
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
            if (reconnectRef.current) {
                clearTimeout(reconnectRef.current);
                reconnectRef.current = null;
            }
            return;
        }

        const connect = () => {
            if (socketRef.current?.readyState === WebSocket.OPEN) return;
            
            const socket = new WebSocket('ws://127.0.0.1:8765');
            socketRef.current = socket;

            socket.onopen = () => {
                console.log('✅ Gesture WebSocket connected');
                setConnected(true);
                resetTimer();
            };

            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.gesture) {
                        handleGesture(data.gesture, data.fingers);
                        resetTimer();
                    }
                } catch (e) {
                    console.error('Failed to parse gesture data:', e);
                }
            };

            socket.onclose = () => {
                setConnected(false);
                socketRef.current = null;
                // Reconnect after 2s
                reconnectRef.current = setTimeout(connect, 2000);
            };

            socket.onerror = () => {
                setConnected(false);
            };
        };

        connect();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
            if (timerRef.current) clearTimeout(timerRef.current);
            if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
            if (reconnectRef.current) clearTimeout(reconnectRef.current);
            clearHighlights();
        };
    }, [enabled, router.pathname, resetTimer, handleGesture, clearHighlights]);

    return { guideVisible, lastGesture, fingerCount, connected };
}
