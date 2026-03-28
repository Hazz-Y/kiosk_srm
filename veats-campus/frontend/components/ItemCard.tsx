// VEats — ItemCard Component (dark design with Lucide icons)
import Link from 'next/link';
import { MenuItem } from '../__mocks__/mockData';

interface ItemCardProps {
    item: MenuItem;
    onAdd?: (item: MenuItem) => void;
}

export default function ItemCard({ item, onAdd }: ItemCardProps) {
    return (
        <div className="item-card">
            <Link href={`/item/${item.id}`} style={{ display: 'block' }}>
                <div className="item-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    {/* Veg indicator overlay */}
                    <div className={`veg-badge ${item.isVeg ? 'veg' : 'nonveg'}`}>
                        <span className="dot" />
                    </div>
                    <span className="price-tag">₹{item.price}</span>
                </div>
            </Link>

            <div className="item-body">
                {item.isBestseller && (
                    <span style={{
                        display: 'inline-block',
                        fontSize: '9px',
                        background: 'linear-gradient(135deg, #e23744, #ff6b6b)',
                        color: 'white',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}>
                        ★ Bestseller
                    </span>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.3, marginBottom: '3px' }}>
                            {item.name}
                        </h4>
                        <p className="item-desc">{item.description}</p>
                    </div>
                    <button
                        className="add-btn"
                        style={{ flexShrink: 0 }}
                        onClick={(e) => {
                            e.preventDefault();
                            onAdd?.(item);
                            const btn = e.currentTarget;
                            btn.classList.add('added');
                            btn.textContent = '✓';
                            setTimeout(() => {
                                btn.classList.remove('added');
                                btn.textContent = 'ADD';
                            }, 900);
                        }}
                    >
                        ADD
                    </button>
                </div>

                <div className="nutrition-chips" style={{ marginTop: '6px' }}>
                    <span className="nutrition-chip cal">
                        <span className="value">{item.calories}</span> kcal
                    </span>
                    <span className="nutrition-chip protein">
                        <span className="value">{item.proteinG}g</span> protein
                    </span>
                </div>
            </div>
        </div>
    );
}
