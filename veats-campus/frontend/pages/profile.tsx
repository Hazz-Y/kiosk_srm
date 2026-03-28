// VEats — Profile Page
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';
import {
    IconUser, IconWallet, IconOrders, IconAddress, IconGift,
    IconHelpCircle, IconShield, IconLogOut, IconChevronRight,
    IconSun, IconMoon, IconPhone, IconMail, IconTrophy,
} from '../components/Icons';

export default function ProfilePage() {
    const { theme, toggleTheme, isDark } = useTheme();
    const { balance } = useWallet();
    const router = useRouter();

    const sections = [
        {
            title: 'Account',
            rows: [
                {
                    icon: <IconUser />, iconClass: '', label: 'Personal Info',
                    desc: 'Harsh Student', href: '/profile/edit',
                },
                {
                    icon: <IconPhone />, iconClass: '', label: 'Phone Number',
                    desc: '+91 98765 43210', href: '#',
                },
                {
                    icon: <IconMail />, iconClass: '', label: 'Email',
                    desc: 'harsh@orderatease.in', href: '#',
                },
            ],
        },
        {
            title: 'Wallet & Rewards',
            rows: [
                {
                    icon: <IconWallet />, iconClass: 'gold', label: 'VCoin Wallet',
                    desc: `${balance} VCoins = ₹${(balance / 100).toFixed(2)}`, href: '/wallet',
                },
                {
                    icon: <IconTrophy />, iconClass: 'gold', label: 'Rewards & Offers',
                    desc: 'Earn coins on every order', href: '/wallet',
                },
                {
                    icon: <IconGift />, iconClass: 'accent', label: 'Refer & Earn',
                    desc: 'Get 200 VCoins for each referral', href: '#',
                },
            ],
        },
        {
            title: 'Activity',
            rows: [
                {
                    icon: <IconOrders />, iconClass: 'green', label: 'Order History',
                    desc: 'View all past orders', href: '/orders',
                },
                {
                    icon: <IconAddress />, iconClass: '', label: 'Saved Addresses',
                    desc: 'VIT Chennai campus blocks', href: '#',
                },
            ],
        },
        {
            title: 'Support',
            rows: [
                {
                    icon: <IconHelpCircle />, iconClass: '', label: 'Help & Support',
                    desc: 'FAQs, report an issue', href: '#',
                },
                {
                    icon: <IconShield />, iconClass: '', label: 'Terms & Privacy',
                    desc: 'Legal info and policies', href: '#',
                },
            ],
        },
    ];

    return (
        <div className="app-container">
            <Navbar />
            <div className="page-content" style={{ paddingTop: '16px' }}>

                {/* ── Profile Hero ── */}
                <div className="glass-card animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{
                        width: 72, height: 72,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--accent), var(--orange))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 12px',
                        fontSize: '28px', fontWeight: 900, color: 'white',
                        boxShadow: 'var(--shadow-accent)',
                    }}>
                        H
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800 }}>Harsh Student</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>harsh@orderatease.in</div>

                    {/* SRM-Coin summary */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        justifyContent: 'center', marginTop: '14px',
                    }}>
                        <Link href="/wallet" style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '8px 18px',
                            background: 'var(--orange-soft)',
                            border: '1px solid var(--orange)',
                            borderRadius: 'var(--radius-pill)',
                            textDecoration: 'none',
                        }}>
                            <span style={{ fontSize: '16px' }}>🪙</span>
                            <span style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '15px' }}>{balance} VCoins</span>
                        </Link>
                    </div>
                </div>

                {/* ── Dark Mode Toggle ── */}
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '10px' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="profile-row-icon" style={{
                                width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                                background: 'var(--bg-elevated)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {isDark ? <IconMoon size={18} /> : <IconSun size={18} />}
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 600 }}>
                                    {isDark ? 'Dark Mode' : 'Light Mode'}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                                </div>
                            </div>
                        </div>
                        {/* Toggle switch */}
                        <div
                            onClick={toggleTheme}
                            style={{ cursor: 'pointer' }}
                            role="button"
                            aria-label="Toggle theme"
                        >
                            <div className={`toggle-track${isDark ? ' on' : ''}`}>
                                <div className="toggle-thumb" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Sections ── */}
                <div className="stagger">
                    {sections.map((section) => (
                        <div key={section.title} className="profile-section">
                            <div className="profile-section-title">{section.title}</div>
                            {section.rows.map((row) => (
                                <Link key={row.label} href={row.href} className="profile-row">
                                    <div className={`row-icon${row.iconClass ? ' ' + row.iconClass : ''}`}>
                                        {row.icon}
                                    </div>
                                    <div className="row-content">
                                        <div className="row-label">{row.label}</div>
                                        <div className="row-desc">{row.desc}</div>
                                    </div>
                                    <div className="row-chevron"><IconChevronRight /></div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>

                {/* ── Logout ── */}
                <button
                    onClick={() => router.push('/')}
                    style={{
                        width: '100%', padding: '13px',
                        background: 'transparent',
                        border: '1.5px solid var(--border)',
                        borderRadius: 'var(--radius)',
                        color: 'var(--accent)',
                        fontSize: '14px', fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '8px', marginTop: '8px',
                        transition: 'all 0.2s',
                    }}
                >
                    <IconLogOut size={16} />
                    Log Out
                </button>

                <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    VEats v1.0 · VIT Chennai Campus
                </div>
            </div>
        </div>
    );
}
