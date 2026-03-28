// VEats — Nutrition Service
// Provides daily macro summaries from the food_log table

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NutritionService {
    constructor(private prisma: PrismaService) { }

    /**
     * Get daily nutrition summary for a user.
     * Sums calories, protein, carbs, and fat from food_log for the given date.
     */
    async getDailySummary(userId: string, date: string) {
        const dayStart = new Date(`${date}T00:00:00.000Z`);
        const dayEnd = new Date(`${date}T23:59:59.999Z`);

        const logs = await this.prisma.foodLog.findMany({
            where: {
                userId,
                loggedAt: { gte: dayStart, lte: dayEnd },
            },
            include: {
                menuItem: { select: { name: true } },
            },
        });

        const summary = {
            date,
            totalCalories: 0,
            totalProteinG: 0,
            totalCarbsG: 0,
            totalFatG: 0,
            items: [] as Array<{
                name: string;
                quantity: number;
                calories: number;
                proteinG: number;
                carbsG: number;
                fatG: number;
            }>,
        };

        for (const log of logs) {
            summary.totalCalories += log.calories;
            summary.totalProteinG += log.proteinG.toNumber();
            summary.totalCarbsG += log.carbsG.toNumber();
            summary.totalFatG += log.fatG.toNumber();
            summary.items.push({
                name: log.menuItem.name,
                quantity: log.quantity,
                calories: log.calories,
                proteinG: log.proteinG.toNumber(),
                carbsG: log.carbsG.toNumber(),
                fatG: log.fatG.toNumber(),
            });
        }

        // Round totals
        summary.totalProteinG = Math.round(summary.totalProteinG * 100) / 100;
        summary.totalCarbsG = Math.round(summary.totalCarbsG * 100) / 100;
        summary.totalFatG = Math.round(summary.totalFatG * 100) / 100;

        return summary;
    }

    /**
     * Get weekly nutrition trend for charts.
     */
    async getWeeklyTrend(userId: string) {
        const days: Array<{ date: string; calories: number; protein: number; carbs: number; fat: number }> = [];

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const summary = await this.getDailySummary(userId, dateStr);
            days.push({
                date: dateStr,
                calories: summary.totalCalories,
                protein: summary.totalProteinG,
                carbs: summary.totalCarbsG,
                fat: summary.totalFatG,
            });
        }

        return days;
    }
}
