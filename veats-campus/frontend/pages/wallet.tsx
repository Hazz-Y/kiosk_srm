// Order@Ease — Wallet Page (SRM-Coin balance + transaction history)
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useWallet } from '../contexts/WalletContext';
import { IconBack } from '../components/Icons';
import { useRouter } from 'next/router';

const transactions = [
    { type: 'earn', icon: '🛍️', title: 'Order at AB3 Cafe 1', sub: 'Today, 12:45 PM', amount: +60 },
    { type: 'earn', icon: '😊', title: 'Welcome Bonus', sub: 'SRM student join bonus', amount: +120 },
    { type: 'spend', icon: '🧾', title: 'Redeemed at Gazebo', sub: 'Yesterday, 7:30 PM', amount: -50 },
    { type: 'earn', icon: '🛍️', title: 'Order at North Square', sub: '3 days ago', amount: +40 },
    { type: 'earn', icon: '🎁', title: 'Referral Bonus', sub: '5 days ago', amount: +200 },
    { type: 'spend', icon: '🧾', title: 'Redeemed at AB2 Cafe', sub: '1 week ago', amount: -80 },
];

export default function WalletPage() {
    const { balance } = useWallet();
    const router = useRouter();

    return (
        <div className="app-container">
            <Navbar />
            <Head>
                <title>SRM-Coin Wallet — Order@Ease</title>
            </Head>

            <div className="page-content" style={{ paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                     <button
                        onClick={() => router.back()}
                        style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: 'var(--bg-elevated)', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#fff',
                        }}
                    >
                        <IconBack size={16} />
                    </button>
                    <h1 className="page-title" style={{ marginBottom: 0 }}>SRM-Coin Wallet</h1>
                </div>

                <div className="vcoin-hero animate-bounce-in">
                    <div className="balance-label">Current Balance</div>
                    <div className="balance-amount">{balance.toLocaleString()}</div>
                    <div className="balance-equiv">≈ ₹{(balance / 100).toFixed(2)} · 100 SRM-Coin = ₹1</div>
                </div>

                <div className="glass-card animate-fade-in-up" style={{ animationDelay: '0.1s', marginTop: '16px' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 800 }}>
                        🪙 How to Earn SRM-Coins
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { emoji: '🛍️', text: 'Place an order — earn 5% back in SRM-Coins' },
                            { emoji: '🎁', text: 'Refer a friend — get 200 SRM-Coins' },
                            { emoji: '⭐', text: 'Rate your meal — earn 10 SRM-Coins' },
                            { emoji: '🔥', text: 'Order 3 days in a row — streak bonus 50 SRM-Coins' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                                <span style={{ fontSize: '18px' }}>{item.emoji}</span>
                                <span style={{ color: 'var(--text-muted)' }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 800 }}>Transaction History</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {transactions.map((tx, i) => (
                            <div key={i} className="glass-card animate-fade-in-up" style={{ 
                                animationDelay: `${0.2 + (i * 0.1)}s`,
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '16px',
                                padding: '12px 16px'
                            }}>
                                <div style={{ 
                                    fontSize: '24px', 
                                    width: '40px', 
                                    height: '40px', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    borderRadius: '12px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}>
                                    {tx.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '14px', fontWeight: 700 }}>{tx.title}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tx.sub}</div>
                                </div>
                                <div style={{ 
                                    fontSize: '14px', 
                                    fontWeight: 800, 
                                    color: tx.amount > 0 ? 'var(--green)' : 'var(--text-primary)' 
                                }}>
                                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    SRM-Coins are non-transferable · Cannot be converted to cash
                </div>
            </div>
        </div>
    );
}
