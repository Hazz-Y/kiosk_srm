import React from 'react';

export interface CartItemData {
    id: string;
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    vendorId: string;
    vendorName: string;
    isVeg: boolean;
    calories: number;
}

interface CartGroupProps {
    vendorName: string;
    items: CartItemData[];
    onUpdateQty: (menuItemId: string, qty: number) => void;
    onRemove: (menuItemId: string) => void;
}

export default function CartGroup({ vendorName, items, onUpdateQty, onRemove }: CartGroupProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4 animate-fade-in">
            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-primary-500">🏪</span> {vendorName}
            </h3>

            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.menuItemId} className="flex items-center justify-between py-2 border-b border-gray-50">
                        <div className="flex items-center gap-2 flex-1">
                            <span className={item.isVeg ? 'veg-icon' : 'nonveg-icon'} />
                            <div>
                                <p className="font-medium text-gray-700">{item.name}</p>
                                <p className="text-xs text-gray-400">🔥 {item.calories} cal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center border border-primary-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => onUpdateQty(item.menuItemId, item.quantity - 1)}
                                    className="px-2 py-1 text-primary-600 hover:bg-primary-50 transition-colors"
                                >
                                    −
                                </button>
                                <span className="px-3 py-1 font-semibold text-sm">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQty(item.menuItemId, item.quantity + 1)}
                                    className="px-2 py-1 text-primary-600 hover:bg-primary-50 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <span className="font-semibold text-gray-800 w-16 text-right">
                                ₹{item.price * item.quantity}
                            </span>
                            <button
                                onClick={() => onRemove(item.menuItemId)}
                                className="text-red-400 hover:text-red-600 transition-colors text-sm"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-500">Vendor Subtotal</span>
                <span className="font-bold text-gray-800">₹{subtotal}</span>
            </div>
        </div>
    );
}
