import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemCard from '../components/ItemCard';

const mockItem = {
    id: 'item-1',
    vendorId: 'gazebo',
    vendorName: 'Gazebo',
    name: 'Paneer Sandwich',
    description: 'Grilled paneer with mint chutney',
    image: '/images/gazebo.png',
    price: 80,
    isVeg: true,
    calories: 320,
    proteinG: 14,
    carbsG: 38,
    fatG: 10,
    category: 'snacks',
    isAvailable: true,
    isBestseller: false,
};

describe('ItemCard', () => {
    it('renders item name and price', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('Paneer Sandwich')).toBeInTheDocument();
    });

    it('renders price tag', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('₹80')).toBeInTheDocument();
    });

    it('renders veg badge for vegetarian items', () => {
        const { container } = render(<ItemCard item={mockItem} />);
        expect(container.querySelector('.veg-badge.veg')).toBeTruthy();
    });

    it('renders nonveg badge for non-vegetarian items', () => {
        const { container } = render(<ItemCard item={{ ...mockItem, isVeg: false }} />);
        expect(container.querySelector('.veg-badge.nonveg')).toBeTruthy();
    });

    it('renders ADD button', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('ADD')).toBeInTheDocument();
    });
});
