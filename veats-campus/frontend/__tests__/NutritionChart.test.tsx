import React from 'react';
import { render, screen } from '@testing-library/react';
import NutritionChart from '../components/NutritionChart';

describe('NutritionChart', () => {
    const mockData = [
        { date: '2026-02-21', calories: 1200, protein: 45, carbs: 140, fat: 35 },
        { date: '2026-02-22', calories: 800, protein: 30, carbs: 100, fat: 25 },
    ];

    it('renders the chart container', () => {
        render(<NutritionChart data={mockData} />);
        expect(screen.getByTestId('nutrition-chart')).toBeInTheDocument();
    });

    it('renders weekly nutrition title', () => {
        render(<NutritionChart data={mockData} />);
        expect(screen.getByText(/Weekly Nutrition/)).toBeInTheDocument();
    });

    it('shows latest day macro breakdown', () => {
        render(<NutritionChart data={mockData} />);
        expect(screen.getByText('30g')).toBeInTheDocument(); // protein
        expect(screen.getByText('Protein')).toBeInTheDocument();
    });
});
