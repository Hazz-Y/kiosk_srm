// VEats — Item Detail Page (dark theme, overlap fixed)
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { IconBack } from '../../components/Icons';
import { menuItems, vendors } from '../../__mocks__/mockData';

export default function ItemDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const item = menuItems.find(i => i.id === id);
    const vendor = item ? vendors.find(v => v.id === item.vendorId) : null;
    const [qty, setQty] = useState(1);

    if (!item) {
        return (
            <div className="app-container">
                <Navbar />
                <div className="empty-state" style={{ paddingTop: '60px' }}>
                    <div className="icon">🍽️</div>
                    <h3>Item not found</h3>
                    <p><Link href="/" style={{ color: 'var(--accent)' }}>← Browse Cafes</Link></p>
                </div>
            </div>
        );
    }

    const handleAdd = () => {
        const cart = JSON.parse(localStorage.getItem('veats_cart') || '[]');
        const existing = cart.find((c: any) => c.id === item.id);
        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({ ...item, quantity: qty });
        }
        localStorage.setItem('veats_cart', JSON.stringify(cart));
        router.push(`/vendor/${item.vendorId}`);
    };

    return (
        <div className="app-container">
            <Navbar />

            {/* ── Hero Image ── */}
            <div className="item-hero">
                <img
                    src={item.image}
                    alt={item.name}
                    style={{ filter: 'brightness(0.9) saturate(1.15)' }}
                />
                <button className="back-btn" onClick={() => router.back()}>
                    <IconBack />
                </button>
            </div>

            {/* ── Detail Body ── */}
            <div className="item-detail-body animate-fade-in-up">
                {/* Veg/NonVeg + Bestseller */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div className={`veg-indicator${item.isVeg ? ' veg' : ' nonveg'}`}>
                        <div className="dot" />
                    </div>
                    {item.isBestseller && (
                        <span style={{
                            fontSize: '10px',
                            background: 'linear-gradient(135deg, #e23744, #ff6b6b)',
                            color: 'white',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.6px',
                        }}>
                            ★ Bestseller
                        </span>
                    )}
                </div>

                <h1 style={{ fontSize: '21px', fontWeight: 800, marginBottom: '4px' }}>{item.name}</h1>

                {vendor && (
                    <div className="vendor-link" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Link href={`/vendor/${vendor.id}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>
                            {vendor.name}
                        </Link>
                        <span>·</span>
                        <span className={`rating-badge${vendor.rating < 4.0 ? ' low' : ''}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                            <span className="star">★</span> {vendor.rating}
                        </span>
                    </div>
                )}

                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '18px' }}>
                    {item.description}
                </p>

                {/* ── Nutrition Bar ── */}
                <div className="nutrition-bar">
                    <div className="title">Nutritional Information *</div>
                    <div className="macros">
                        <div className="macro-item cal">
                            <div className="val">{item.calories}</div>
                            <div className="unit">kcal</div>
                        </div>
                        <div className="macro-item protein">
                            <div className="val">{item.proteinG}g</div>
                            <div className="unit">protein</div>
                        </div>
                        <div className="macro-item carbs">
                            <div className="val">{item.carbsG}g</div>
                            <div className="unit">carbs</div>
                        </div>
                        <div className="macro-item fat">
                            <div className="val">{item.fatG}g</div>
                            <div className="unit">fat</div>
                        </div>
                    </div>
                </div>

                {/* High-protein badge */}
                {item.proteinG >= 20 && (
                    <div className="glass-card" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>💪</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--green)' }}>High Protein</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.proteinG}g protein per serving</div>
                        </div>
                    </div>
                )}

                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    * Approximate values. May vary.
                </div>
            </div>

            {/* ── Add to Cart Bar (above bottom nav via CSS) ── */}
            <div className="add-item-bar">
                <div className="qty-controls">
                    <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                    <span className="qty-value">{qty}</span>
                    <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button className="add-item-btn" onClick={handleAdd}>
                    Add item · ₹{item.price * qty}
                </button>
            </div>
        </div>
    );
}
