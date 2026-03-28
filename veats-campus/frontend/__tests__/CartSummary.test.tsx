import React from 'react';
import { render, screen } from '@testing-library/react';
import CartSummary from '../components/CartSummary';

describe('CartSummary', () => {
    const mockItems = [
        {
            id: '1', menuItemId: 'item-1', name: 'Paneer Sandwich',
            price: 80, quantity: 2, vendorId: 'v1', vendorName: 'Café Central',
            isVeg: true, calories: 320,
        },
        {
            id: '2', menuItemId: 'item-2', name: 'Cold Coffee',
            price: 60, quantity: 1, vendorId: 'v1', vendorName: 'Café Central',
            isVeg: true, calories: 180,
        },
    ];

    it('renders total amount correctly', () => {
        render(<CartSummary items={mockItems} onCheckout={jest.fn()} />);
        // 80*2 + 60*1 = 220
        expect(screen.getByTestId('cart-total')).toHaveTextContent('₹220');
    });

    it('shows vendor count', () => {
        render(<CartSummary items={mockItems} onCheckout={jest.fn()} />);
        expect(screen.getByText(/1 vendor/)).toBeInTheDocument();
    });

    it('renders promo code input', () => {
        render(<CartSummary items={mockItems} onCheckout={jest.fn()} />);
        expect(screen.getByPlaceholderText('Promo code')).toBeInTheDocument();
    });
});
