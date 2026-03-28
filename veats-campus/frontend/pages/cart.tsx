// VEats — Cart Page (dark theme, bottom nav overlap fixed)
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { vendors } from '../__mocks__/mockData';
import { useWallet } from '../contexts/WalletContext';

interface CartItem {
    id: string;
    vendorId: string;
    vendorName: string;
    name: string;
    image: string;
    price: number;
    isVeg: boolean;
    quantity: number;
}

export default function CartPage() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [promo, setPromo] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const { balance } = useWallet();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('oe_cart') || '[]'));
    }, []);

    const saveCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('oe_cart', JSON.stringify(newCart));
    };

    const updateQty = (id: string, delta: number) => {
        const newCart = cart.map(item => {
            if (item.id === id) {
                const qty = item.quantity + delta;
                return qty <= 0 ? null : { ...item, quantity: qty };
            }
            return item;
        }).filter(Boolean) as CartItem[];
        saveCart(newCart);
    };

    const grouped = useMemo(() => {
        const g: Record<string, CartItem[]> = {};
        cart.forEach(item => {
            if (!g[item.vendorId]) g[item.vendorId] = [];
            g[item.vendorId].push(item);
        });
        return g;
    }, [cart]);

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const discount = promoApplied ? Math.min(subtotal * 0.1, 50) : 0;
    const platformFee = 2;
    const total = subtotal - discount + platformFee;

    if (cart.length === 0) {
        return (
            <div className="app-container">
                <Navbar />
                {/* ── Empty cart: page-content handles bottom padding ── */}
                <div className="page-content" style={{ paddingTop: '60px', textAlign: 'center' }}>
                    <div className="empty-state">
                        <div className="icon">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Add items from your favourite campus cafes</p>
                        <Link
                            href="/"
                            style={{
                                display: 'inline-block', marginTop: '16px',
                                padding: '12px 28px',
                                background: 'var(--accent)', color: 'white',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 700, fontSize: '14px',
                                boxShadow: 'var(--shadow-accent)',
                            }}
                        >
                            Browse Cafes
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Navbar />

            {/*
        KEY FIX: page-content has padding-bottom that accounts for:
        - bottom nav height (var(--nav-height) = 64px)
        - checkout button height (~60px)
        - extra breathing room (20px)
        Total ≈ 144px bottom padding
      */}
            <div className="page-content" style={{ paddingTop: '14px' }}>
                <h2 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '14px' }}>
                    Your Cart
                </h2>

                {/* ── Vendor Groups ── */}
                {Object.entries(grouped).map(([vendorId, items]) => {
                    const vendor = vendors.find(v => v.id === vendorId);
                    return (
                        <div key={vendorId} className="cart-vendor-group animate-fade-in-up">
                            <div className="group-header">
                                <span style={{ fontSize: '20px' }}>🏪</span>
                                <h3>{vendor?.name || items[0].vendorName}</h3>
                                {vendor && (
                                    <span className={`rating-badge${vendor.rating < 4.0 ? ' low' : ''}`} style={{ marginLeft: 'auto', fontSize: '10px', padding: '2px 6px' }}>
                                        ★ {vendor.rating}
                                    </span>
                                )}
                            </div>

                            {items.map(item => (
                                <div key={item.id} className="cart-item">
                                    {/* Veg indicator */}
                                    <div className={`veg-indicator${item.isVeg ? ' veg' : ' nonveg'}`}>
                                        <div className="dot" />
                                    </div>

                                    <div className="item-info">
                                        <div className="name">{item.name}</div>
                                        <div className="price">₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</div>
                                    </div>

                                    <div className="cart-item-qty">
                                        <button onClick={() => updateQty(item.id, -1)}>−</button>
                                        <span className="val">{item.quantity}</span>
                                        <button onClick={() => updateQty(item.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}

                {/* ── Promo Code ── */}
                <div className="glass-card" style={{ marginTop: '10px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '2px' }}>🏷️ Promo Code</div>
                    <div className="promo-input">
                        <input
                            placeholder="OE10"
                            value={promo}
                            onChange={(e) => setPromo(e.target.value.toUpperCase())}
                        />
                        <button onClick={() => { if (promo === 'OE10') setPromoApplied(true); }}>
                            Apply
                        </button>
                    </div>
                    {promoApplied ? (
                        <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}>
                            ✓ OE10 applied — 10% off (max ₹50 saved)
                        </div>
                    ) : (
                        <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                            Try: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>OE10</span>
                        </div>
                    )}
                </div>

                {/* ── VCoin info ── */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 14px',
                    background: 'var(--orange-soft)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255,193,7,0.2)',
                    marginTop: '10px',
                    fontSize: '12px',
                }}>
                    <span style={{ fontSize: '16px' }}>🪙</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        You have <strong style={{ color: 'var(--gold)' }}>{balance} VCoins</strong> — earn more by placing orders
                    </span>
                </div>

                {/* ── Bill Summary ── */}
                <div className="bill-summary">
                    <h3>Bill Details</h3>
                    <div className="bill-row">
                        <span className="label">Item Total</span>
                        <span className="value">₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                        <div className="bill-row">
                            <span className="label" style={{ color: 'var(--green)' }}>Promo Discount</span>
                            <span className="value" style={{ color: 'var(--green)' }}>− ₹{discount}</span>
                        </div>
                    )}
                    <div className="bill-row">
                        <span className="label">Platform Fee</span>
                        <span className="value">₹{platformFee}</span>
                    </div>
                    <div className="bill-row total">
                        <span>TO PAY</span>
                        <span>₹{total}</span>
                    </div>
                </div>

                {/* 
          Checkout button — inside scrollable area so it's always accessible.
          The page-content bottom padding ensures this never hides behind the bottom nav.
        */}
                <button
                    className="checkout-btn"
                    onClick={() => {
                        localStorage.setItem('oe_checkout_total', String(total));
                        router.push('/checkout');
                    }}
                >
                    Proceed to Checkout · ₹{total}
                </button>
            </div>
        </div>
    );
}
