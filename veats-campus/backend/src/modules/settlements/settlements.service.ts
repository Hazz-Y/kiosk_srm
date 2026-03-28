// VEats — Settlements Service
// Computes vendor earnings = sum(item_price * qty) - commission
// Commission is configurable per vendor (stored in vendors.commission_percent)

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { computeCommission } from '../../utils/commission';

@Injectable()
export class SettlementsService {
    private readonly logger = new Logger(SettlementsService.name);

    constructor(private prisma: PrismaService) { }

    /**
     * Run settlement for all vendors for a given period.
     * Creates settlement rows with computed vendor earnings.
     */
    async runSettlements(periodStart: string, periodEnd: string) {
        const start = new Date(periodStart);
        const end = new Date(periodEnd);

        // Get all active vendors
        const vendors = await this.prisma.vendor.findMany({
            where: { status: 'ACTIVE' },
        });

        const results: any[] = [];

        for (const vendor of vendors) {
            // Sum total sales for this vendor in the period
            const orderItems = await this.prisma.orderItem.findMany({
                where: {
                    vendorId: vendor.id,
                    order: {
                        paymentStatus: 'PAID',
                        createdAt: { gte: start, lte: end },
                    },
                },
            });

            const totalSales = orderItems.reduce(
                (sum, item) => sum + item.itemPrice.toNumber() * item.quantity,
                0,
            );

            if (totalSales === 0) continue;

            const commission = computeCommission(totalSales, vendor.commissionPercent.toNumber());
            const payoutAmount = totalSales - commission;

            const settlement = await this.prisma.settlement.create({
                data: {
                    vendorId: vendor.id,
                    periodStart: start,
                    periodEnd: end,
                    totalSales,
                    commission,
                    payoutAmount,
                    payoutStatus: 'PENDING',
                },
            });

            this.logger.log(
                `Settlement for ${vendor.name}: ₹${totalSales} sales, ₹${commission} commission, ₹${payoutAmount} payout`,
            );
            results.push(settlement);
        }

        return { settlementsCreated: results.length, settlements: results };
    }

    async getVendorSettlements(vendorId: string) {
        return this.prisma.settlement.findMany({
            where: { vendorId },
            orderBy: { periodEnd: 'desc' },
        });
    }

    async getAllSettlements() {
        return this.prisma.settlement.findMany({
            include: { vendor: { select: { name: true } } },
            orderBy: { periodEnd: 'desc' },
        });
    }
}
