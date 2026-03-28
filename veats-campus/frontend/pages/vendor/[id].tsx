// VEats — Vendor Menu Page (dark theme, overlap fixed)
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import ItemCard from '../../components/ItemCard';
import { IconBack } from '../../components/Icons';
import { vendors, menuItems, categories, MenuItem } from '../../__mocks__/mockData';

const LOCAL_IMAGES: Record<string, string> = {
    'gazebo': '/images/gazebo.png',
    'north-square': '/images/north_square.png',
};

export default function VendorPage() {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const vendor = vendors.find(v => v.id === id);
    const vendorItems = menuItems.filter(i => i.vendorId === id);
    const [activeCategory, setActiveCategory] = useState('all');
    const [cartCount, setCartCount] = useState(0);

    const readCart = () => {
        const cart = JSON.parse(localStorage.getItem('oe_cart') || '[]');
        setCartCount(cart.reduce((s: number, i: any) => s + (i.quantity || 1), 0));
    };

    useEffect(() => {
        readCart();
    }, []);

    const vendorCategories = useMemo(() => {
        const cats = new Set(vendorItems.map(i => i.category));
        return categories.filter(c => c.id === 'all' || cats.has(c.id));
    }, [vendorItems]);

    const filteredItems = useMemo(() => {
        if (activeCategory === 'all') return vendorItems;
        return vendorItems.filter(i => i.category === activeCategory);
    }, [vendorItems, activeCategory]);

    const handleAddToCart = (item: MenuItem) => {
        const cart = JSON.parse(localStorage.getItem('oe_cart') || '[]');
        const existing = cart.find((c: any) => c.id === item.id);
        if (existing) existing.quantity += 1;
        else cart.push({ ...item, quantity: 1 });
        localStorage.setItem('oe_cart', JSON.stringify(cart));
        readCart();
    };

    if (!vendor) {
        return (
            <div className="app-container">
                <Navbar />
                <div className="empty-state">
                    <div className="icon">🏪</div>
                    <h3>Cafe not found</h3>
                    <p><Link href="/" style={{ color: 'var(--accent)' }}>← Back to Home</Link></p>
                </div>
            </div>
        );
    }

    const heroImg = LOCAL_IMAGES[vendor.id] || vendor.image;

    return (
        <div className="app-container">
            <Navbar />

            {/* ── Vendor Hero ── */}
            <div className="vendor-header">
                <img
                    src={heroImg}
                    alt={vendor.name}
                    style={{
                        filter: LOCAL_IMAGES[vendor.id]
                            ? 'brightness(0.82) saturate(1.2) contrast(1.06)'
                            : 'brightness(0.85) saturate(1.1)',
                    }}
                />
                <div className="header-overlay">
                    <button
                        onClick={() => router.back()}
                        style={{
                            background: 'rgba(0,0,0,0.45)',
                            border: 'none',
                            borderRadius: '50%',
                            width: 32, height: 32,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'white', marginBottom: '8px',
                        }}
                    >
                        <IconBack size={16} />
                    </button>
                    <h1>{vendor.name}</h1>
                    <div className="vendor-meta">
                        <span className={`rating-badge${vendor.rating < 4.0 ? ' low' : ''}`}>
                            <span className="star">★</span> {vendor.rating}
                        </span>
                        <span>{vendor.ratingCount} ratings</span>
                        <span>·</span>
                        <span>{vendor.location}</span>
                    </div>
                </div>
            </div>

            {/* ── Menu Content (padding-bottom handled by .page-content) ── */}
            <div className="vendor-menu-content" style={{ paddingBottom: 'calc(var(--nav-height) + 80px)' }}>
                {/* Category pills */}
                <div className="category-pills" style={{ marginBottom: '4px' }}>
                    {vendorCategories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-pill${activeCategory === cat.id ? ' active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span className="cat-emoji">{cat.emoji}</span>
                            <span className="label">{cat.label}</span>
                        </button>
                    ))}
                </div>

                <div className="section-header">
                    <h2>Menu</h2>
                    <span className="count">{filteredItems.length} items</span>
                </div>

                {/* 2-column grid */}
                <div
                    className="stagger"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
                >
                    {filteredItems.map(item => (
                        <ItemCard key={item.id} item={item} onAdd={handleAddToCart} />
                    ))}
                </div>
            </div>

            {/* Sticky Cart Bar Removed per user request */}
        </div>
    );
}
