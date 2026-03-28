// VEats — Nutrition Page (dark theme)
import Navbar from '../components/Navbar';

// Mock daily nutrition data
const todayMacros = {
    calories: 1840,
    protein: 72,
    carbs: 248,
    fat: 68,
    target: { calories: 2200, protein: 90, carbs: 300, fat: 80 },
};

const meals = [
    { time: '9:30 AM', name: 'Masala Dosa + Filter Coffee', cal: 430, from: 'AB2 Cafe' },
    { time: '12:45 PM', name: 'AB3 Special Biryani', cal: 650, from: 'AB3 Cafe 1' },
    { time: '4:00 PM', name: 'Veg Samosa + Masala Chai', cal: 350, from: 'AB1 Cafe' },
    { time: '7:30 PM', name: 'Classic Chicken Burger + Fries', cal: 410, from: 'Gazebo' },
];

function ProgressRing({ value, max, color, label, unit }: { value: number; max: number; color: string; label: string; unit: string }) {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: `conic-gradient(${color} ${pct * 3.6}deg, var(--bg-elevated) 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px',
            }}>
                <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color }}>{value}</div>
                    <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{unit}</div>
                </div>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</div>
        </div>
    );
}

export default function NutritionPage() {
    return (
        <div className="app-container">
            <Navbar />

            <div className="page-content" style={{ paddingTop: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Nutrition Tracker</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Today&apos;s intake</p>

                {/* ─── Macro Rings ─── */}
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <ProgressRing value={todayMacros.calories} max={todayMacros.target.calories} color="var(--orange)" label="Calories" unit="kcal" />
                        <ProgressRing value={todayMacros.protein} max={todayMacros.target.protein} color="var(--green)" label="Protein" unit="g" />
                        <ProgressRing value={todayMacros.carbs} max={todayMacros.target.carbs} color="#4fc3f7" label="Carbs" unit="g" />
                        <ProgressRing value={todayMacros.fat} max={todayMacros.target.fat} color="#ff8a65" label="Fat" unit="g" />
                    </div>
                </div>

                {/* ─── Summary Cards ─── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                    <div className="glass-card animate-fade-in-up" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--orange)' }}>{todayMacros.calories}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>of {todayMacros.target.calories} kcal</div>
                    </div>
                    <div className="glass-card animate-fade-in-up" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--green)' }}>{todayMacros.protein}g</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>of {todayMacros.target.protein}g protein</div>
                    </div>
                </div>

                {/* ─── Meal Log ─── */}
                <div className="section-header">
                    <h2 style={{ fontSize: '16px' }}>Today&apos;s Meals</h2>
                    <span className="count">{meals.length} entries</span>
                </div>

                <div className="stagger">
                    {meals.map((meal, i) => (
                        <div key={i} className="order-card" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--bg-elevated)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                flexShrink: 0,
                            }}>
                                {i === 0 ? '🌅' : i === 1 ? '☀️' : i === 2 ? '🌤️' : '🌙'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '14px' }}>{meal.name}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                                    <span>{meal.time}</span>
                                    <span>•</span>
                                    <span>{meal.from}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 700, color: 'var(--orange)', fontSize: '14px' }}>{meal.cal}</div>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>kcal</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Weekly Tip */}
                <div className="glass-card" style={{ marginTop: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>💡</div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Campus Nutrition Tip</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        AB2 Cafe&apos;s Masala Dosa has only 350 kcal — a great balanced breakfast option!
                    </div>
                </div>
            </div>
        </div>
    );
}
