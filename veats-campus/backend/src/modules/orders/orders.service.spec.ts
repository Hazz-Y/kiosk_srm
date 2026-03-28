// VEats — Orders Service Unit Test
// Tests order total computation and commission calculation

import { computeCommission, allocatePromoDiscount } from '../../utils/commission';

describe('Order Total & Commission Calculation', () => {
    describe('computeCommission', () => {
        it('should compute 10% commission on ₹500', () => {
            expect(computeCommission(500, 10)).toBe(50);
        });

        it('should compute 8% commission on ₹1000', () => {
            expect(computeCommission(1000, 8)).toBe(80);
        });

        it('should compute 12% commission on ₹250', () => {
            expect(computeCommission(250, 12)).toBe(30);
        });

        it('should handle 0% commission', () => {
            expect(computeCommission(1000, 0)).toBe(0);
        });

        it('should handle 0 subtotal', () => {
            expect(computeCommission(0, 10)).toBe(0);
        });

        it('should round to 2 decimal places', () => {
            // 333 * 10% = 33.3
            expect(computeCommission(333, 10)).toBe(33.3);
        });
    });

    describe('allocatePromoDiscount', () => {
        it('should allocate ₹50 discount pro-rata across 2 vendors (₹200, ₹300)', () => {
            const allocation = allocatePromoDiscount(
                { vendorA: 200, vendorB: 300 },
                50,
            );
            expect(allocation.vendorA).toBe(20);
            expect(allocation.vendorB).toBe(30);
        });

        it('should allocate discount to single vendor', () => {
            const allocation = allocatePromoDiscount({ v1: 500 }, 100);
            expect(allocation.v1).toBe(100);
        });

        it('should handle 3 vendors equally', () => {
            const allocation = allocatePromoDiscount(
                { v1: 100, v2: 100, v3: 100 },
                30,
            );
            expect(allocation.v1).toBe(10);
            expect(allocation.v2).toBe(10);
            expect(allocation.v3).toBe(10);
        });

        it('should return empty object for zero totals', () => {
            const allocation = allocatePromoDiscount({}, 50);
            expect(allocation).toEqual({});
        });

        it('should handle zero discount', () => {
            const allocation = allocatePromoDiscount({ v1: 200 }, 0);
            expect(allocation.v1).toBe(0);
        });
    });

    describe('Order total computation', () => {
        it('should compute correct total for multi-vendor cart', () => {
            const cartItems = [
                { price: 80, quantity: 2 },  // ₹160
                { price: 120, quantity: 1 }, // ₹120
                { price: 60, quantity: 3 },  // ₹180
            ];

            const total = cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
            );
            expect(total).toBe(460);
        });

        it('should compute vendor earnings after commission', () => {
            const subtotal = 500;
            const commissionPercent = 10;
            const commission = computeCommission(subtotal, commissionPercent);
            const vendorEarning = subtotal - commission;

            expect(commission).toBe(50);
            expect(vendorEarning).toBe(450);
        });

        it('should compute net total after promo discount', () => {
            const vendorSubtotals = { v1: 200, v2: 300 };
            const grossTotal = 500;
            const promoDiscount = 50;
            const netTotal = grossTotal - promoDiscount;

            expect(netTotal).toBe(450);

            // Verify promo is allocated correctly
            const allocation = allocatePromoDiscount(vendorSubtotals, promoDiscount);
            const totalAllocated = Object.values(allocation).reduce((s, v) => s + v, 0);
            expect(totalAllocated).toBe(promoDiscount);
        });
    });
});
