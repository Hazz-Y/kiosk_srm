// VEats — Home Page (Zomato/Swiggy dark design with Lucide icons)
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { IconSearch, IconHeart } from '../components/Icons';
import { vendors, menuItems, categories, Vendor } from '../__mocks__/mockData';

// Local images for Gazebo and North Square (enhanced with CSS filters)
const LOCAL_IMAGES: Record<string, string> = {
    'gazebo': '/images/gazebo.png',
    'north-square': '/images/north_square.png',
};

function VendorCard({ vendor }: { vendor: Vendor }) {
    const src = LOCAL_IMAGES[vendor.id] || vendor.image;

    return (
        <Link href={`/vendor/${vendor.id}`} style={{ textDecoration: 'none' }}>
            <div className="vendor-card">
                <div className="image-wrapper">
                    <img
                        src={src}
                        alt={vendor.name}
                        loading="lazy"
                        style={{
                            // Enhanced CSS for North Square / Gazebo real images
                            filter: LOCAL_IMAGES[vendor.id]
                                ? 'brightness(0.88) saturate(1.25) contrast(1.08)'
                                : 'brightness(0.93) saturate(1.1)',
                        }}
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="image-overlay" />

                    {/* Tag chip */}
                    <span className="tag">
                        {vendor.cuisine.split('•')[0].trim()} · ₹{vendor.avgPrice}
                    </span>

                    {/* Bookmark button */}
                    <button className="bookmark" onClick={(e) => e.preventDefault()}>
                        <IconHeart size={13} />
                    </button>
                </div>

                <div className="card-body">
                    <h3>
                        {vendor.name}
                        <span className={`rating-badge${vendor.rating < 4.0 ? ' low' : ''}`}>
                            <span className="star">★</span> {vendor.rating}
                        </span>
                    </h3>
                    <div className="meta">
                        <span>⚡ {vendor.deliveryTime}</span>
                        <span>·</span>
                        <span>{vendor.location}</span>
                    </div>
                    {vendor.offers && (
                        <div className="offer">
                            <span>🏷️</span>
                            {vendor.offers}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default function HomePage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredVendors = useMemo(() => {
        let result = vendors;
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(v =>
                v.name.toLowerCase().includes(q) ||
                v.cuisine.toLowerCase().includes(q) ||
                v.location.toLowerCase().includes(q)
            );
        }
        if (activeCategory !== 'all') {
            const ids = new Set(
                menuItems.filter(i => i.category === activeCategory).map(i => i.vendorId)
            );
            result = result.filter(v => ids.has(v.id));
        }
        return result;
    }, [search, activeCategory]);

    return (
        <div className="app-container">
            <Navbar />

            <div className="page-content">
                {/* ── Search ── */}
                <div className="search-bar">
                    <span className="search-icon"><IconSearch /></span>
                    <input
                        type="text"
                        placeholder='Search cafes, dishes...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* ── Category Pills ── */}
                <div className="category-pills">
                    {categories.map((cat) => (
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

                {/* ── Section Header ── */}
                <div className="section-header">
                    <h2>{activeCategory === 'all' ? 'Campus Cafes' : categories.find(c => c.id === activeCategory)?.label}</h2>
                    <span className="count">{filteredVendors.length} outlets open</span>
                </div>

                {/* ── Vendor List ── */}
                <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {filteredVendors.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}
                </div>

                {filteredVendors.length === 0 && (
                    <div className="empty-state">
                        <div className="icon">🔍</div>
                        <h3>No cafes found</h3>
                        <p>Try a different search or category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
