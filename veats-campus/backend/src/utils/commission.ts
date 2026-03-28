// VEats — Commission & Promo Utility Functions

/**
 * Compute commission amount from a subtotal and commission percentage.
 * @param subtotal - vendor subtotal (before commission)
 * @param commissionPercent - percentage (e.g. 10 for 10%)
 * @returns commission amount
 */
export function computeCommission(subtotal: number, commissionPercent: number): number {
    return Math.round((subtotal * commissionPercent) / 100 * 100) / 100;
}

/**
 * Allocate a flat platform promo discount pro-rata across vendor subtotals.
 * Each vendor absorbs discount proportional to their share of the total.
 *
 * Example: 2 vendors (₹200, ₹300), ₹50 discount
 * → Vendor A absorbs ₹20, Vendor B absorbs ₹30
 *
 * @param vendorSubtotals - Record<vendorId, subtotal>
 * @param discountAmount - flat discount to allocate
 * @returns Record<vendorId, discountShare>
 */
export function allocatePromoDiscount(
    vendorSubtotals: Record<string, number>,
    discountAmount: number,
): Record<string, number> {
    const total = Object.values(vendorSubtotals).reduce((sum, v) => sum + v, 0);
    if (total === 0) return {};

    const allocation: Record<string, number> = {};
    for (const [vendorId, subtotal] of Object.entries(vendorSubtotals)) {
        const share = (subtotal / total) * discountAmount;
        allocation[vendorId] = Math.round(share * 100) / 100;
    }
    return allocation;
}
