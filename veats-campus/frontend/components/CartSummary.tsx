import React, { useState } from 'react';
import { CartItemData } from './CartGroup';

interface CartSummaryProps {
    items: CartItemData[];
    onCheckout: (promoCode: string, promoDiscount: number) => void;
}

export default function CartSummary({ items, onCheckout }: CartSummaryProps) {
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoDiscount, setPromoDiscount] = useState(0);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalCalories = items.reduce((sum, item) => sum + item.calories * item.quantity, 0);
    const total = Math.max(0, subtotal - promoDiscount);
    const vendorCount = new Set(items.map((i) => i.vendorId)).size;

    const handleApplyPromo = () => {
        // Stub: Accept any promo code and give ₹50 off
        if (promoCode.trim()) {
            setPromoDiscount(50);
            setPromoApplied(true);
        }
    };

    return (
        <div className="glass-card rounded-xl p-6 sticky top-24" data-testid="cart-summary">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Order Summary</h3>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Items ({items.length})</span>
                    <span>from {vendorCount} vendor{vendorCount > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Total Calories</span>
                    <span>🔥 {totalCalories} cal</span>
                </div>

                {promoApplied && (
                    <div className="flex justify-between text-green-600">
                        <span>Promo ({promoCode})</span>
                        <span>- ₹{promoDiscount}</span>
                    </div>
                )}
            </div>

            {/* Promo Code */}
            {!promoApplied && (
                <div className="mt-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-400 focus:outline-none"
                    />
                    <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                        Apply
                    </button>
                </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-primary-600" data-testid="cart-total">
                    ₹{total}
                </span>
            </div>

            {/* Checkout Button */}
            <button
                onClick={() => onCheckout(promoCode, promoDiscount)}
                disabled={items.length === 0}
                className="w-full mt-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
                Proceed to Checkout →
            </button>
        </div>
    );
}
