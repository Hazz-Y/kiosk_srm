// VEats — Checkout Page (dark theme)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import PickupModal from '../components/PickupModal';

export default function CheckoutPage() {
    const router = useRouter();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showPickup, setShowPickup] = useState(false);
    const [pickupCode, setPickupCode] = useState('');
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        const t = localStorage.getItem('oe_checkout_total');
        if (t) setTotal(parseInt(t, 10));
        else router.push('/cart');
    }, []);

    const handlePay = async () => {
        setLoading(true);

        try {
            // 1. Create Order on Backend
            const orderRes = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total * 100, currency: "INR" })
            });
            const orderData = await orderRes.json();

            if (!orderData || !orderData.id) throw new Error("Backend failed to generate order");

            // 2. Initialize Razorpay Checkout
            const options = {
                key: 'rzp_test_SWNJRxZV1t5lWd', // Public Test Key
                amount: orderData.amount, 
                currency: orderData.currency,
                name: "Order@Ease Kiosk",
                description: "Campus Food Checkout",
                order_id: orderData.id,
                image: "/images/logo_2.png",
                handler: async function (response: any) {
                    setLoading(true);
                    
                    // 3. Verify Payment
                    const verifyRes = await fetch('/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });
                    const verifyData = await verifyRes.json();

                    if (verifyData.status === 'ok') {
                        // Success -> Generate Pickup Code
                        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
                        const id = 'ORD-' + Date.now().toString(36).toUpperCase();
                        setPickupCode(code);
                        setOrderId(id);
                        setShowPickup(true);
                        
                        localStorage.removeItem('oe_cart');
                        localStorage.removeItem('oe_checkout_total');
                    } else {
                        alert("Verification Failed");
                    }
                    setLoading(false);
                },
                prefill: {
                    name: "SRM Student",
                    email: "student@srmist.edu.in",
                    contact: "9999999999"
                },
                theme: { color: "#e94560" },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                alert("Payment Failed - " + response.error.description);
                setLoading(false);
            });
            rzp.open();
            
        } catch (error) {
            console.error(error);
            alert("Error initiating payment.");
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <Navbar />

            <div className="page-content" style={{ paddingTop: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>Checkout</h2>

                {/* Payment Summary */}
                <div className="glass-card animate-fade-in-up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '24px' }}>💳</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '15px' }}>Payment</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PhonePe • UPI • Cards</div>
                        </div>
                    </div>

                    <div className="bill-summary" style={{ background: 'var(--bg-elevated)', marginTop: '0' }}>
                        <div className="bill-row total" style={{ border: 'none', paddingTop: '0', marginTop: '0' }}>
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                </div>

                {/* Pickup Info */}
                <div className="glass-card animate-fade-in-up" style={{ marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>📦</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '15px' }}>Pickup from Counter</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Show QR code at the cafe counter to collect</div>
                        </div>
                    </div>
                </div>

                {/* Pay Button */}
                <button
                    className="checkout-btn"
                    style={{ marginTop: '24px', position: 'relative' }}
                    onClick={handlePay}
                    disabled={loading}
                >
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                            Processing...
                        </span>
                    ) : (
                        `Pay ₹${total}`
                    )}
                </button>

                {/* Secure payment note */}
                <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    🔒 Secured by Razorpay Sandbox
                </div>
            </div>

            {/* Pickup Modal */}
            {showPickup && (
                <PickupModal
                    orderId={orderId}
                    pickupCode={pickupCode}
                    onClose={() => router.push('/orders')}
                />
            )}
        </div>
    );
}
