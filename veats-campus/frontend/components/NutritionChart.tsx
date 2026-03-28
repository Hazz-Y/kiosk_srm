import React from 'react';

interface NutritionChartProps {
    data: Array<{
        date: string;
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    }>;
}

/**
 * NutritionChart — Daily macros visualization.
 * Uses Recharts when available; falls back to a simple bar chart for testing.
 */
export default function NutritionChart({ data }: NutritionChartProps) {
    // Find max for scaling
    const maxCalories = Math.max(...data.map((d) => d.calories), 1);

    return (
        <div data-testid="nutrition-chart" className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">📊 Weekly Nutrition</h3>

            {/* Simple bar chart fallback (works without Recharts for tests) */}
            <div className="space-y-3">
                {data.map((day) => (
                    <div key={day.date} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-20 font-mono">
                            {new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>

                        <div className="flex-1 flex items-center gap-1">
                            {/* Calories bar */}
                            <div
                                className="h-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-r-lg transition-all duration-500"
                                style={{ width: `${(day.calories / maxCalories) * 100}%`, minWidth: '4px' }}
                            />
                        </div>

                        <span className="text-sm font-semibold text-gray-700 w-20 text-right">
                            {day.calories} cal
                        </span>
                    </div>
                ))}
            </div>

            {/* Macro breakdown for latest day */}
            {data.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                            {data[data.length - 1].protein}g
                        </p>
                        <p className="text-xs text-gray-500">Protein</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">
                            {data[data.length - 1].carbs}g
                        </p>
                        <p className="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-500">
                            {data[data.length - 1].fat}g
                        </p>
                        <p className="text-xs text-gray-500">Fat</p>
                    </div>
                </div>
            )}
        </div>
    );
}
