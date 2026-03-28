// VEats — Settlement Cron Job (stub)
// This cron runs daily at midnight to compute vendor settlements.
// In production, adjust the schedule and add proper error handling.

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { computeCommission } from '../utils/commission';

@Injectable()
export class SettlementCronService {
    private readonly logger = new Logger(SettlementCronService.name);

    constructor(private prisma: PrismaService) { }

    /**
     * Daily settlement cron — runs at midnight.
     * Computes yesterday's settlements for all active vendors.
     * NOTE: This is a stub. In production, use a distributed lock
     * to prevent duplicate runs.
     */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleDailySettlement() {
        this.logger.log('🕐 Running daily settlement cron...');

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const periodStart = yesterday.toISOString().split('T')[0];
        const periodEnd = periodStart; // single day

        // TODO: Implement settlement logic here
        // For now, this is a placeholder. Use SettlementsService.runSettlements()
        this.logger.log(`  Settlement period: ${periodStart} to ${periodEnd}`);
        this.logger.log('  ⚠️  Cron stub — call POST /api/settlements/run manually for now');
    }
}
