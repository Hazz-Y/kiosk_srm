// VEats — Pickup Modal (dark theme)
interface PickupModalProps {
    orderId: string;
    pickupCode: string;
    onClose: () => void;
}

export default function PickupModal({ orderId, pickupCode, onClose }: PickupModalProps) {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
        }}>
            <div className="animate-bounce-in" style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius)',
                padding: '32px 24px',
                width: '90%',
                maxWidth: '360px',
                textAlign: 'center',
            }}>
                {/* Success icon */}
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--green), #4caf50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '28px',
                }}>
                    ✓
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Order Placed!</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Show this code at the pickup counter
                </p>

                {/* Pickup Code */}
                <div style={{
                    background: 'var(--bg-elevated)',
                    border: '2px dashed var(--green)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '20px',
                    marginBottom: '16px',
                }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                        Pickup Code
                    </div>
                    <div style={{
                        fontSize: '32px',
                        fontWeight: 900,
                        fontFamily: 'monospace',
                        letterSpacing: '6px',
                        color: 'var(--green)',
                    }}>
                        {pickupCode}
                    </div>
                </div>

                {/* QR placeholder */}
                <div style={{
                    width: '120px',
                    height: '120px',
                    background: 'white',
                    borderRadius: '8px',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                }}>
                    {/* QR code content: orderId|pickupCode */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gridTemplateRows: 'repeat(5, 1fr)',
                        gap: '2px',
                    }}>
                        {Array.from({ length: 25 }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    background: Math.random() > 0.4 ? '#000' : '#fff',
                                    borderRadius: '1px',
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Order ID: {orderId}
                </div>

                <button
                    onClick={onClose}
                    style={{
                        width: '100%',
                        padding: '14px',
                        background: 'var(--accent)',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                    }}
                >
                    Track Order →
                </button>
            </div>
        </div>
    );
}
