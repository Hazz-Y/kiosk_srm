// VEats — Orders Page (dark theme)
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

interface Order {
    id: string;
    vendorName: string;
    items: string[];
    total: number;
    status: string;
    pickupCode: string;
    createdAt: string;
}

// Demo orders for display
const demoOrders: Order[] = [
    {
        id: 'ORD-1A2B3C',
        vendorName: 'AB3 Cafe 1',
        items: ['AB3 Special Biryani', 'French Fries'],
        total: 170,
        status: 'READY',
        pickupCode: 'X4K9M2',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    },
    {
        id: 'ORD-4D5E6F',
        vendorName: 'Gazebo',
        items: ['Classic Chicken Burger', 'Chicken Nuggets (6pc)'],
        total: 232,
        status: 'PREPARING',
        pickupCode: 'L7P3Q8',
        createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    },
    {
        id: 'ORD-7G8H9I',
        vendorName: 'North Square',
        items: ['Chili Garlic Shawarma', 'Red Sauce Pasta'],
        total: 210,
        status: 'COMPLETED',
        pickupCode: 'R2T5W9',
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    },
];

function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        PENDING: 'pending',
        CONFIRMED: 'confirmed',
        PREPARING: 'preparing',
        READY: 'ready',
        COMPLETED: 'completed',
        PAID: 'paid',
    };
    return colors[status] || 'pending';
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function OrdersPage() {
    const [orders] = useState<Order[]>(demoOrders);

    return (
        <div className="app-container">
            <Navbar />

            <div className="page-content" style={{ paddingTop: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Your Orders</h2>

                <div className="stagger">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: 700 }}>{order.vendorName}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{timeAgo(order.createdAt)}</div>
                                </div>
                                <span className={`status-badge ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                                {order.items.join(' • ')}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--divider)' }}>
                                <div style={{ fontWeight: 700 }}>₹{order.total}</div>
                                {order.status === 'READY' && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '6px 12px',
                                        background: 'rgba(58,183,87,0.1)',
                                        border: '1px solid rgba(58,183,87,0.3)',
                                        borderRadius: 'var(--radius-sm)',
                                    }}>
                                        <span style={{ fontSize: '14px' }}>📦</span>
                                        <div>
                                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Pickup Code</div>
                                            <div style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'monospace', color: 'var(--green)', letterSpacing: '2px' }}>
                                                {order.pickupCode}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
