import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { WalletProvider } from '../contexts/WalletContext';
import { useGestureNav } from '../hooks/useGestureNav';
import SignLangPreview from '../components/SignLangPreview';

function AppContent({ Component, pageProps }: { Component: any, pageProps: any }) {
    const [signLang, setSignLang] = useState(false);
    const { guideVisible, lastGesture, fingerCount, connected } = useGestureNav(signLang);

    return (
        <>
            <Component {...pageProps} />

            {/* ── Camera Preview Window ── */}
            <SignLangPreview
                active={signLang}
                lastGesture={lastGesture}
                fingerCount={fingerCount}
            />


            {/* ── Sign Language Toggle FAB ── */}
            <button
                className={`sign-lang-toggle ${signLang ? 'active' : ''}`}
                onClick={() => setSignLang(!signLang)}
                title={signLang ? 'Disable Sign Language Mode' : 'Enable Sign Language Mode'}
            >
                <span className="sign-lang-toggle-icon">🤟</span>
                {signLang && connected && (
                    <span className="sign-lang-toggle-dot" />
                )}
            </button>

            {/* Sign Language Active Toast */}
            {signLang && (
                <div className="sign-lang-toast" key="sign-toast">
                    <span>🤟</span> Sign Language Mode Active
                </div>
            )}
        </>
    );
}

export default function VEatsApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <WalletProvider>
                <Head>
                    <title>Order@Ease — SRM Campus Food</title>
                    <meta name="description" content="Queue-free campus food ordering for SRM. Order from Gazebo, North Square, AB cafes & more." />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
                    <meta name="theme-color" content="#121212" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                    <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
                </Head>
                <AppContent Component={Component} pageProps={pageProps} />
            </WalletProvider>
        </ThemeProvider>
    );
}
