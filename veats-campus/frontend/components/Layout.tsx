import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
            <footer className="bg-dark-900 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xl font-bold text-primary-400">🍽️ Order@Ease</p>
                    <p className="text-gray-400 mt-2 text-sm">
                        Campus Takeaway — Queue-Free Pickup
                    </p>
                    <p className="text-gray-500 text-xs mt-4">
                        © {new Date().getFullYear()} Order@Ease. Built for campus food ordering.
                    </p>
                </div>
            </footer>
        </div>
    );
}
