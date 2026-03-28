import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Vendor Panel — Manage orders and update status
 */
export default function VendorPanelPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // TODO: Get vendorId from auth context
    const vendorId = 'vendor-1';

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_URL}/api/vendors/${vendorId}/orders`);
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (e) {
            console.error('Failed to fetch vendor orders:', e);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, status: string) => {
        try {
            await fetch(`${API_URL}/api/vendors/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            fetchOrders();
        } catch (e) {
            console.error('Failed to update status:', e);
        }
    };

    const statusFlow = ['CONFIRMED', 'PREPARING', 'READY', 'COMPLETED'];

    return (
        <>
            <Head>
                <title>Vendor Panel — VEats</title>
            </Head>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">🏪 Vendor Panel</h1>
            <p className="text-gray-500 mb-6">Manage incoming orders and update status</p>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-24 rounded-xl" />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-6xl mb-4">📋</p>
                    <p className="text-gray-500">No orders yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((orderItem) => (
                        <div key={orderItem.id} className="bg-white rounded-xl shadow-sm border p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {orderItem.menuItem?.name} × {orderItem.quantity}
                                    </p>
                                    <p className="text-sm text-gray-400 font-mono">
                                        Order #{orderItem.order?.id?.slice(0, 8)}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {orderItem.order?.createdAt && new Date(orderItem.order.createdAt).toLocaleString('en-IN')}
                                    </p>
                                </div>
                                <span className={`status-badge status-${orderItem.order?.orderStatus?.toLowerCase()}`}>
                                    {orderItem.order?.orderStatus}
                                </span>
                            </div>

                            {orderItem.order?.pickupCode && (
                                <p className="text-sm text-gray-600 mb-3">
                                    Pickup Code: <span className="font-mono font-bold text-primary-600">{orderItem.order.pickupCode}</span>
                                </p>
                            )}

                            {/* Status action buttons */}
                            <div className="flex gap-2 flex-wrap">
                                {statusFlow.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => updateStatus(orderItem.order.id, status)}
                                        disabled={orderItem.order?.orderStatus === status || orderItem.order?.orderStatus === 'COMPLETED'}
                                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all
                      disabled:opacity-30 disabled:cursor-not-allowed
                      hover:bg-primary-50 hover:border-primary-400 hover:text-primary-700"
                                    >
                                        {status === 'CONFIRMED' && '✅'}
                                        {status === 'PREPARING' && '👨‍🍳'}
                                        {status === 'READY' && '🔔'}
                                        {status === 'COMPLETED' && '✔️'}
                                        {' '}{status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
