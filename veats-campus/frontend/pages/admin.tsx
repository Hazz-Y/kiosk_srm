import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Admin Panel — Platform overview, settlements, and analytics
 */
export default function AdminPage() {
    const [settlements, setSettlements] = useState<any[]>([]);
    const [topItems, setTopItems] = useState<any[]>([]);
    const [runResult, setRunResult] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [settRes, topRes] = await Promise.all([
                fetch(`${API_URL}/api/settlements`),
                fetch(`${API_URL}/api/menu/top-selling?days=7`),
            ]);
            if (settRes.ok) setSettlements(await settRes.json());
            if (topRes.ok) setTopItems(await topRes.json());
        } catch (e) {
            console.error('Failed to fetch admin data:', e);
        }
    };

    const handleRunSettlement = async () => {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        try {
            const res = await fetch(`${API_URL}/api/settlements/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    periodStart: weekAgo.toISOString().split('T')[0],
                    periodEnd: today.toISOString().split('T')[0],
                }),
            });
            const data = await res.json();
            setRunResult(`Created ${data.settlementsCreated} settlements`);
            fetchData();
        } catch (e) {
            setRunResult('Failed to run settlements');
        }
    };

    return (
        <>
            <Head>
                <title>Admin Panel — VEats</title>
            </Head>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">🛡️ Admin Panel</h1>
            <p className="text-gray-500 mb-6">Platform management dashboard</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Settlements */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">💰 Settlements</h2>
                        <button
                            onClick={handleRunSettlement}
                            className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors"
                        >
                            Run Settlement
                        </button>
                    </div>

                    {runResult && (
                        <p className="text-sm text-green-600 mb-3">✅ {runResult}</p>
                    )}

                    {settlements.length === 0 ? (
                        <p className="text-gray-400 text-sm">No settlements yet. Run one to get started.</p>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {settlements.map((s: any) => (
                                <div key={s.id} className="border-b border-gray-100 pb-3">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">{s.vendor?.name}</span>
                                        <span className={`status-badge ${s.payoutStatus === 'COMPLETED' ? 'status-completed' : 'status-pending'}`}>
                                            {s.payoutStatus}
                                        </span>
                                    </div>
                                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                                        <span>Sales: ₹{s.totalSales}</span>
                                        <span>Commission: ₹{s.commission}</span>
                                        <span className="font-semibold text-gray-700">Payout: ₹{s.payoutAmount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Top Selling Items */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Top Selling (7 days)</h2>
                    {topItems.length === 0 ? (
                        <p className="text-gray-400 text-sm">No sales data yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {topItems.map((item: any, idx: number) => (
                                <div key={item.id || idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-bold text-gray-300">#{idx + 1}</span>
                                        <div>
                                            <p className="font-medium text-gray-700">{item.name}</p>
                                            <p className="text-xs text-gray-400">{item.vendor?.name}</p>
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-primary-600">{item.totalSold} sold</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
